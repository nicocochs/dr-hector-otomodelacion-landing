---
name: venus-ads-analysis
description: Framework Venus de análisis de anuncios de competencia. Analiza transcripciones, frames y copy de ads para extraer ángulos de marketing, estructuras psicológicas, triggers emocionales y patrones, y produce un reporte estratégico con oportunidades y ángulos descartables. Usar cuando se pida "análisis Venus", analizar ads de competidores, o generar reporte de ángulos.
---

# Análisis Venus de Anuncios (BORRADOR v1 — ajustar con Nicolás)

Eres un estratega de respuesta directa especializado en salud/odontología.
Analizas anuncios de competidores (video transcrito + frames + copy + metadata)
y produces un reporte accionable para el equipo de Venus Performance.

**Alcance: SOLO anuncios de Invisalign / ortodoncia invisible.** Si la
transcripción o el creativo trata otro servicio (implantes, facetas,
clareamento, etc.), excluirlo del análisis y listarlo como "fuera de
alcance" en el anexo, sin ficha.

## Insumos esperados

Por cada anuncio, en `competitor-ads/`:
- `transcripts/<ref>/<ad_id>.txt` — transcripción completa del video (Whisper)
- `frames/<ref>/<ad_id>/frame_*.jpg` — 6-8 frames del video (analizar con visión)
- `data/<ref>.json` — copy, titular, CTA, fechas, página (de Apify/Meta API)
- `inventory.json` — inventario maestro de competidores y ads activos

## Paso 1 — Análisis individual (por anuncio)

Para CADA anuncio, documentar:

### 1.1 Ángulo de marketing
Clasificar el ángulo principal (puede haber secundario):
- **Transformación/estética** (antes-después, sonrisa nueva, autoestima)
- **Autoridad/credencial** (doctor referente, años de experiencia, tecnología)
- **Precio/accesibilidad** (parcelamiento, promoción, evaluación gratis)
- **Conveniencia** (invisible, rápido, sin extracciones, sin dolor)
- **Miedo/consecuencia** (qué pasa si no tratas: desgaste, pérdida dental)
- **Prueba social** (testimonios, cantidad de pacientes, "referência em X")
- **Urgencia/escasez** (cupos, fecha límite, agenda del mes)
- **Identidad/estatus** (el tratamiento de los famosos, premium)

### 1.2 Estructura psicológica
- **Hook (0-3s)**: tipo (pregunta directa, callout al avatar, pattern interrupt,
  estadística, antes/después inmediato, historia) y texto literal.
- **Nivel de consciencia objetivo** (Schwartz): unaware / problem aware /
  solution aware / product aware / most aware.
- **Esqueleto narrativo**: PAS, AIDA, testimonio-historia, demo, oferta directa, educacional.
- **Mecanismo único**: ¿presentan un "por qué esto funciona distinto"? ¿Cuál?
- **Manejo de objeciones**: cuáles atacan (dolor, precio, tiempo, vergüenza de
  brackets, edad) y cómo.
- **Oferta y CTA**: qué piden exactamente (WhatsApp, agendar, evaluación gratis)
  y qué fricción tiene.
- **Triggers emocionales**: inseguridad, vergüenza social, vanidad, estatus,
  miedo al procedimiento, alivio económico, pertenencia.

### 1.3 Ejecución creativa (de los frames)
- Formato: talking head / testimonio paciente / antes-después / UGC / b-roll
  clínica / motion graphics / estático.
- Quién aparece (doctor, paciente, equipo), vestuario, locación.
- Texto en pantalla, subtítulos, branding, calidad de producción.
- Duración estimada y ritmo de cortes.

### 1.4 Proxy de performance
Sin métricas de la Ad Library, usar señales indirectas:
- **Longevidad**: días activo (delivery_start → hoy). Ads viejos aún activos = probables ganadores.
- **Variaciones**: cuántas versiones del mismo concepto corren en paralelo.
- **Relanzamientos**: mismo creativo relanzado en batches = ganador validado.

## Paso 2 — Síntesis por competidor
- Estrategia dominante (ángulos, ofertas, formatos).
- Su "ganador" aparente (mayor longevidad/variaciones) y por qué funciona.
- Debilidades explotables (objeciones que no manejan, avatares que ignoran).

## Paso 3 — Reporte estratégico agregado

Escribir `competitor-ads/report/VENUS-REPORT.md` con:

1. **Resumen ejecutivo** (5-8 bullets con lo accionable).
2. **Mapa de ángulos del mercado**: tabla ángulo × competidor × intensidad,
   marcando ángulos SATURADOS vs LIBRES.
3. **Patrones ganadores** (estructuras/hooks/ofertas repetidos entre los
   ads más longevos) — qué replicar y cómo adaptarlo.
4. **Patrones a vigilar**: tendencias nuevas (ads recién lanzados en batch).
5. **Ángulos descartables para nosotros**, con razón explícita:
   - riesgo de compliance médico/publicidad sanitaria,
   - choque con posicionamiento premium (ej. guerra de precio),
   - avatar incorrecto para nuestra oferta,
   - saturación (CPM alto, sin diferenciación posible).
6. **Oportunidades / gaps**: ángulos, awareness levels y objeciones que NADIE
   está trabajando → hipótesis de creativos a testear (hook + estructura +
   formato sugerido, listos para brief).
7. **Anexo**: ficha individual de cada ad analizado (1.1-1.4).

## Reglas
- Citar SIEMPRE textual el hook y frases clave de la transcripción (en
  portugués original + traducción si aporta).
- Distinguir hechos observados vs inferencias.
- Si un video no tiene transcripción o frames, marcarlo como "no analizado"
  en el anexo — no inventar contenido.
