# Análisis de Competidores (ortodoncia invisible, BR)

Pipeline: Meta Ad Library → Apify (videos) → Whisper (transcripción pt) →
frames (visión) → análisis Venus → `report/VENUS-REPORT.md`.

Ver `CLAUDE.md` para el contexto del agente y prerrequisitos del entorno.

```bash
pip install -q requests faster-whisper imageio-ffmpeg
python3 scripts/apify_download.py    # requiere APIFY_TOKEN
python3 scripts/transcribe.py
python3 scripts/extract_frames.py
```
