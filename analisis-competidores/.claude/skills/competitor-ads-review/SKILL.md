---
name: competitor-ads-review
description: Pipeline completo de revisión de ads de competencia - busca ads activos en Meta Ad Library, descarga videos vía Apify, transcribe con Whisper, extrae frames para análisis visual y aplica la skill venus-ads-analysis para generar el reporte estratégico. Usar cuando se pida revisar/analizar los anuncios de la competencia.
---

# Revisión de Ads de Competencia (pipeline)

## ALCANCE — solo Invisalign / ortodoncia invisible
Únicamente interesan los anuncios de **Invisalign u ortodoncia invisible**
(keywords PT: invisalign, alinhador(es), ortodontia/aparelho invisível).
Ignorar implantes, lentes/facetas, clareamento, harmonização, etc.
- El inventario tiene `invisalign_ad_ids` por competidor (pre-filtrado vía
  API con search_terms) y el script de descarga filtra por keywords.
- Páginas marcadas `keyword_opaque` (copy genérico): descargar todo y
  decidir DESPUÉS de transcribir — descartar transcripciones que no traten
  ortodoncia invisible y marcarlas "fuera de alcance" en el anexo.

## Prerrequisitos del entorno
- Allowlist de red debe incluir: `api.apify.com`, `*.fbcdn.net`,
  `huggingface.co`, `*.huggingface.co`, `*.hf.co` (o acceso total).
- Variable de entorno `APIFY_TOKEN` con un token válido de Apify.
- Si falta algo, detenerse e informar exactamente qué falta.

## Paso 0 — Inventario
La lista de competidores vive en el Google Sheet
`1jXBniJZx42zYGLjSevdDL17xYXZmCqkQjyKErHyHPD4` (Drive MCP) y el snapshot en
`inventory.json`. Para refrescar el inventario usar la tool MCP
`ads_library_search` con cada `page_id` (country BR, status ACTIVE) y
actualizar el JSON.

## Paso 1 — Descargar ads y videos (Apify)
```bash
pip install -q requests
python3 scripts/apify_download.py
```
- Corre el actor de Apify de Facebook Ad Library por cada página del
  inventario, guarda metadata en `data/<ref>.json` y descarga
  los .mp4 a `videos/<ref>/<ad_id>.mp4`.
- El actor por defecto es `curious_coder~facebook-ads-library-scraper`;
  se puede cambiar con `APIFY_ACTOR`. Si el actor falla, probar
  `apify~facebook-ads-scraper`.

## Paso 2 — Transcribir (Whisper, portugués)
```bash
pip install -q faster-whisper imageio-ffmpeg
python3 scripts/transcribe.py
```
Genera `transcripts/<ref>/<ad_id>.txt`.

## Paso 3 — Extraer frames para visión
```bash
python3 scripts/extract_frames.py
```
Genera 8 frames por video en `frames/<ref>/<ad_id>/`.
Luego LEER los frames con la tool Read (visión) durante el análisis.

## Paso 4 — Análisis y reporte
Invocar la skill `venus-ads-analysis` sobre los insumos generados y escribir
`report/VENUS-REPORT.md`.

## Paso 5 — Entrega
- Commit + push de data, transcripciones y reporte a la branch de trabajo.
- Enviar el reporte al usuario con SendUserFile.
- No subir los .mp4 al repo (están en .gitignore); solo metadata, transcripts,
  frames seleccionados y reporte.
