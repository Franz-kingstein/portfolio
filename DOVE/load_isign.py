from datasets import load_dataset
from huggingface_hub import snapshot_download, HfFolder
import pandas as pd
from pathlib import Path

DATASET_ID = "Exploration-Lab/iSign"
CONFIGS = [
    "iSign_v1.1",
    "word-description-dataset_v1.1",
    "word-presence-dataset_v1.1",
]


def try_load_with_datasets(dataset_id: str, config: str):
    print(f"- Trying datasets.load_dataset('{dataset_id}', '{config}')...")
    try:
        # Rely on logged-in auth implicitly
        ds = load_dataset(dataset_id, config)
        return ds
    except Exception as e:
        print(f"  datasets.load_dataset failed: {e}")
        return None


def fallback_snapshot_to_csv(dataset_id: str, csv_name: str):
    print(f"- Falling back to snapshot_download for '{dataset_id}' and reading '{csv_name}'...")
    token = HfFolder.get_token()
    local_dir = snapshot_download(
        repo_id=dataset_id,
        repo_type="dataset",
        # Only download the needed CSV to save bandwidth
        allow_patterns=[csv_name],
        # token is read automatically from cache; no need to pass explicitly
        local_files_only=False,
    )
    csv_path = Path(local_dir) / csv_name
    if not csv_path.exists():
        raise FileNotFoundError(f"CSV not found after download: {csv_path}")
    df = pd.read_csv(csv_path)
    return df


def load_config(dataset_id: str, config: str):
    # First try via datasets (preferred to get splits if available)
    ds = try_load_with_datasets(dataset_id, config)
    if ds is not None:
        # If a split exists, show first 10 from train; else print structure
        if "train" in ds:
            print(f"  Loaded split keys: {list(ds.keys())}")
            sample = ds["train"].select(range(min(10, len(ds["train"]))))
            print(sample)
        else:
            print(ds)
        return True

    # If that fails, fall back to direct CSV download
    csv_name = f"{config}.csv"
    try:
        df = fallback_snapshot_to_csv(dataset_id, csv_name)
        print(f"  Loaded DataFrame shape: {df.shape}")
        print("  Columns:", list(df.columns))
        print("  Head:\n", df.head(10))
        return True
    except Exception as e:
        print(f"  Fallback failed: {e}")
        return False


if __name__ == "__main__":
    print(f"Attempting to load configs from {DATASET_ID} ...")
    all_ok = True
    for cfg in CONFIGS:
        print(f"\n=== Config: {cfg} ===")
        ok = load_config(DATASET_ID, cfg)
        all_ok = all_ok and ok
    if all_ok:
        print("\nSuccess: Loaded all requested configs (via datasets or fallback).")
    else:
        print("\nWarning: Some configs could not be loaded. Check messages above.")
