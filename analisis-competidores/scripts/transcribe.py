#!/usr/bin/env python3
"""Transcribe los videos descargados con faster-whisper (portugués).

Requiere: pip install faster-whisper imageio-ffmpeg, y red hacia huggingface.
Lee competitor-ads/videos/<ref>/*.mp4 y escribe
competitor-ads/transcripts/<ref>/<ad_id>.txt
"""
import os
from pathlib import Path

import imageio_ffmpeg
from faster_whisper import WhisperModel

BASE = Path(__file__).resolve().parent.parent
MODEL = os.environ.get("WHISPER_MODEL", "small")

# faster-whisper decodifica audio con ffmpeg vía PyAV; no necesita el binario,
# pero lo dejamos en PATH por si algún paso lo usa.
os.environ["PATH"] += os.pathsep + str(Path(imageio_ffmpeg.get_ffmpeg_exe()).parent)


def main():
    model = WhisperModel(MODEL, device="cpu", compute_type="int8")
    videos = sorted((BASE / "videos").rglob("*.mp4"))
    print(f"{len(videos)} videos para transcribir (modelo {MODEL})")
    for video in videos:
        out = BASE / "transcripts" / video.parent.name / (video.stem + ".txt")
        if out.exists():
            continue
        try:
            segments, info = model.transcribe(str(video), language="pt", vad_filter=True)
            text = "\n".join(s.text.strip() for s in segments)
        except Exception as e:
            print(f"! {video.name}: {e}")
            continue
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(text or "[sin voz detectada]")
        print(f"ok {video.parent.name}/{video.name} ({info.duration:.0f}s)")


if __name__ == "__main__":
    main()
