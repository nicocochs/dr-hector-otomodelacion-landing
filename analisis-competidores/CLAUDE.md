# Análisis de Competidores — Venus Performance

Repo de trabajo para la revisión de anuncios de la competencia de ortodoncia
(Brasil). **Alcance: SOLO anuncios de Invisalign / ortodoncia invisible** —
ignorar implantes, facetas, clareamento y otros servicios.

## Qué hay aquí
- `inventory.json` — snapshot de ads activos por competidor, con
  `invisalign_ad_ids` pre-filtrados vía Meta Ad Library API. Fuente:
  Google Sheet `1jXBniJZx42zYGLjSevdDL17xYXZmCqkQjyKErHyHPD4`.
- `scripts/` — pipeline: descarga vía Apify → transcripción Whisper (pt) →
  extracción de frames.
- `.claude/skills/competitor-ads-review` — orquestación del pipeline completo.
- `.claude/skills/venus-ads-analysis` — framework de análisis estratégico
  (ángulos, estructuras psicológicas, patrones, reporte).

## Prerrequisitos del entorno (Claude Code web)
Configurados por Nicolás en la config del environment:
- Allowlist de red: `api.apify.com`, `*.fbcdn.net`, `huggingface.co`,
  `*.huggingface.co`, `*.hf.co` (o acceso total).
- Variable de entorno `APIFY_TOKEN`.

Si al ejecutar falta alguno, detenerse e indicar exactamente qué falta.

Para evitar prompts de permisos, Nicolás puede agregar (manualmente) a
`.claude/settings.json`:

```json
{
  "permissions": {
    "allow": [
      "Bash(pip install -q requests faster-whisper imageio-ffmpeg)",
      "Bash(python3 scripts/apify_download.py)",
      "Bash(python3 scripts/transcribe.py)",
      "Bash(python3 scripts/extract_frames.py)"
    ]
  }
}
```

## Comando típico
"Corre la revisión de ads de competencia" → invocar skill
`competitor-ads-review`. El entregable final es `report/VENUS-REPORT.md`.

## Convenciones
- Los `.mp4` NO se versionan (`.gitignore`). Sí se versionan metadata,
  transcripciones, frames seleccionados y reportes.
- Idioma de los ads: portugués. Reportes en español.
