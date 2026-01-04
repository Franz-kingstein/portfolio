#!/usr/bin/env python3
import os, json, sys, hashlib
from collections import Counter, defaultdict

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'archive'))

summary = {
    'root': ROOT,
    'total_files': 0,
    'by_extension': {},
    'by_folder': {},
    'samples': {},
}

ext_counter = Counter()
folder_counts = defaultdict(int)

# Gather
for dirpath, dirnames, filenames in os.walk(ROOT):
    for fn in filenames:
        fp = os.path.join(dirpath, fn)
        summary['total_files'] += 1
        ext = os.path.splitext(fn)[1].lower() or '<noext>'
        ext_counter[ext] += 1
        rel_folder = os.path.relpath(dirpath, ROOT)
        folder_counts[rel_folder] += 1

summary['by_extension'] = dict(sorted(ext_counter.items(), key=lambda x: (-x[1], x[0])))
summary['by_folder'] = dict(sorted(folder_counts.items(), key=lambda x: (-x[1], x[0])))

# Sample-read small files per top extensions
samples = {}
for ext, count in list(summary['by_extension'].items())[:5]:
    samples[ext] = []

# Walk again to pick samples
picked = defaultdict(int)
for dirpath, _, filenames in os.walk(ROOT):
    for fn in filenames:
        ext = os.path.splitext(fn)[1].lower() or '<noext>'
        if ext not in samples:
            continue
        if picked[ext] >= 3:
            continue
        fp = os.path.join(dirpath, fn)
        size = os.path.getsize(fp)
        entry = {
            'path': os.path.relpath(fp, ROOT),
            'size_bytes': size,
        }
        # Try to read first 512 bytes as text; fallback to hex if binary
        try:
            with open(fp, 'rb') as f:
                head = f.read(512)
            try:
                entry['head_text'] = head.decode('utf-8', errors='replace')
            except Exception:
                entry['head_hex'] = head[:64].hex()
        except Exception as e:
            entry['error'] = str(e)
        samples[ext].append(entry)
        picked[ext] += 1

summary['samples'] = samples

out_path = os.path.join(os.path.dirname(__file__), 'archive_index.json')
with open(out_path, 'w') as f:
    json.dump(summary, f, indent=2)

print(f"Wrote summary to {out_path}")
print(json.dumps({
    'total_files': summary['total_files'],
    'by_extension': list(summary['by_extension'].items())[:10],
}, indent=2))
