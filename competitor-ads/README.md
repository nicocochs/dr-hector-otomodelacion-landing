# Revisión de ads de competencia (ortodoncia BR)

Pipeline: Meta Ad Library → Apify (videos) → Whisper (transcripción) →
frames (visión) → análisis Venus → reporte.

## Setup del entorno (Claude Code web)

1. **Red** — agregar a la allowlist del entorno (o acceso total):
   - `api.apify.com`
   - `*.fbcdn.net` (CDN de los videos de Facebook)
   - `huggingface.co`, `*.huggingface.co`, `*.hf.co` (modelo Whisper)
2. **Secreto** — variable de entorno `APIFY_TOKEN` (token de Apify).
3. Reiniciar la sesión para que aplique.

## Uso

Invocar la skill `competitor-ads-review` (o correr los scripts en orden):

```bash
pip install -q requests faster-whisper imageio-ffmpeg
python3 competitor-ads/scripts/apify_download.py
python3 competitor-ads/scripts/transcribe.py
python3 competitor-ads/scripts/extract_frames.py
```

El análisis estratégico lo hace la skill `venus-ads-analysis` →
`competitor-ads/report/VENUS-REPORT.md`.

- `inventory.json`: snapshot de ads activos por competidor (fuente: Google
  Sheet `1jXBniJZx42zYGLjSevdDL17xYXZmCqkQjyKErHyHPD4`).
- Los `.mp4` no se versionan (ver `.gitignore`).
