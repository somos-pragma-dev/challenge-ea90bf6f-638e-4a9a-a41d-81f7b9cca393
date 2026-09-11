# AGENTS.md

Instrucciones para el agente de IA que abra este repositorio (Claude Code, Cursor, Codex, Copilot, Gemini). Se cargan solas: no hay que pegar nada en ningun chat.

## Que es este repositorio

Es el codigo base de un reto de aprendizaje de Pragma: **Optimización de tiempo de carga en portal transaccional**.

| | |
|---|---|
| Tema | Optimizacion de rendimiento en aplicaciones web |
| Nivel | advanced-l2 |
| Chapter | Frontend |
| Especialidad | Angular |
| Stack | TypeScript 5.7 / Angular 20 |
| Patron arquitectonico | capas estándar con componentes standalone y patron contenedor/presentacional |
| Tiempo estimado | 10 horas |

## Tu tarea

Dejar este proyecto en estado **verificable**: que el comando de verificacion corra sin errores. Escribi los archivos en disco, en este repositorio. No generes ZIPs ni archivos adjuntos.

En orden:

1. Corre `npm install && npm run build` y mira que falla.
2. Completa lo que falte de la lista de abajo: manifiesto de dependencias, punto de entrada, capa de interfaz y las capas del patron declarado.
3. Arregla SOLO los errores que impiden compilar o arrancar.
4. Volve a correr `npm install && npm run build` hasta que pase.
5. Pará ahí.

## Regla dura: las fases son trabajo del humano

**PROHIBIDO implementar los entregables de las fases.** El valor del reto esta en que la persona los resuelva. Tu trabajo es que tenga un proyecto que arranca; el hueco pedagogico se queda como esta.

No resuelvas nada de esto:

- **Fase 1 — Identificación de puntos de mejora**: Reporte de análisis de rendimiento con recomendaciones iniciales.
- **Fase 2 — Optimización de recursos y carga**: Portal transaccional con mejoras de optimización de recursos y carga.
- **Fase 3 — Evaluación y ajustes finales**: Documentación del proceso de evaluación y ajustes finales, con evidencia de cumplimiento del umbral de latencia.

Distincion operativa:

- **Arreglar** (si): import faltante, tipo que no existe, dependencia sin declarar, error de sintaxis, archivo referenciado que no existe.
- **No tocar** (no): logica de negocio incompleta, validaciones ausentes, secretos hardcodeados, APIs deprecadas que funcionan, concurrencia insegura, patrones mejorables. Eso es lo que la persona tiene que encontrar.

## Lo que falta y tenes que completar

### 1. Boilerplate del stack (1)

Sin esto el proyecto no compila ni arranca. **Es tu trabajo crearlo**, y no toca nada de lo pedagogico: es andamiaje del stack.

- [ ] **src/index.html** — Sin index.html no hay documento raiz donde Angular monte la aplicacion y ng serve no tiene que servir.

### 2. Referencias colgando (6)

Salieron de un analisis estatico del codigo que SI esta en el repo. Cada una rompe la compilacion:

- [ ] `src/app/core/services/performance.service.ts` — `CoreWebVitals.update`
      Se invoca `update` sobre `CoreWebVitals`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/core/services/performance.service.ts` — `ResourceTiming.push`
      Se invoca `push` sobre `ResourceTiming`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/core/services/performance.service.ts` — `ResourceTiming.filter`
      Se invoca `filter` sobre `ResourceTiming`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/core/services/performance.service.ts` — `MemoryUsage.set`
      Se invoca `set` sobre `MemoryUsage`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/core/services/performance.service.ts` — `PerformanceReport.push`
      Se invoca `push` sobre `PerformanceReport`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- [ ] `src/app/core/services/performance.service.ts` — `PerformanceReport.shift`
      Se invoca `shift` sobre `PerformanceReport`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

### Presentes (17)

- `package.json`
- `angular.json`
- `tsconfig.json`
- `src/main.ts`
- `vite.config.ts`
- `src/app/core/services/performance.service.ts`
- `src/app/core/interceptors/cache.interceptor.ts`
- `src/app/app.config.ts`
- `src/app/features/transaccional/transaccional.component.ts`
- `src/app/features/transaccional/transaccional.component.html`
- `src/app/features/transaccional/transaccional.component.scss`
- `src/app/shared/components/optimized-image.component.ts`
- `src/styles/configs/variables.scss`
- `src/assets/optimized/.gitkeep`
- `reports/performance-analysis.md`
- `reports/optimization-results.md`
- `Dockerfile`

### Capas del patron declarado

Cada una tiene que existir como directorio real con al menos un archivo. Codigo plano en la raiz no satisface el patron.

- `src/app/core`
- `src/app/features/transaccional`
- `src/app/shared`
- `src/assets/optimized`
- `src/styles/configs`

## Verificacion

```bash
npm install && npm run build
```

Ese comando pasando es la definicion de "terminado" para vos.

## Convenciones que tenes que respetar

- Un solo ecosistema: no declares librerias de otro lenguaje ni mezcles gestores de paquetes.
- Toda libreria que uses tiene que estar declarada en el manifiesto de dependencias.
- Todo import declarado tiene que usarse; todo tipo usado tiene que existir o venir de una dependencia declarada.
- El patron es **capas estándar con componentes standalone y patron contenedor/presentacional**: los contratos (interfaces, puertos) los define la capa interna y los implementa la externa, nunca al revés.
- Los archivos que crees llevan implementacion real, no stubs: sin `TODO`, sin cuerpos vacios, sin `// getters y setters`.

## Contexto del candidato

Sirve para calibrar el nivel del codigo, no para resolver las fases.

- Perfil: Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Advanced
- Brecha que el reto ataca: Aplica conceptos de Core Web Vitals y los usa para tomar decisiones de codigo que potencien soluciones en el contexto de negocio
- Mision: Mejorar el tiempo de carga del portal transaccional

---

*Generado por Challenge Generator — Pragma. `README.md` tiene el enunciado completo del reto para la persona. `PROMPT_MEJORA.md` es la variante para pegar en un chat, si se prefiere ese flujo.*
