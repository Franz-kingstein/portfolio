#!/usr/bin/env python3
import os, sys, csv
from typing import List

try:
    from spc_io.high_level import spc as spc_hl
except Exception:
    spc_hl = None

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'archive'))
OUT = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'derived', 'spc_csv'))


def ensure_deps():
    if spc_hl is None:
        print("spc_io not installed. Install with: pip install spc-io", file=sys.stderr)
        sys.exit(2)


def find_spc_files(limit: int = 5) -> List[str]:
    paths = []
    for dirpath, _, filenames in os.walk(ROOT):
        for fn in filenames:
            if fn.lower().endswith('.spc'):
                paths.append(os.path.join(dirpath, fn))
                if len(paths) >= limit:
                    return paths
    return paths


def convert_one(path: str):
    with open(path, 'rb') as f:
        data = f.read()
    import io
    ds = spc_hl.SPC.from_bytes_io(io.BytesIO(data))
    # ds has .subfiles list of SPCSubFile, each with .x and .y arrays
    # Prefer flattened dataframe extraction
    try:
        df = ds.to_dataframe_flattened()
        rows = list(zip(df.get('x', []), df.get('y', [])))
    except Exception:
        rows = []
        if getattr(ds, 'subfiles', None):
            for sub in ds.subfiles:
                xs = getattr(sub, 'x', [])
                ys = getattr(sub, 'y', [])
                for xi, yi in zip(xs, ys):
                    rows.append((xi, yi))
        else:
            xs = getattr(ds, 'x', [])
            ys = getattr(ds, 'y', [])
            for xi, yi in zip(xs, ys):
                rows.append((xi, yi))
    rel = os.path.relpath(path, ROOT)
    out_path = os.path.join(OUT, os.path.splitext(rel)[0] + '.csv')
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, 'w', newline='') as f:
        w = csv.writer(f)
        w.writerow(['x', 'y'])
        w.writerows(rows)
    return out_path, len(rows)


def main():
    ensure_deps()
    files = find_spc_files(limit=10)
    if not files:
        print('No .spc files found under', ROOT)
        return 0
    converted = 0
    total_rows = 0
    for p in files:
        out, n = convert_one(p)
        print(f'Converted {p} -> {out} ({n} rows)')
        converted += 1
        total_rows += n
    print(f'Done. Converted {converted} SPC files, {total_rows} rows total.')
    return 0

if __name__ == '__main__':
    raise SystemExit(main())
