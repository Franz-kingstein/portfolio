import os
import glob
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import OneClassSVM
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score
import tensorflow as tf
from tensorflow.keras import layers, models
import matplotlib.pyplot as plt
import seaborn as sns

# --- Config ---
DATA_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../derived/spc_csv'))
MODEL_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../derived/models'))
LOG_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../derived/logs'))
os.makedirs(MODEL_DIR, exist_ok=True)
os.makedirs(LOG_DIR, exist_ok=True)
PLOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../derived/plots'))
os.makedirs(PLOT_DIR, exist_ok=True)

# --- Data Loader ---
def load_spectra(data_dir, max_files=200):
    X, y = [], []
    for label_dir in glob.glob(os.path.join(data_dir, '*')):
        if not os.path.isdir(label_dir):
            continue
        label = os.path.basename(label_dir)
        for csv_path in glob.glob(os.path.join(label_dir, '**/*.csv'), recursive=True)[:max_files]:
            df = pd.read_csv(csv_path)
            if 'y' in df.columns:
                X.append(df['y'].values)
                y.append(label)
    return np.array(X), np.array(y)

# --- Preprocessing ---
def preprocess(X):
    # Pad/crop to fixed length
    maxlen = 600
    Xp = np.zeros((len(X), maxlen))
    for i, row in enumerate(X):
        if len(row) >= maxlen:
            Xp[i] = row[:maxlen]
        else:
            Xp[i, :len(row)] = row
    # Normalize
    Xp = (Xp - Xp.mean(axis=1, keepdims=True)) / (Xp.std(axis=1, keepdims=True) + 1e-8)
    return Xp

