Here is a **single consolidated README** for your entire project (model selection + final training).
You can copy this directly into `README.md`.

---

# Gloss → Pose Generation using iSign

This project trains deep learning models to convert **gloss text sequences** into **pose keypoint sequences** using the **iSign dataset** from:

* Dataset: `Exploration-Lab/iSign`
* Config: `iSign_v1.1`
* Task: Gloss → Pose Regression

---

# Project Overview

We are solving:

> **Input:** Gloss sentence (e.g., "WANT GO SCHOOL")
> **Output:** Pose sequence of 3D/2D keypoints (152-dimensional per frame, 96 frames max)

This is a **sequence-to-sequence regression problem**.

---

# Repository Structure

```
model_selection.py      # Quick architecture sanity check
train_final_model.py    # Full training with early stopping
README.md               # This file
```

---

# System Requirements

## Hardware

Recommended:

* GPU: RTX 4070 Ti / RTX 5070 Ti (12GB VRAM)
* RAM: 16GB minimum (32GB recommended)
* Storage: 50GB free space

## Software

* Python 3.9+
* CUDA-enabled PyTorch
* HuggingFace datasets + transformers

---

# Installation

Create environment:

```bash
conda create -n gloss_pose python=3.9
conda activate gloss_pose
```

Install dependencies:

```bash
pip install torch torchvision torchaudio
pip install datasets transformers numpy
```

Set HuggingFace token:

```bash
export HUGGINGFACE_HUB_TOKEN=your_token_here
```

---

# Dataset Information

Dataset: `Exploration-Lab/iSign`
Config: `iSign_v1.1`

Each sample contains:

* `gloss` → string
* `pose` → sequence of keypoints (variable length)

Preprocessing:

* Gloss padded to `MAX_GLOSS_LEN = 16`
* Pose padded to `MAX_FRAMES = 96`
* Pose dimension = 152

---

# Step 1: Model Selection (Sanity Check)

Run:

```bash
python model_selection.py
```

What it does:

* Loads small subset of training data
* Trains each architecture briefly
* Applies:

  * Early stopping
  * Gradient clipping
  * Validation step
  * Checkpoint saving
* Prints validation losses

Available models tested:

* GRU Encoder-Decoder
* Transformer Encoder-Decoder

Output:

```
FINAL RESULTS
GRU: 0.0234
Transformer: 0.0187
```

Select the model with lowest validation loss.

---

# Step 2: Full Training

After choosing best architecture:

```bash
python train_final_model.py --model gru
```

or

```bash
python train_final_model.py --model bert
```

---

# Full Training Features

* Official train/validation split
* Early stopping
* Best checkpoint saving
* MSE loss
* MAE metric
* Automatic GPU detection

Early stopping patience: 8 epochs
Max epochs: 60

Best model saved as:

```
best_gru.pt
```

or

```
best_bert.pt
```

---

# Model Architectures

## 1. GRU Encoder-Decoder

* Embedding layer
* Bidirectional GRU encoder
* GRU decoder
* Linear pose projection

Recommended baseline.

---

## 2. Transformer Encoder-Decoder

* Multi-head self-attention
* Better long-range modeling
* Higher GPU usage

Recommended if dataset is large.

---

## 3. BERT Encoder + GRU Decoder

* Pretrained language model
* Slower
* Higher memory usage
* Useful if gloss language complexity is high

---

# Hyperparameters

```
MAX_GLOSS_LEN = 16
MAX_FRAMES = 96
POSE_DIM = 152
EMBED_DIM = 256
HIDDEN_DIM = 512
BATCH_SIZE = 8
```

Learning rates:

* GRU: 1e-3
* Transformer: 5e-4
* BERT: 2e-5

---

# Evaluation Metrics

* MSE (Mean Squared Error) → Primary
* MAE (Mean Absolute Error) → Secondary

Lower is better.

---

# Training Workflow

1. Run model selection script
2. Choose best architecture
3. Run full training
4. Use best checkpoint for inference

---

# Expected GPU Usage

| Model       | Approx VRAM |
| ----------- | ----------- |
| GRU         | 4–6 GB      |
| Transformer | 6–8 GB      |
| BERT        | 9–11 GB     |

Safe for 12GB GPU with batch size 8 (reduce for BERT if needed).

---

# Notes for Lab Deployment

* Ensure CUDA drivers are installed
* Confirm GPU is detected:

```python
import torch
print(torch.cuda.is_available())
```

* If CUDA OOM occurs:

  * Reduce batch size
  * Reduce MAX_FRAMES
  * Use mixed precision (future improvement)

---

# Research Notes

This is a regression-based gloss-to-pose mapping system.

Possible improvements:

* Velocity loss (pose smoothness)
* Bone-length constraint loss
* Teacher forcing decoder
* Scheduled sampling
* Mixed precision training
* Attention-based pose decoder

---

# Contact / Maintainer

Project maintained for research experimentation in sign language generation.

---

