#!/usr/bin/env python3
"""Extrae N frames equiespaciados de cada video para análisis visual.

Requiere: pip install imageio-ffmpeg. Escribe
competitor-ads/frames/<ref>/<ad_id>/frame_01.jpg ... frame_NN.jpg
"""
import os
import subprocess
from pathlib import Path

import imageio_ffmpeg

BASE = Path(__file__).resolve().parent.parent
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
N_FRAMES = int(os.environ.get("N_FRAMES", "8"))


def duration(video: Path) -> float:
    out = subprocess.run(
        [FFMPEG, "-i", str(video)], capture_output=True, text=True
    ).stderr
    for line in out.splitlines():
        if "Duration:" in line:
            h, m, s = line.split("Duration:")[1].split(",")[0].strip().split(":")
            return int(h) * 3600 + int(m) * 60 + float(s)
    return 0.0


def main():
    videos = sorted((BASE / "videos").rglob("*.mp4"))
    print(f"{len(videos)} videos")
    for video in videos:
        out_dir = BASE / "frames" / video.parent.name / video.stem
        if out_dir.exists() and any(out_dir.iterdir()):
            continue
        dur = duration(video)
        if dur <= 0:
            print(f"! {video.name}: duración ilegible")
            continue
        out_dir.mkdir(parents=True, exist_ok=True)
        for i in range(N_FRAMES):
            t = dur * (i + 0.5) / N_FRAMES
            subprocess.run(
                [FFMPEG, "-ss", f"{t:.2f}", "-i", str(video), "-frames:v", "1",
                 "-q:v", "3", "-y", str(out_dir / f"frame_{i+1:02d}.jpg")],
                capture_output=True,
            )
        print(f"ok {video.parent.name}/{video.stem} ({dur:.0f}s)")


if __name__ == "__main__":
    main()
