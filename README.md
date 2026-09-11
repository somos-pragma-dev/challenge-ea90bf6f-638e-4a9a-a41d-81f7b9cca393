# Optimización de tiempo de carga en portal transaccional

El portal transaccional de una empresa fintech experimenta tiempos de carga lentos, afectando la experiencia del usuario y la eficiencia operativa. El objetivo es aplicar conceptos de Core Web Vitals para identificar y solucionar los cuellos de botella que impactan en el tiempo de carga. Los actores involucrados son el equipo de desarrollo frontend, los usuarios finales y el equipo de soporte técnico. La propiedad operativa clave es la latencia de carga de la página, con un umbral objetivo de 2 segundos en el 90% de las sesiones. La razón de negocio es mejorar la retención de usuarios y la satisfacción del cliente.

## Informacion General

| Campo | Valor |
|-------|-------|
| **Tema** | Optimizacion de rendimiento en aplicaciones web |
| **Nivel** | advanced-l2 |
| **Tipo** | practical |
| **Tiempo estimado** | 10 horas |

## Fases del Reto

### Fase 0: Configuración del Proyecto

**Objetivo:** Obtener el proyecto base funcional enviando el Código Base a un asistente de IA, que lo analizará, corregirá errores y generará un ZIP listo para usar.

**Tiempo estimado:** 15-30 minutos

**Instrucciones:**

- Asegúrate de tener instalado para ejecutar el proyecto: Node.js 18+, npm, VS Code o similar.
- Copia todo el contenido del campo **Código Base** de este reto — incluyendo el texto de instrucciones que aparece al inicio.
- Abre un asistente de IA (Claude en claude.ai, ChatGPT o Gemini — se recomienda Claude), pega el contenido copiado en el chat y envíalo.
- El asistente analizará los archivos, corregirá errores y generará un archivo ZIP descargable. Descárgalo y extráelo en la carpeta donde quieras trabajar.
- Ejecuta `npm install && npm run build` (o `npm start`). Si no hay errores, estás listo.

**Entregable:** El proyecto compila/arranca sin errores.

<details>
<summary>Pistas de conocimiento</summary>

- Copia el Código Base completo incluyendo el texto de instrucciones al inicio — esas instrucciones le indican al asistente exactamente qué hacer con los archivos.
- Si el asistente no genera el ZIP automáticamente al terminar el análisis, escríbele: "genera el ZIP ahora".
- Si el proyecto tiene errores al arrancar, comparte el mensaje de error con el mismo asistente para que lo corrija.

</details>

### Fase 1: Identificación de puntos de mejora

**Objetivo:** Detectar las áreas del portal que más impactan en el tiempo de carga.

**Tiempo estimado:** 2 horas

**Instrucciones:**

- Analiza el portal transaccional utilizando herramientas de medición de rendimiento (ej. Lighthouse, Chrome DevTools) para identificar los elementos que más contribuyen al tiempo de carga.
- Documenta los hallazgos, incluyendo los componentes y recursos que causan la mayor latencia.

**Entregable:** Reporte de análisis de rendimiento con recomendaciones iniciales.

<details>
<summary>Pistas de conocimiento</summary>

- Considera el impacto de los recursos externos y las dependencias de terceros.
- Evalúa el uso de caché y las estrategias de carga diferida.

</details>

### Fase 2: Optimización de recursos y carga

**Objetivo:** Implementar mejoras en la carga de recursos para reducir el tiempo de carga.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Aplica técnicas de optimización de imágenes, minimización de CSS y JavaScript, y uso de caché para reducir el tamaño y el número de solicitudes de recursos.
- Verifica que las mejoras implementadas cumplan con el umbral de latencia de 2 segundos en el 90% de las sesiones.

**Entregable:** Portal transaccional con mejoras de optimización de recursos y carga.

<details>
<summary>Pistas de conocimiento</summary>

- Explora el uso de servicios de CDN para la distribución de recursos.
- Considera la implementación de carga diferida para recursos no críticos.

</details>

### Fase 3: Evaluación y ajustes finales

**Objetivo:** Evaluar el impacto de las mejoras y realizar ajustes finales para asegurar la consistencia en el rendimiento.

**Tiempo estimado:** 4 horas

**Instrucciones:**

- Realiza pruebas de carga y rendimiento para evaluar el impacto de las mejoras implementadas.
- Ajusta las configuraciones y estrategias de optimización según los resultados obtenidos para asegurar la consistencia en el rendimiento.
- Documenta el proceso de evaluación y los ajustes realizados.

**Entregable:** Documentación del proceso de evaluación y ajustes finales, con evidencia de cumplimiento del umbral de latencia.

<details>
<summary>Pistas de conocimiento</summary>

- Utiliza herramientas de pruebas de carga como Apache JMeter o Gatling.
- Considera la implementación de monitoreo continuo para detectar posibles regressiones en el rendimiento.

</details>

## Dimensiones Evaluadas

- **queEs**: ¿Qué son los Core Web Vitals y por qué son importantes para el rendimiento de una aplicación web?
- **paraQueSirve**: ¿Para qué sirve la minimización de CSS y JavaScript en el contexto de optimización de rendimiento?
- **comoSeUsa**: ¿Cómo se puede implementar la carga diferida de recursos en una aplicación web?
- **erroresComunes**: ¿Cuáles son los errores comunes al optimizar el rendimiento de una aplicación web y cómo se pueden evitar?
- **queDecisionesImplica**: ¿Qué decisiones implica la elección de una estrategia de caché para mejorar el rendimiento de una aplicación web?

## Criterios de Evaluacion

- Identificar correctamente los puntos de mejora en el rendimiento del portal.
- Implementar técnicas de optimización de recursos y carga efectivas.
- Evaluar y ajustar las mejoras para asegurar la consistencia en el rendimiento.

## Como trabajar con un asistente de IA

Hay dos caminos, elegi uno:

- **AGENTS.md** (recomendado) — instrucciones nativas del repo. Abri esta carpeta con tu agente local (Claude Code, Cursor, Codex, Copilot, Gemini) y las carga solo. Sabe que archivos faltan y con que comando se verifica, y completa el scaffold escribiendo en disco.
- **PROMPT_MEJORA.md** — para copiar y pegar en un chat (claude.ai, ChatGPT). Devuelve un ZIP con el proyecto. Sirve si no tenes un agente en el IDE.

Ninguno de los dos resuelve las fases del reto: eso es tu trabajo.

## Verificacion

El proyecto esta listo para trabajar cuando este comando corre sin errores:

```bash
npm install && npm run build
```

---

*Reto generado automaticamente por Challenge Generator - Pragma*