# --- Main ---
if __name__ == '__main__':
    print('Loading data...')
    X, y = load_spectra(DATA_DIR, max_files=200)
    X = preprocess(X)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)



    acc_summary = {}
    # For all one-class models, treat first class as 'normal', rest as 'anomaly'
    normal_class = y_train[0]
    y_train_bin = (y_train == normal_class).astype(int)
    y_test_bin = (y_test == normal_class).astype(int)

    # --- PlasticNet (CNN for spectra) ---
    print('Training PlasticNet...')
    def build_plasticnet(input_shape):
        model = models.Sequential([
            layers.Input(shape=input_shape),
            layers.Conv1D(64, 7, activation='relu', padding='same'),
            layers.MaxPooling1D(2),
            layers.Conv1D(128, 5, activation='relu', padding='same'),
            layers.MaxPooling1D(2),
            layers.Conv1D(256, 3, activation='relu', padding='same'),
            layers.GlobalMaxPooling1D(),
            layers.Dense(128, activation='relu'),
            layers.Dense(1, activation='sigmoid')
        ])
        return model
    plasticnet = build_plasticnet((X.shape[1], 1))
    plasticnet.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    history_pn = plasticnet.fit(X_train[..., None], y_train_bin, epochs=10, batch_size=16, validation_split=0.1, verbose=2)
    plasticnet.save(os.path.join(MODEL_DIR, 'plasticnet.h5'))
    y_pred_pn = (plasticnet.predict(X_test[..., None]) > 0.5).astype(int).flatten()
    acc_pn = accuracy_score(y_test_bin, y_pred_pn)
    cm_pn = confusion_matrix(y_test_bin, y_pred_pn)
    with open(os.path.join(LOG_DIR, 'plasticnet_report.txt'), 'w') as f:
        f.write(classification_report(y_test_bin, y_pred_pn))
        f.write(f"\nAccuracy: {acc_pn}\n")
        f.write(f"Confusion matrix:\n{cm_pn}\n")
    plt.figure(figsize=(8,5))
    sns.heatmap(cm_pn, annot=True, fmt='d', cmap='Reds')
    plt.title('PlasticNet Confusion Matrix')
    plt.xlabel('Predicted')
    plt.ylabel('True')
    plt.tight_layout()
    plt.savefig(os.path.join(PLOT_DIR, 'plasticnet_confusion_matrix.png'))
    plt.close()
    acc_summary['PlasticNet'] = float(acc_pn)

    # --- Random Forest ---
    print('Training Random Forest...')
    rf = RandomForestClassifier(n_estimators=100, random_state=42)
    rf.fit(X_train, y_train)
    y_pred = rf.predict(X_test)
    acc = accuracy_score(y_test, y_pred)
    cm = confusion_matrix(y_test, y_pred)
    with open(os.path.join(LOG_DIR, 'rf_report.txt'), 'w') as f:
        f.write(classification_report(y_test, y_pred))
        f.write(f"\nAccuracy: {acc}\n")
        f.write(f"Confusion matrix:\n{cm}\n")
    import joblib
    joblib.dump(rf, os.path.join(MODEL_DIR, 'random_forest.joblib'))
    # Plot confusion matrix
    plt.figure(figsize=(8,5))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues')
    plt.title('Random Forest Confusion Matrix')
    plt.xlabel('Predicted')
    plt.ylabel('True')
    plt.tight_layout()
    plt.savefig(os.path.join(PLOT_DIR, 'rf_confusion_matrix.png'))
    plt.close()
    acc_summary['RandomForest'] = float(acc)
    print('Random Forest done.')


    # --- One-Class SVM ---
    print('Training One-Class SVM...')
    # Use only the first class for training (anomaly detection)
    normal_class = y_train[0]
    X_train_oc = X_train[y_train == normal_class]
    X_test_oc = X_test
    y_test_oc = (y_test == normal_class).astype(int)
    svm = OneClassSVM(kernel='rbf', nu=0.1, gamma='auto')
    svm.fit(X_train_oc)
    y_pred_oc = svm.predict(X_test_oc)
    # OneClassSVM: +1 for inliers, -1 for outliers
    y_pred_bin = (y_pred_oc == 1).astype(int)
    acc = accuracy_score(y_test_oc, y_pred_bin)
    cm = confusion_matrix(y_test_oc, y_pred_bin)
    with open(os.path.join(LOG_DIR, 'oneclass_svm_report.txt'), 'w') as f:
        f.write(classification_report(y_test_oc, y_pred_bin))
        f.write(f"\nAccuracy: {acc}\n")
        f.write(f"Confusion matrix:\n{cm}\n")
    import joblib
    joblib.dump(svm, os.path.join(MODEL_DIR, 'oneclass_svm.joblib'))
    # Plot confusion matrix
    plt.figure(figsize=(8,5))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Greens')
    plt.title('One-Class SVM Confusion Matrix')
    plt.xlabel('Predicted')
    plt.ylabel('True')
    plt.tight_layout()
    plt.savefig(os.path.join(PLOT_DIR, 'oneclass_svm_confusion_matrix.png'))
    plt.close()
    acc_summary['OneClassSVM'] = float(acc)
    print('One-Class SVM done.')


    # --- One-Class CNN ---
    print('Training One-Class CNN...')
    y_train_bin = (y_train == normal_class).astype(int)
    y_test_bin = (y_test == normal_class).astype(int)
    model = models.Sequential([
        layers.Input(shape=(X.shape[1], 1)),
        layers.Conv1D(32, 5, activation='relu'),
        layers.MaxPooling1D(2),
        layers.Conv1D(64, 5, activation='relu'),
        layers.GlobalMaxPooling1D(),
        layers.Dense(32, activation='relu'),
        layers.Dense(1, activation='sigmoid')
    ])
    model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    history = model.fit(X_train[..., None], y_train_bin, epochs=10, batch_size=16, validation_split=0.1, verbose=2)
    model.save(os.path.join(MODEL_DIR, 'one_class_cnn.h5'))
    # Evaluate
    y_pred_cnn = (model.predict(X_test[..., None]) > 0.5).astype(int).flatten()
    acc = accuracy_score(y_test_bin, y_pred_cnn)
    cm = confusion_matrix(y_test_bin, y_pred_cnn)
    with open(os.path.join(LOG_DIR, 'oneclass_cnn_report.txt'), 'w') as f:
        f.write(classification_report(y_test_bin, y_pred_cnn))
        f.write(f"\nAccuracy: {acc}\n")
        f.write(f"Confusion matrix:\n{cm}\n")
    # Plot confusion matrix
    plt.figure(figsize=(8,5))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Oranges')
    plt.title('One-Class CNN Confusion Matrix')
    plt.xlabel('Predicted')
    plt.ylabel('True')
    plt.tight_layout()
    plt.savefig(os.path.join(PLOT_DIR, 'oneclass_cnn_confusion_matrix.png'))
    plt.close()
    acc_summary['OneClassCNN'] = float(acc)

    # --- One-Class CNN+GRU Hybrid (separate from transfer model) ---
    print('Training One-Class CNN+GRU Hybrid...')
    oc_cnn_gru = models.Sequential([
        layers.Input(shape=(X.shape[1], 1)),
        layers.Conv1D(32, 5, activation='relu'),
        layers.MaxPooling1D(2),
        layers.GRU(32, return_sequences=True),
        layers.GlobalMaxPooling1D(),
        layers.Dense(32, activation='relu'),
        layers.Dense(1, activation='sigmoid')
    ])
    oc_cnn_gru.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    _ = oc_cnn_gru.fit(X_train[..., None], y_train_bin, epochs=10, batch_size=16, validation_split=0.1, verbose=2)
    oc_cnn_gru.save(os.path.join(MODEL_DIR, 'one_class_cnn_gru.h5'))
    y_pred_oc_cnn_gru = (oc_cnn_gru.predict(X_test[..., None]) > 0.5).astype(int).flatten()
    acc_oc_cnn_gru = accuracy_score(y_test_bin, y_pred_oc_cnn_gru)
    cm_oc_cnn_gru = confusion_matrix(y_test_bin, y_pred_oc_cnn_gru)
    with open(os.path.join(LOG_DIR, 'oneclass_cnn_gru_report.txt'), 'w') as f:
        f.write(classification_report(y_test_bin, y_pred_oc_cnn_gru))
        f.write(f"\nAccuracy: {acc_oc_cnn_gru}\n")
        f.write(f"Confusion matrix:\n{cm_oc_cnn_gru}\n")
    plt.figure(figsize=(8,5))
    sns.heatmap(cm_oc_cnn_gru, annot=True, fmt='d', cmap='BuPu')
    plt.title('One-Class CNN+GRU Confusion Matrix')
    plt.xlabel('Predicted')
    plt.ylabel('True')
    plt.tight_layout()
    plt.savefig(os.path.join(PLOT_DIR, 'oneclass_cnn_gru_confusion_matrix.png'))
    plt.close()
    acc_summary['OneClassCNN_GRU'] = float(acc_oc_cnn_gru)
    print('One-Class CNN done.')


    # --- CNN+GRU for Transfer Learning ---
    print('Training One-Class CNN+GRU Hybrid...')

    # Modular CNN+GRU for transfer learning
    def build_mennet(input_shape):
        inp = layers.Input(shape=input_shape, name='input')
        x = layers.Conv1D(32, 5, activation='relu', name='conv1')(inp)
        x = layers.MaxPooling1D(2, name='pool1')(x)
        x = layers.GRU(32, return_sequences=True, name='gru')(x)
        x = layers.GlobalMaxPooling1D(name='global_pool')(x)
        x = layers.Dense(32, activation='relu', name='dense1')(x)
        feat = layers.Dense(16, activation='relu', name='feature_vector')(x)
        out = layers.Dense(1, activation='sigmoid', name='output')(feat)
        model = models.Model(inputs=inp, outputs=out, name='mennet')
        return model
    mennet = build_mennet((X.shape[1], 1))
    mennet.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
    history2 = mennet.fit(X_train[..., None], y_train_bin, epochs=10, batch_size=16, validation_split=0.1, verbose=2)
    mennet.save(os.path.join(MODEL_DIR, 'mennet.h5'))
    # Evaluate
    y_pred_mennet = (mennet.predict(X_test[..., None]) > 0.5).astype(int).flatten()
    acc = accuracy_score(y_test_bin, y_pred_mennet)
    cm = confusion_matrix(y_test_bin, y_pred_mennet)
    with open(os.path.join(LOG_DIR, 'mennet_report.txt'), 'w') as f:
        f.write(classification_report(y_test_bin, y_pred_mennet))
        f.write(f"\nAccuracy: {acc}\n")
        f.write(f"Confusion matrix:\n{cm}\n")
    print('MENNet model done.')
    # Plot confusion matrix
    plt.figure(figsize=(8,5))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Purples')
    plt.title('MENNet Confusion Matrix')
    plt.xlabel('Predicted')
    plt.ylabel('True')
    plt.tight_layout()
    plt.savefig(os.path.join(PLOT_DIR, 'mennet_confusion_matrix.png'))
    plt.close()
    acc_summary['MENNet'] = float(acc)

    # Accuracy bar chart
    names = list(acc_summary.keys())
    scores = [acc_summary[k] for k in names]
    plt.figure(figsize=(14,6))
    # Ensure we have 6 distinct colors for six models
    palette = ['#4c72b0','#55a868','#c44e52','#8172b3','#e17c05','#b07aa1']
    # Repeat if more
    bars = plt.bar(names, scores, color=(palette * ((len(names)+len(palette)-1)//len(palette)))[:len(names)])
    plt.ylim(0,1)
    plt.ylabel('Accuracy')
    plt.title('Model Accuracies')
    for b, s in zip(bars, scores):
        plt.text(b.get_x() + b.get_width()/2, s + 0.02, f"{s:.2f}", ha='center')
    plt.tight_layout()
    plt.savefig(os.path.join(PLOT_DIR, 'model_accuracies.png'))
    plt.close()
