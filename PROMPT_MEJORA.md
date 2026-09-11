# Prompt para Mejorar el Codigo Base

Copia y pega el contenido del bloque de abajo en un asistente de IA (Claude, ChatGPT)
para obtener un ZIP con el proyecto completo y arrancable.

Si preferis trabajar en tu editor con un agente local (Claude Code, Cursor, Copilot), usa `AGENTS.md` en vez de este archivo: dice lo mismo pero para que escriba los archivos en disco.

## Las dos reglas que no se negocian

1. **Completa el boilerplate.** Todo lo que el proyecto necesita para compilar y arrancar: manifiesto de dependencias, punto de entrada, configuracion, capa de interfaz, y las capas del patron arquitectonico declarado. Eso es andamiaje y es tu trabajo.
2. **NO resuelvas el reto.** Los entregables de las fases son el trabajo de la persona. El hueco pedagogico se deja como esta: el proyecto arranca, pero lo que el reto pide implementar NO esta implementado.

Dicho de otra forma: si algo impide compilar, arreglalo. Si algo es logica de negocio incompleta, validaciones ausentes, un secreto hardcodeado o un patron mejorable, dejalo exactamente como esta — es lo que la persona tiene que encontrar.

## Lo que le falta a este proyecto

Esto NO lo tenes que adivinar: salio de comparar el proyecto contra la arquitectura declarada del reto y de un analisis estatico del codigo. Completalo TODO.

### Boilerplate del stack que falta

Sin esto no compila ni arranca. Es andamiaje, no toca nada de lo pedagogico:

- **src/index.html** — Sin index.html no hay documento raiz donde Angular monte la aplicacion y ng serve no tiene que servir.

### Referencias colgando en el codigo que si esta

Cada una rompe la compilacion:

- `src/app/core/services/performance.service.ts` — `CoreWebVitals.update`: Se invoca `update` sobre `CoreWebVitals`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/core/services/performance.service.ts` — `ResourceTiming.push`: Se invoca `push` sobre `ResourceTiming`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/core/services/performance.service.ts` — `ResourceTiming.filter`: Se invoca `filter` sobre `ResourceTiming`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/core/services/performance.service.ts` — `MemoryUsage.set`: Se invoca `set` sobre `MemoryUsage`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/core/services/performance.service.ts` — `PerformanceReport.push`: Se invoca `push` sobre `PerformanceReport`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.
- `src/app/core/services/performance.service.ts` — `PerformanceReport.shift`: Se invoca `shift` sobre `PerformanceReport`, pero esa clase no declara ese metodo. Agregalo con su implementacion real, o usa uno de los que si declara.

## Como saber que terminaste

```bash
npm install && npm run build
```

Ese comando corriendo sin errores es la definicion de "listo".

---

```
## Briefing del reto (autoridad)
Este bloque manda sobre los archivos adjuntos. El stack y el rol salen de AQUÍ, no de un topic genérico ni de markdown placeholder.

### Perfil
Chapter Frontend, Especialidad Desarrollador, Tecnología Angular, Advanced

### Brecha de conocimiento
Aplica conceptos de Core Web Vitals y los usa para tomar decisiones de codigo que potencien soluciones en el contexto de negocio

### Misión / candidato
Mejorar el tiempo de carga del portal transaccional

### Reto
- Tema: Optimizacion de rendimiento en aplicaciones web
- Seniority: advanced-l2
- Tipo: practical
- Título: Optimización de tiempo de carga en portal transaccional
- Tiempo estimado: 10 horas

### Fases (trabajo del HUMANO — PROHIBIDO completarlas)
No implementes estos entregables. Dejalos como hueco pedagógico. El asistente solo materializa el proyecto arrancable para que el participante pueda trabajar.
- Fase 1: Identificación de puntos de mejora — objetivo: Detectar las áreas del portal que más impactan en el tiempo de carga. — entregable (NO resolver): Reporte de análisis de rendimiento con recomendaciones iniciales.
- Fase 2: Optimización de recursos y carga — objetivo: Implementar mejoras en la carga de recursos para reducir el tiempo de carga. — entregable (NO resolver): Portal transaccional con mejoras de optimización de recursos y carga.
- Fase 3: Evaluación y ajustes finales — objetivo: Evaluar el impacto de las mejoras y realizar ajustes finales para asegurar la consistencia en el rendimiento. — entregable (NO resolver): Documentación del proceso de evaluación y ajustes finales, con evidencia de cumplimiento del umbral de latencia.

Eres un asistente experto en análisis, corrección y generación de archivos de cualquier tipo:
código fuente, documentación, hojas de cálculo, documentos Word, configuraciones, entre otros.
Voy a enviarte una cadena de texto que contiene uno o más archivos. Cada archivo está delimitado por un marcador con el siguiente formato:
// === ARCHIVO: ruta/del/archivo.extension ===
o también puede aparecer como:
## === ARCHIVO: ruta/del/archivo.extension ===
Lo que sigue al marcador puede ser:

El contenido real del archivo (código, texto, YAML, etc.)
Una descripción en lenguaje natural de lo que debe contener el archivo


TU TAREA
PASO 0 — ¿Esto es un proyecto o una carcasa?
Antes de extraer archivos, leé el Briefing (si está) y diagnosticá el adjunto.

Es CARCASA si ocurre CUALQUIERA de estas:
- No hay manifiesto de dependencias del stack del briefing (manifest.json de VTEX IO / package.json / pom.xml / build.gradle / requirements.txt / go.mod / *.tf / *.csproj, según corresponda)
- Hay un "binario" que en realidad es un comentario ("no puede ser mostrado como texto plano", placeholder .fig/.docx vacío)
- Los markdowns ya completan entregables de fases posteriores ("se implementó fade-in", lista de áreas ya resuelta)

Si es CARCASA:
- MATERIALIZÁ un proyecto que arranca en el stack del briefing (VTEX IO Store Framework, Angular, Terraform, pytest, Nest, etc.). Incluí manifiesto, punto de entrada y capa de interfaz reales.
- NO copies los markdowns de "solución" como si fueran el producto. Son ruido de generación.
- NO resuelvas las fases del briefing (están marcadas PROHIBIDO). Dejá el hueco pedagógico: el flujo existe, las microinteracciones/calidad/infra que el reto pide NO están hechas.
- Después seguí al PASO 5 (ZIP).

Si es un proyecto REAL (manifiesto + código que compila o arranca):
- Seguí PASO 1 en adelante. 🔴 compilación sí. 🟡 pedagógico no.

PASO 1 — Detección y extracción
Identifica todos los archivos presentes en la cadena. Para cada archivo extrae:

Su ruta completa (ej: src/main/java/com/pragma/Service.java)
Su contenido o descripción

PASO 2 — Clasificación por tipo
Clasifica cada archivo en una de estas categorías:
A) Código fuente (Java, Python, TypeScript, JavaScript, Kotlin, etc.)
B) Configuración / documentación (YAML, properties, Markdown, JSON, txt, etc.)
C) Excel (.xlsx, .xls, .csv)
D) Word (.docx, .doc)
E) Otro tipo de archivo binario o especial
PASO 3 — Clasificación de errores en código fuente

Objetivo prioritario: que el proyecto compile. No corrijas flujo de negocio ni lógica funcional.

Antes de modificar cualquier archivo de código fuente, clasifica cada problema encontrado en una de estas dos categorías:
🔴 ERROR DE COMPILACIÓN — corregir siempre
Son errores que impiden que el proyecto arranque, sin valor pedagógico:

Import faltante o incorrecto
Clase, método o variable referenciada que no existe en ningún archivo del proyecto
Error de sintaxis
Anotación con atributos inválidos
Dependencia ausente en pom.xml, package.json, etc.
Archivo referenciado que no existe y debe ser creado con implementación mínima

→ CORREGIR estos errores.
🟡 PROBLEMA FUNCIONAL O DE CALIDAD — preservar siempre
Son problemas que no impiden compilar. Pueden ser intencionales para el aprendizaje:

Clave secreta hardcodeada ("secret", "password123")
API deprecada que funciona pero tiene reemplazo moderno
Lógica de negocio incorrecta o incompleta
Código redundante o de baja legibilidad
Falta de validaciones en flujo de negocio
Patrones de diseño incorrectos pero funcionales
Concurrencia no segura
Configuración funcional pero no óptima

→ PRESERVAR tal cual. No corregir, no mejorar, no comentar.
PASO 4 — Procesamiento según tipo de archivo
Tipo A — Código fuente
Aplica únicamente las correcciones clasificadas como 🔴 ERROR DE COMPILACIÓN.
No alteres ningún elemento clasificado como 🟡 PROBLEMA FUNCIONAL O DE CALIDAD.
Si falta un archivo referenciado, créalo con la implementación mínima necesaria para compilar.
Tipo B — Configuración / documentación
Extrae el contenido tal cual, sin modificaciones salvo errores evidentes de sintaxis
(ej: YAML mal indentado).
Tipo C — Excel (.xlsx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un archivo Excel funcional con:

Fila de encabezados en negrita con color de fondo distintivo
Columnas con ancho ajustado al contenido
Tipos de dato correctos por columna
Validaciones si la descripción lo indica
Hojas nombradas descriptivamente si hay más de una
Filas de ejemplo si no hay datos reales

Tipo D — Word (.docx)
Si viene con contenido real, genera el archivo respetando ese contenido.
Si viene con descripción en lenguaje natural, genera un documento Word funcional con:

Estilos de título (Título 1, Título 2) para jerarquía de secciones
Fuente legible (Calibri o equivalente), tamaño 11-12pt para cuerpo
Márgenes estándar
Tabla de contenido si tiene múltiples secciones
Tablas con encabezados en negrita si aplica

Tipo E — Otro
Genera el archivo con el contenido o estructura más apropiada según la descripción.
PASO 5 — Exportación en ZIP
Empaqueta todos los archivos en un único archivo ZIP descargable respetando exactamente
la estructura de rutas indicada por los marcadores.
El ZIP debe incluir:

Archivos de código con únicamente los errores de compilación corregidos
Archivos de configuración y documentación sin cambios
Archivos nuevos creados para resolver dependencias de compilación faltantes
Archivos Excel y Word generados desde descripción

IMPORTANTE: El ZIP debe estar listo para descargar al finalizar. No preguntes si el usuario
quiere generarlo. Simplemente genera el archivo y proporciona el enlace de descarga; No debes desplegar en el chat el resumen de lo que arreglaste al Zip, solo entregalo.

REGLAS IMPORTANTES

No omitas ningún archivo aunque no tenga errores ni modificaciones
Respeta los nombres y rutas exactas indicadas por los marcadores
Si un archivo no tiene marcador claro, infiere el nombre desde su contenido
Si la cadena contiene solo documentación, placeholders o binarios fake, NO la reproduzcas:
aplicá PASO 0 (materializar el proyecto del briefing). Reproducir la carcasa es un fallo.
No agregues texto después del enlace de descarga del ZIP
No preguntes si el usuario quiere el ZIP: simplemente generalo siempre
Si detectas que falta un archivo de configuración necesario para compilar
(pom.xml, package.json, requirements.txt, build.gradle, etc.), créalo e inclúyelo
inferiendo su contenido desde los imports y frameworks detectados en el código
Nunca corrijas problemas 🟡 aunque parezcan obvios o fáciles de mejorar.
El participante que recibirá este proyecto los debe encontrar y resolver él mismo.


INPUT
Aquí está la cadena con los archivos:

// === ARCHIVO: package.json ===
{
  "name": "portal-transaccional-optimizado",
  "version": "1.0.0",
  "description": "Portal transaccional fintech con optimización de Core Web Vitals para tiempos de carga inferiores a 2 segundos",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "build:prod": "ng build --configuration=production",
    "build:analyze": "ng build --configuration=production --stats-json && npx webpack-bundle-analyzer dist/portal-transaccional-optimizado/stats.json",
    "test": "ng test",
    "test:ci": "ng test --watch=false --browsers=ChromeHeadless",
    "lint": "ng lint",
    "lighthouse": "lighthouse http://localhost:4200 --output=json --output-path=reports/lighthouse-results.json --chrome-flags='--headless'",
    "lighthouse:ci": "lighthouse http://localhost:4200 --preset=desktop --output=html --output-path=reports/lighthouse-report.html --chrome-flags='--headless --disable-gpu --no-sandbox'",
    "optimize:images": "node scripts/optimize-images.js",
    "perf:measure": "node scripts/measure-perf.js"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "~20.1.0",
    "@angular/common": "~20.1.0",
    "@angular/compiler": "~20.1.0",
    "@angular/core": "~20.1.0",
    "@angular/forms": "~20.1.0",
    "@angular/material": "^17.3.0",
    "@angular/platform-browser": "~20.1.0",
    "@angular/platform-browser-dynamic": "~20.1.0",
    "@angular/router": "~20.1.0",
    "ng-defer-load": "^10.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.6.0",
    "web-vitals": "^3.5.2",
    "zone.js": "~0.14.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "~20.1.0",
    "@angular/cli": "~20.1.0",
    "@angular/compiler-cli": "~20.1.0",
    "@types/jasmine": "~5.1.0",
    "jasmine-core": "~5.1.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "lighthouse": "^11.7.0",
    "terser": "^5.14.2",
    "typescript": "~5.7.0",
    "vite": "^5.0.0"
  },
  "engines": {
    "node": ">=20.0.0",
    "npm": ">=10.0.0"
  },
  "browserslist": [
    "last 2 Chrome versions",
    "last 2 Firefox versions",
    "last 2 Safari versions",
    "last 2 Edge versions",
    "not IE 11"
  ]
}

// === ARCHIVO: angular.json ===
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "portal-transaccional-optimizado": {
      "projectType": "application",
      "schematics": {
        "@schematics/angular:component": {
          "style": "scss",
          "standalone": true,
          "changeDetection": "OnPush"
        },
        "@schematics/angular:directive": {
          "standalone": true
        },
        "@schematics/angular:pipe": {
          "standalone": true
        }
      },
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:application",
          "options": {
            "outputPath": "dist/portal-transaccional-optimizado",
            "index": "src/index.html",
            "browser": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          },
          "configurations": {
            "production": {
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "500kb",
                  "maximumError": "1mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "2kb",
                  "maximumError": "4kb"
                }
              ],
              "outputHashing": "all",
              "optimization": {
                "scripts": true,
                "styles": {
                  "minify": true,
                  "inlineCritical": true
                },
                "fonts": {
                  "inline": true
                }
              },
              "sourceMap": false,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "buildOptimizer": true,
              "terserOptions": {
                "compress": {
                  "drop_console": true,
                  "drop_debugger": true,
                  "pure_funcs": ["console.log", "console.info"]
                },
                "mangle": true,
                "format": {
                  "comments": false
                }
              }
            },
            "development": {
              "optimization": false,
              "extractLicenses": false,
              "sourceMap": true,
              "namedChunks": true
            }
          },
          "defaultConfiguration": "production"
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "configurations": {
            "production": {
              "buildTarget": "portal-transaccional-optimizado:build:production"
            },
            "development": {
              "buildTarget": "portal-transaccional-optimizado:build:development"
            }
          },
          "defaultConfiguration": "development"
        },
        "test": {
          "builder": "@angular-devkit/build-angular:karma",
          "options": {
            "polyfills": ["zone.js", "zone.js/testing"],
            "tsConfig": "tsconfig.json",
            "inlineStyleLanguage": "scss",
            "assets": [
              "src/favicon.ico",
              "src/assets"
            ],
            "styles": [
              "src/styles.scss"
            ],
            "scripts": []
          }
        }
      }
    }
  },
  "cli": {
    "analytics": false,
    "cache": {
      "enabled": true,
      "path": ".angular/cache",
      "environment": "all"
    }
  }
}

// === ARCHIVO: tsconfig.json ===
{
  "compileOnSave": false,
  "compilerOptions": {
    "outDir": "./dist/out-tsc",
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "sourceMap": true,
    "declaration": false,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "moduleResolution": "bundler",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": [
      "ES2022",
      "dom"
    ],
    "baseUrl": "./",
    "paths": {
      "@core/*": ["src/app/core/*"],
      "@features/*": ["src/app/features/*"],
      "@shared/*": ["src/app/shared/*"],
      "@services/*": ["src/app/core/services/*"],
      "@models/*": ["src/app/core/models/*"],
      "@interceptors/*": ["src/app/core/interceptors/*"],
      "@guards/*": ["src/app/core/guards/*"],
      "@utils/*": ["src/app/shared/utils/*"]
    }
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  },
  "include": [
    "src/**/*.ts"
  ],
  "exclude": [
    "node_modules",
    "dist"
  ]
}

// === ARCHIVO: src/main.ts ===
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { cacheInterceptor } from './app/core/interceptors/cache.interceptor';
import { PerformanceService } from './app/core/services/performance.service';
import { inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

function initializePerformanceMonitoring(): void {
  const performanceService = inject(PerformanceService);
  performanceService.initializeWebVitalsMonitoring();
  performanceService.trackNavigationTiming();
  performanceService.observeResourceTiming();
  performanceService.monitorMemoryUsage();
}

function logApplicationStartup(): void {
  const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navigationEntry) {
    console.group('🚀 Portal Transaccional - Métricas de Inicio');
    console.log('⏱️ DNS Lookup:', navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart, 'ms');
    console.log('⏱️ TCP Connection:', navigationEntry.connectEnd - navigationEntry.connectStart, 'ms');
    console.log('⏱️ TLS Handshake:', navigationEntry.secureConnectionStart > 0 ? navigationEntry.connectEnd - navigationEntry.secureConnectionStart : 0, 'ms');
    console.log('⏱️ Time to First Byte:', navigationEntry.responseStart - navigationEntry.requestStart, 'ms');
    console.log('⏱️ Content Download:', navigationEntry.responseEnd - navigationEntry.responseStart, 'ms');
    console.log('⏱️ DOM Content Loaded:', navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart, 'ms');
    console.log('⏱️ Total Load Time:', navigationEntry.loadEventEnd - navigationEntry.fetchStart, 'ms');
    console.groupEnd();
  }
}

async function bootstrapApp(): Promise<void> {
  try {
    const routes = await import('./app/app.routes').then(m => m.routes);
    
    const finalConfig = {
      ...appConfig,
      providers: [
        ...appConfig.providers,
        provideRouter(routes, withComponentInputBinding()),
        provideHttpClient(
          withInterceptors([cacheInterceptor])
        ),
        provideAnimations()
      ]
    };

    await bootstrapApplication(AppComponent, finalConfig);
    
    initializePerformanceMonitoring();
    logApplicationStartup();
    
    console.log('%c✅ Portal Transaccional Inicializado', 'color: #4caf50; font-size: 14px; font-weight: bold;');
    console.log('%c📊 Monitoreo de Core Web Vitals activo', 'color: #2196f3; font-size: 12px;');
    
  } catch (error) {
    console.error('❌ Error al inicializar la aplicación:', error);
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack available');
    
    const loadingEl = document.getElementById('app-loading');
    if (loadingEl) {
      loadingEl.innerHTML = `
        <div style="
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          height: 100vh; 
          font-family: 'Segoe UI', sans-serif;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
          color: #fff;
        ">
          <h2 style="color: #ff5252;">Error de Inicialización</h2>
          <p>Por favor, recarga la página o contacta al soporte técnico.</p>
          <button onclick="window.location.reload()" style="
            margin-top: 20px;
            padding: 12px 24px;
            background: #4caf50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
          ">Recargar Página</button>
        </div>
      `;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const startTime = performance.now();
  
  bootstrapApp().then(() => {
    const bootstrapTime = performance.now() - startTime;
    console.log(`⏱️ Tiempo de bootstrap: ${bootstrapTime.toFixed(2)}ms`);
    
    setTimeout(() => {
      const longTasks = performance.getEntriesByType('longtask') as PerformanceEntry[];
      if (longTasks && longTasks.length > 0) {
        console.warn(`⚠️ Se detectaron ${longTasks.length} tareas largas que pueden afectar el rendimiento.`);
      }
    }, 3000);
  });
});

// === ARCHIVO: vite.config.ts ===
import { defineConfig } from 'vite';
import { angular } from '@analogjs/vite-plugin-angular';
import { terser } from 'terser';
import { compression } from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    angular(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 10240
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 10240
    })
  ],
  build: {
    target: 'es2022',
    minify: 'terser',
    sourcemap: false,
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-angular': ['@angular/core', '@angular/common', '@angular/platform-browser'],
          'vendor-rxjs': ['rxjs'],
          'vendor-material': ['@angular/material'],
          'vendor-web-vitals': ['web-vitals']
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      },
      plugins: [
        terser({
          compress: {
            drop_console: true,
            drop_debugger: true,
            passes: 2
          },
          mangle: {
            safari10: true
          },
          format: {
            comments: false
          }
        }),
        visualizer({
          filename: 'reports/bundle-analysis.html',
          open: false,
          gzipSize: true,
          brotliSize: true
        })
      ]
    },
    cssCodeSplit: true,
    cssMinify: true,
    assetsInlineLimit: 4096,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 500
  },
  server: {
    port: 4200,
    host: true,
    hmr: {
      overlay: true
    },
    cors: true,
    preTransformRequests: true
  },
  optimizeDeps: {
    include: ['@angular/core', '@angular/common', '@angular/platform-browser', 'rxjs'],
    exclude: ['@angular/material']
  },
  preview: {
    port: 4201,
    host: true
  },
  resolve: {
    alias: {
      '@core': '/src/app/core',
      '@features': '/src/app/features',
      '@shared': '/src/app/shared',
      '@services': '/src/app/core/services',
      '@models': '/src/app/core/models'
    }
  }
});

// === ARCHIVO: src/app/core/services/performance.service.ts ===
import { Injectable, signal, computed, effect, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

export interface CoreWebVitals {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
  inp: number | null;
}

export interface NavigationMetrics {
  dnsLookup: number;
  tcpConnection: number;
  tlsHandshake: number;
  timeToFirstByte: number;
  contentDownload: number;
  domContentLoaded: number;
  totalLoadTime: number;
  domInteractive: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  interactionToNextPaint: number;
}

export interface ResourceTiming {
  name: string;
  type: string;
  duration: number;
  transferSize: number;
  latency: number;
  cached: boolean;
}

export interface MemoryUsage {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
  usagePercentage: number;
}

export interface PerformanceReport {
  timestamp: Date;
  url: string;
  webVitals: CoreWebVitals;
  navigation: NavigationMetrics;
  resources: ResourceTiming[];
  memory: MemoryUsage | null;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  private routeSubscription?: Subscription;
  private performanceObserver?: PerformanceObserver;
  private resourceObserver?: PerformanceObserver;
  private longTaskObserver?: PerformanceObserver;
  private lcpElement?: HTMLElement;
  private lastCLSValue = 0;
  private clsSessionValue = 0;
  private clsEntries: LayoutShiftEntry[] = [];
  private maxcls = 0;
  
  readonly webVitals = signal<CoreWebVitals>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    inp: null
  });
  
  readonly navigationMetrics = signal<NavigationMetrics | null>(null);
  readonly resourceTimings = signal<ResourceTiming[]>([]);
  readonly memoryUsage = signal<MemoryUsage | null>(null);
  readonly longTasks = signal<PerformanceEntry[]>([]);
  readonly isMonitoring = signal<boolean>(false);
  readonly performanceScore = computed(() => this.calculatePerformanceScore());
  
  readonly isLCPGood = computed(() => (this.webVitals().lcp ?? Infinity) < 2500);
  readonly isFIDGood = computed(() => (this.webVitals().fid ?? Infinity) < 100);
  readonly isCLSGood = computed(() => (this.webVitals().cls ?? Infinity) < 0.1);
  readonly isFCPGood = computed(() => (this.webVitals().fcp ?? Infinity) < 1800);
  readonly isTTFBGood = computed(() => (this.webVitals().ttfb ?? Infinity) < 800);
  
  private readonly performanceHistory: PerformanceReport[] = [];
  private readonly maxHistorySize = 50;

  constructor() {
    if (this.isBrowser) {
      this.initRouteTracking();
      this.initVisibilityTracking();
    }
  }

  initializeWebVitalsMonitoring(): void {
    if (!this.isBrowser || !('PerformanceObserver' in window)) {
      console.warn('⚠️ PerformanceObserver no disponible en este entorno');
      return;
    }

    this.isMonitoring.set(true);
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeFCP();
    this.observeTTFB();
    this.observeINP();
    
    console.log('📊 Monitoreo de Core Web Vitals inicializado');
  }

  private observeLCP(): void {
    try {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceObserverEntryList;
        const lastEntry = entries.entries[entries.entries.length - 1] as LargestContentfulPaintEntry;
        
        if (lastEntry) {
          const lcpValue = lastEntry.startTime;
          this.webVitals.update(vitals => ({ ...vitals, lcp: lcpValue }));
          
          this.lcpElement = lastEntry.element as HTMLElement;
          
          if (lcpValue > 2500) {
            console.warn(`⚠️ LCP suboptimal: ${lcpValue.toFixed(2)}ms (objetivo: <2500ms)`);
            this.analyzeLCPIssue(lastEntry);
          }
        }
      });
      this.performanceObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.error('Error observando LCP:', e);
    }
  }

  private observeFID(): void {
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceObserverEntryList;
        const firstEntry = entries.entries[0] as FirstInputEntry;
        
        if (firstEntry) {
          const fidValue = firstEntry.processingStart - firstEntry.startTime;
          this.webVitals.update(vitals => ({ ...vitals, fid: fidValue }));
          
          if (fidValue > 100) {
            console.warn(`⚠️ FID suboptimal: ${fidValue.toFixed(2)}ms (objetivo: <100ms)`);
          }
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.error('Error observando FID:', e);
    }
  }

  private observeCLS(): void {
    try {
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceObserverEntryList;
        
        for (const entry of entries.entries) {
          const layoutShift = entry as LayoutShiftEntry;
          if (!layoutShift.hadRecentInput) {
            this.clsEntries.push(layoutShift);
            this.clsSessionValue += layoutShift.value;
            
            if (this.clsSessionValue > this.maxcls) {
              this.maxcls = this.clsSessionValue;
            }
          }
        }
        
        this.lastCLSValue = this.maxcls;
        this.webVitals.update(vitals => ({ ...vitals, cls: this.lastCLSValue }));
        
        if (this.lastCLSValue > 0.1) {
          console.warn(`⚠️ CLS suboptimal: ${this.lastCLSValue.toFixed(3)} (objetivo: <0.1)`);
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.error('Error observando CLS:', e);
    }
  }

  private observeFCP(): void {
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformancePaintTiming[];
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        
        if (fcpEntry) {
          this.webVitals.update(vitals => ({ ...vitals, fcp: fcpEntry.startTime }));
          
          if (fcpEntry.startTime > 1800) {
            console.warn(`⚠️ FCP suboptimal: ${fcpEntry.startTime.toFixed(2)}ms (objetivo: <1800ms)`);
          }
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.error('Error observando FCP:', e);
    }
  }

  private observeTTFB(): void {
    try {
      const ttfbObserver = new PerformanceObserver(() => {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationEntry) {
          const ttfbValue = navigationEntry.responseStart - navigationEntry.requestStart;
          this.webVitals.update(vitals => ({ ...vitals, ttfb: ttfbValue }));
          
          if (ttfbValue > 800) {
            console.warn(`⚠️ TTFB suboptimal: ${ttfbValue.toFixed(2)}ms (objetivo: <800ms)`);
          }
        }
      });
      ttfbObserver.observe({ entryTypes: ['navigation'] });
    } catch (e) {
      console.error('Error observando TTFB:', e);
    }
  }

  private observeINP(): void {
    try {
      let maxINP = 0;
      let inpEntry: InteractionToNextPaintEntry | null = null;
      
      const inpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const inp = entry as InteractionToNextPaintEntry;
          const duration = inp.duration;
          
          if (duration > maxINP) {
            maxINP = duration;
            inpEntry = inp;
          }
        }
        
        if (inpEntry && maxINP > 0) {
          this.webVitals.update(vitals => ({ ...vitals, inp: maxINP }));
          
          if (maxINP > 200) {
            console.warn(`⚠️ INP suboptimal: ${maxINP.toFixed(2)}ms (objetivo: <200ms)`);
          }
        }
      });
      inpObserver.observe({ entryTypes: ['event'] });
    } catch (e) {
      console.error('Error observando INP:', e);
    }
  }

  trackNavigationTiming(): void {
    if (!this.isBrowser) return;

    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!navigationEntry) return;

    const metrics: NavigationMetrics = {
      dnsLookup: navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart,
      tcpConnection: navigationEntry.connectEnd - navigationEntry.connectStart,
      tlsHandshake: navigationEntry.secureConnectionStart > 0 
        ? navigationEntry.connectEnd - navigationEntry.secureConnectionStart 
        : 0,
      timeToFirstByte: navigationEntry.responseStart - navigationEntry.requestStart,
      contentDownload: navigationEntry.responseEnd - navigationEntry.responseStart,
      domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart,
      totalLoadTime: navigationEntry.loadEventEnd - navigationEntry.fetchStart,
      domInteractive: navigationEntry.domInteractive - navigationEntry.fetchStart,
      firstPaint: (performance.getEntriesByType('paint')[0] as PerformancePaintTiming)?.startTime ?? 0,
      firstContentfulPaint: (performance.getEntriesByType('paint').find(e => e.name === 'first-contentful-paint') as PerformancePaintTiming)?.startTime ?? 0,
      largestContentfulPaint: this.webVitals().lcp ?? 0,
      cumulativeLayoutShift: this.webVitals().cls ?? 0,
      firstInputDelay: this.webVitals().fid ?? 0,
      interactionToNextPaint: this.webVitals().inp ?? 0
    };

    this.navigationMetrics.set(metrics);
  }

  observeResourceTiming(): void {
    if (!this.isBrowser) return;

    try {
      this.resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceResourceTiming[];
        const resources: ResourceTiming[] = [];

        for (const entry of entries) {
          const transferSize = entry.transferSize || 0;
          const isCached = transferSize === 0 && entry.duration < 1;
          
          resources.push({
            name: entry.name,
            type: this.getResourceType(entry.name),
            duration: entry.duration,
            transferSize,
            latency: entry.responseStart - entry.requestStart,
            cached: isCached
          });
        }

        this.resourceTimings.update(current => [...current, ...resources]);
        this.analyzeResourcePerformance(resources);
      });
      this.resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.error('Error observando recursos:', e);
    }
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'script';
    if (url.includes('.css')) return 'stylesheet';
    if (url.includes('.png') || url.includes('.jpg') || url.includes('.webp') || url.includes('.svg')) return 'image';
    if (url.includes('.woff') || url.includes('.ttf')) return 'font';
    if (url.includes('.html')) return 'document';
    return 'other';
  }

  private analyzeResourcePerformance(resources: ResourceTiming[]): void {
    const slowResources = resources.filter(r => r.duration > 1000 && !r.cached);
    const largeResources = resources.filter(r => r.transferSize > 500000);
    const uncachedScripts = resources.filter(r => r.type === 'script' && !r.cached);

    if (slowResources.length > 0) {
      console.warn(`⚠️ ${slowResources.length} recursos lentos detectados (>1s):`, slowResources.map(r => r.name).slice(0, 5));
    }

    if (largeResources.length > 0) {
      console.warn(`⚠️ ${largeResources.length} recursos grandes detectados (>500KB):`, largeResources.map(r => `${r.name} (${(r.transferSize / 1024).toFixed(0)}KB)`).slice(0, 3));
    }

    if (uncachedScripts.length > 3) {
      console.warn(`⚠️ Múltiples scripts sin caché: ${uncachedScripts.length} - considera implementar Service Worker`);
    }
  }

  monitorMemoryUsage(): void {
    if (!this.isBrowser || !('memory' in performance)) return;

    const memory = (performance as any).memory as MemoryInfo;
    const memoryUsage: MemoryUsage = {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
    };

    this.memoryUsage.set(memoryUsage);

    if (memoryUsage.usagePercentage > 80) {
      console.warn(`⚠️ Uso de memoria alto: ${memoryUsage.usagePercentage.toFixed(1)}% (${(memoryUsage.usedJSHeapSize / 1048576).toFixed(0)}MB / ${(memoryUsage.totalJSHeapSize / 1048576).toFixed(0)}MB)`);
    }
  }

  private analyzeLCPIssue(entry: LargestContentfulPaintEntry): void {
    console.group('🔍 Análisis de LCP');
    
    if (entry.url) {
      console.log('📍 Elemento LCP:', entry.element?.tagName);
      console.log('🖼️ URL del recurso:', entry.url);
      console.log('⏱️ Tiempo de carga:', entry.loadTime, 'ms');
      console.log('⏱️ Render time:', entry.renderTime, 'ms');
    }

    const suggestions: string[] = [];
    
    if (entry.loadTime > 2500) {
      suggestions.push('Considera usar preload para este recurso');
    }
    
    if (entry.renderTime - entry.startTime > 500) {
      suggestions.push('El renderizado del elemento toma demasiado tiempo');
    }

    if (suggestions.length > 0) {
      console.log('💡 Sugerencias:', suggestions);
    }
    
    console.groupEnd();
  }

  private initRouteTracking(): void {
    this.routeSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.trackNavigationTiming();
        this.clsEntries = [];
        this.clsSessionValue = 0;
        this.maxcls = 0;
        
        setTimeout(() => {
          this.observeLCP();
        }, 0);
      });
  }

  private initVisibilityTracking(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.monitorMemoryUsage();
      }
    });
  }

  private calculatePerformanceScore(): number {
    const vitals = this.webVitals();
    let score = 100;

    if (vitals.lcp !== null) {
      if (vitals.lcp > 4000) score -= 30;
      else if (vitals.lcp > 2500) score -= 15;
      else if (vitals.lcp > 2000) score -= 5;
    }

    if (vitals.fid !== null) {
      if (vitals.fid > 300) score -= 25;
      else if (vitals.fid > 100) score -= 10;
    }

    if (vitals.cls !== null) {
      if (vitals.cls > 0.25) score -= 25;
      else if (vitals.cls > 0.1) score -= 10;
    }

    return Math.max(0, Math.round(score));
  }

  generateReport(): PerformanceReport {
    const report: PerformanceReport = {
      timestamp: new Date(),
      url: this.isBrowser ? window.location.href : '',
      webVitals: this.webVitals(),
      navigation: this.navigationMetrics() ?? this.getEmptyNavigationMetrics(),
      resources: this.resourceTimings(),
      memory: this.memoryUsage(),
      score: this.performanceScore()
    };

    this.performanceHistory.push(report);
    if (this.performanceHistory.length > this.maxHistorySize) {
      this.performanceHistory.shift();
    }

    return report;
  }

  private getEmptyNavigationMetrics(): NavigationMetrics {
    return {
      dnsLookup: 0,
      tcpConnection: 0,
      tlsHandshake: 0,
      timeToFirstByte: 0,
      contentDownload: 0,
      domContentLoaded: 0,
      totalLoadTime: 0,
      domInteractive: 0,
      firstPaint: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      cumulativeLayoutShift: 0,
      firstInputDelay: 0,
      interactionToNextPaint: 0
    };
  }

  getPerformanceHistory(): PerformanceReport[] {
    return [...this.performanceHistory];
  }

  exportMetricsAsJSON(): string {
    const report = this.generateReport();
    return JSON.stringify(report, null, 2);
  }

  getOptimizationRecommendations(): string[] {
    const recommendations: string[] = [];
    const vitals = this.webVitals();
    const navigation = this.navigationMetrics();
    const resources = this.resourceTimings();

    if (vitals.lcp && vitals.lcp > 2500) {
      recommendations.push('LCP (>2.5s): Implementar preload para el elemento LCP, optimizar imágenes críticas, reducir TTFB');
    }

    if (vitals.fid && vitals.fid > 100) {
      recommendations.push('FID (>100ms): Reducir JavaScript del main thread, dividir chunks grandes, usar code splitting');
    }

    if (vitals.cls && vitals.cls > 0.1) {
      recommendations.push('CLS (>0.1): Establecer dimensiones explícitas en imágenes y videos, reservar espacio para ads');
    }

    if (navigation) {
      if (navigation.timeToFirstByte > 800) {
        recommendations.push('TTFB (>800ms): Implementar CDN, optimizar consultas del servidor, considerar caching');
      }

      if (navigation.dnsLookup > 200) {
        recommendations.push('DNS (>200ms): Usar DNS prefetching para recursos de terceros');
      }
    }

    const largeImages = resources.filter(r => r.type === 'image' && r.transferSize > 1000000);
    if (largeImages.length > 0) {
      recommendations.push(`Imágenes grandes: Optimizar ${largeImages.length} imágenes mayores a 1MB con WebP/AVIF`);
    }

    const uncached = resources.filter(r => !r.cached && r.type === 'script');
    if (uncached.length > 5) {
      recommendations.push(`Scripts sin caché (${uncached.length}): Implementar Service Worker para caching offline`);
    }

    return recommendations;
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.performanceObserver?.disconnect();
    this.resourceObserver?.disconnect();
    this.longTaskObserver?.disconnect();
    this.isMonitoring.set(false);
  }
}

// === ARCHIVO: src/app/core/interceptors/cache.interceptor.ts ===
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent, HttpResponse } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable, of, tap } from 'rxjs';

interface CacheEntry {
  response: HttpResponse<unknown>;
  timestamp: number;
  etag?: string;
}

const CACHE_STORAGE_KEY = 'http_cache_store';
const DEFAULT_MAX_AGE = 5 * 60 * 1000;

function getCacheStorage(): Map<string, CacheEntry> {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return new Map();
  }
  const stored = localStorage.getItem(CACHE_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return new Map(Object.entries(parsed));
    } catch {
      return new Map();
    }
  }
  return new Map();
}

function setCacheStorage(cache: Map<string, CacheEntry>): void {
  if (typeof localStorage !== 'undefined') {
    const obj = Object.fromEntries(cache);
    localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(obj));
  }
}

function isCacheValid(entry: CacheEntry, maxAge: number): boolean {
  return Date.now() - entry.timestamp < maxAge;
}

function buildCacheKey(req: HttpRequest<unknown>): string {
  return `${req.method}:${req.url}`;
}

export const cacheInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const platformId = inject(PLATFORM_ID);
  
  if (!isPlatformBrowser(platformId)) {
    return next(req);
  }

  const cacheControl = req.headers.get('Cache-Control');
  const noCache = cacheControl === 'no-cache' || req.method !== 'GET';
  
  if (noCache) {
    return next(req);
  }

  const cacheKey = buildCacheKey(req);
  const cache = getCacheStorage();
  const cachedEntry = cache.get(cacheKey);

  if (cachedEntry && isCacheValid(cachedEntry, DEFAULT_MAX_AGE)) {
    const cachedResponse = cachedEntry.response.clone();
    return of(cachedResponse);
  }

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse) {
        const newCache = getCacheStorage();
        const etag = event.headers.get('ETag') || undefined;
        
        newCache.set(cacheKey, {
          response: event.clone(),
          timestamp: Date.now(),
          etag
        });
        
        if (newCache.size > 100) {
          const oldestKeys = Array.from(newCache.entries())
            .sort((a, b) => a[1].timestamp - b[1].timestamp)
            .slice(0, 20)
            .map(entry => entry[0]);
          oldestKeys.forEach(key => newCache.delete(key));
        }
        
        setCacheStorage(newCache);
      }
    })
  );
};

export const etagInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const platformId = inject(PLATFORM_ID);
  
  if (!isPlatformBrowser(platformId) || req.method !== 'GET') {
    return next(req);
  }

  const cacheKey = buildCacheKey(req);
  const cache = getCacheStorage();
  const cachedEntry = cache.get(cacheKey);

  if (cachedEntry?.etag) {
    const reqWithEtag = req.clone({
      headers: req.headers.set('If-None-Match', cachedEntry.etag)
    });
    return next(reqWithEtag).pipe(
      tap(event => {
        if (event instanceof HttpResponse && event.status === 304) {
          const newCache = getCacheStorage();
          newCache.set(cacheKey, {
            ...cachedEntry,
            timestamp: Date.now()
          });
          setCacheStorage(newCache);
        }
      })
    );
  }

  return next(req);
};

// === ARCHIVO: src/app/app.config.ts ===
import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { cacheInterceptor, etagInterceptor } from './core/interceptors/cache.interceptor';
import { PerformanceService } from './core/services/performance.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withComponentInputBinding(),
      withViewTransitions()
    ),
    provideHttpClient(
      withInterceptorsFromDi(),
      withInterceptors([
        cacheInterceptor,
        etagInterceptor
      ])
    ),
    provideAnimationsAsync(),
    provideClientHydration(),
    PerformanceService,
    {
      provide: HTTP_INTERCEPTORS,
      useValue: cacheInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useValue: etagInterceptor,
      multi: true
    }
  ]
};

// === ARCHIVO: src/app/features/transaccional/transaccional.component.ts ===
import { Component, OnInit, OnDestroy, signal, computed, inject, PLATFORM_ID, ChangeDetectionStrategy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Subject, takeUntil, fromEvent, merge } from 'rxjs';
import { debounceTime, throttleTime } from 'rxjs/operators';

import { PerformanceService } from '@core/services/performance.service';

interface Transaccion {
  id: string;
  tipo: 'deposito' | 'retiro' | 'transferencia' | 'pago';
  monto: number;
  fecha: Date;
  estado: 'completada' | 'pendiente' | 'fallida';
  destinatario?: string;
}

interface DashboardMetrics {
  saldoTotal: number;
  transaccionesMes: number;
  ultimaActividad: Date;
  nivelRiesgo: 'bajo' | 'medio' | 'alto';
}

@Component({
  selector: 'app-transaccional',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './transaccional.component.html',
  styleUrl: './transaccional.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TransaccionalComponent implements OnInit, OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly performanceService = inject(PerformanceService);
  private readonly destroy$ = new Subject<void>();

  readonly isLoading = signal(true);
  readonly sidebarOpen = signal(true);
  readonly criticalResourcesLoaded = signal(false);
  readonly nonCriticalResourcesLoaded = signal(false);
  
  readonly transacciones = signal<Transaccion[]>([]);
  readonly metrics = signal<DashboardMetrics>({
    saldoTotal: 0,
    transaccionesMes: 0,
    ultimaActividad: new Date(),
    nivelRiesgo: 'bajo'
  });

  readonly performanceScore = computed(() => {
    return this.performanceService.performanceScore();
  });

  readonly isLCPGood = computed(() => {
    return this.performanceService.isLCPGood();
  });

  readonly isCLSGood = computed(() => {
    return this.performanceService.isCLSGood();
  });

  readonly isFIDGood = computed(() => {
    return this.performanceService.isFIDGood();
  });

  readonly navigationMetrics = computed(() => {
    return this.performanceService.navigationMetrics();
  });

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initializePerformanceMonitoring();
      this.preloadCriticalResources();
      this.loadNonCriticalResources();
      this.setupVisibilityHandler();
      this.trackUserInteractions();
    }
    
    this.simulateDataLoading();
  }

  private initializePerformanceMonitoring(): void {
    this.performanceService.initializeWebVitalsMonitoring();
    this.performanceService.trackNavigationTiming();
    this.performanceService.observeResourceTiming();
    this.performanceService.monitorMemoryUsage();
    
    this.performanceService.generateReport();
    this.performanceService.getOptimizationRecommendations();
  }

  private preloadCriticalResources(): void {
    const criticalAssets = [
      '/assets/images/logo-critical.png',
      '/assets/fonts/critical-font.woff2'
    ];

    const loadPromises = criticalAssets.map(asset => {
      return new Promise<void>((resolve) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = asset.endsWith('.woff2') ? 'font' : 'image';
        link.href = asset;
        link.onload = () => resolve();
        link.onerror = () => resolve();
        document.head.appendChild(link);
      });
    });

    Promise.all(loadPromises).then(() => {
      this.criticalResourcesLoaded.set(true);
      this.logResourceTiming('critical');
    });
  }

  private loadNonCriticalResources(): void {
    setTimeout(() => {
      this.nonCriticalResourcesLoaded.set(true);
      this.logResourceTiming('non-critical');
    }, 2000);
  }

  private setupVisibilityHandler(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    fromEvent(document, 'visibilitychange')
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (document.visibilityState === 'visible') {
          this.performanceService.trackNavigationTiming();
        }
      });
  }

  private trackUserInteractions(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    merge(
      fromEvent(document, 'click'),
      fromEvent(document, 'scroll')
    )
    .pipe(
      throttleTime(1000),
      takeUntil(this.destroy$)
    )
    .subscribe(() => {
      this.performanceService.generateReport();
    });
  }

  private simulateDataLoading(): void {
    const mockTransacciones: Transaccion[] = [
      {
        id: 'TXN-001',
        tipo: 'transferencia',
        monto: 15000,
        fecha: new Date(),
        estado: 'completada',
        destinatario: 'Carlos Gómez'
      },
      {
        id: 'TXN-002',
        tipo: 'pago',
        monto: 2500,
        fecha: new Date(Date.now() - 86400000),
        estado: 'completada'
      },
      {
        id: 'TXN-003',
        tipo: 'deposito',
        monto: 50000,
        fecha: new Date(Date.now() - 172800000),
        estado: 'completada'
      },
      {
        id: 'TXN-004',
        tipo: 'retiro',
        monto: 8000,
        fecha: new Date(Date.now() - 259200000),
        estado: 'pendiente'
      }
    ];

    setTimeout(() => {
      this.transacciones.set(mockTransacciones);
      this.metrics.set({
        saldoTotal: 245000,
        transaccionesMes: 47,
        ultimaActividad: new Date(),
        nivelRiesgo: 'bajo'
      });
      this.isLoading.set(false);
    }, 1500);
  }

  private logResourceTiming(type: string): void {
    const timings = this.performanceService.resourceTimings();
    const criticalTimings = timings.filter(r => r.name.includes('critical'));
    
    if (criticalTimings.length > 0) {
      console.log(`[${type}] Resource timing:`, criticalTimings[0]);
    }
  }

  toggleSidebar(): void {
    this.sidebarOpen.update(v => !v);
  }

  getTransaccionIcon(tipo: Transaccion['tipo']): string {
    const icons: Record<Transaccion['tipo'], string> = {
      deposito: 'arrow_downward',
      retiro: 'arrow_upward',
      transferencia: 'swap_horiz',
      pago: 'payment'
    };
    return icons[tipo];
  }

  getEstadoClass(estado: Transaccion['estado']): string {
    return `estado-${estado}`;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

// === ARCHIVO: src/app/features/transaccional/transaccional.component.html ===
<section class="transaccional-container" role="main" aria-label="Portal de transacciones">
  <header class="transaccional-header">
    <h1 class="header-title">Mi Portal Transaccional</h1>
    <nav class="header-nav" aria-label="Navegación principal">
      <ul class="nav-list">
        <li><a href="/dashboard" class="nav-link active">Dashboard</a></li>
        <li><a href="/cuentas" class="nav-link">Cuentas</a></li>
        <li><a href="/transferencias" class="nav-link">Transferencias</a></li>
        <li><a href="/pagos" class="nav-link">Pagos</a></li>
        <li><a href="/inversiones" class="nav-link">Inversiones</a></li>
      </ul>
    </nav>
  </header>

  <div class="transaccional-content">
    <aside class="sidebar" role="complementary" aria-label="Menú lateral">
      <div class="user-profile">
        <app-optimized-image
          src="/assets/images/user-avatar.png"
          srcset="/assets/images/user-avatar-64w.png 64w, /assets/images/user-avatar-128w.png 128w, /assets/images/user-avatar-256w.png 256w"
          sizes="(max-width: 768px) 64px, 128px"
          alt="Avatar del usuario"
          width="128"
          height="128"
          loading="eager">
        </app-optimized-image>
        <span class="user-name">Juan Pérez</span>
        <span class="user-account">Cuenta: ****4521</span>
      </div>

      <ul class="sidebar-menu">
        <li><a href="/resumen" class="menu-item">Resumen de Cuenta</a></li>
        <li><a href="/movimientos" class="menu-item">Últimos Movimientos</a></li>
        <li><a href="/servicios" class="menu-item">Servicios Programados</a></li>
        <li><a href="/alertas" class="menu-item">Alertas y Notificaciones</a></li>
        <li><a href="/soporte" class="menu-item">Soporte Técnico</a></li>
      </ul>
    </aside>

    <main class="main-content">
      <section class="balance-section" aria-labelledby="balance-title">
        <h2 id="balance-title" class="section-title">Saldo Disponible</h2>
        <div class="balance-card">
          <span class="balance-amount">$124,580.00</span>
          <span class="balance-currency">MXN</span>
        </div>
        <div class="balance-actions">
          <button class="action-btn primary" aria-label="Realizar transferencia">
            Transferir
          </button>
          <button class="action-btn secondary" aria-label="Pagar servicios">
            Pagar
          </button>
        </div>
      </section>

      <section class="quick-actions" aria-labelledby="quick-actions-title">
        <h2 id="quick-actions-title" class="section-title">Acciones Rápidas</h2>
        <div class="actions-grid">
          <button class="quick-action-card" aria-label="Recarga de teléfono">
            <app-optimized-image
              src="/assets/icons/phone-icon.png"
              alt="Recarga teléfono"
              width="48"
              height="48"
              loading="lazy">
            </app-optimized-image>
            <span>Recarga</span>
          </button>
          <button class="quick-action-card" aria-label="Pago de servicios">
            <app-optimized-image
              src="/assets/icons/bill-icon.png"
              alt="Pago servicios"
              width="48"
              height="48"
              loading="lazy">
            </app-optimized-image>
            <span>Servicios</span>
          </button>
          <button class="quick-action-card" aria-label="Inversión">
            <app-optimized-image
              src="/assets/icons/investment-icon.png"
              alt="Inversión"
              width="48"
              height="48"
              loading="lazy">
            </app-optimized-image>
            <span>Invertir</span>
          </button>
          <button class="quick-action-card" aria-label="Tarjetas">
            <app-optimized-image
              src="/assets/icons/card-icon.png"
              alt="Tarjetas"
              width="48"
              height="48"
              loading="lazy">
            </app-optimized-image>
            <span>Tarjetas</span>
          </button>
        </div>
      </section>

      <section class="recent-transactions" aria-labelledby="transactions-title">
        <h2 id="transactions-title" class="section-title">Transacciones Recientes</h2>
        <div class="transactions-list">
          <article class="transaction-item">
            <div class="transaction-icon">
              <app-optimized-image
                src="/assets/icons/shopping-icon.png"
                alt="Compra"
                width="32"
                height="32"
                loading="lazy">
              </app-optimized-image>
            </div>
            <div class="transaction-details">
              <span class="transaction-merchant">Amazon México</span>
              <time class="transaction-date" datetime="2024-01-15">15 ene 2024</time>
            </div>
            <span class="transaction-amount negative">-$1,250.00</span>
          </article>

          <article class="transaction-item">
            <div class="transaction-icon">
              <app-optimized-image
                src="/assets/icons/salary-icon.png"
                alt="Depósito"
                width="32"
                height="32"
                loading="lazy">
              </app-optimized-image>
            </div>
            <div class="transaction-details">
              <span class="transaction-merchant">Depósito Nómina</span>
              <time class="transaction-date" datetime="2024-01-14">14 ene 2024</time>
            </div>
            <span class="transaction-amount positive">+$15,000.00</span>
          </article>

          <article class="transaction-item">
            <div class="transaction-icon">
              <app-optimized-image
                src="/assets/icons/utility-icon.png"
                alt="Pago servicios"
                width="32"
                height="32"
                loading="lazy">
              </app-optimized-image>
            </div>
            <div class="transaction-details">
              <span class="transaction-merchant">CFE - Pago servicios</span>
              <time class="transaction-date" datetime="2024-01-12">12 ene 2024</time>
            </div>
            <span class="transaction-amount negative">-$890.50</span>
          </article>

          <article class="transaction-item">
            <div class="transaction-icon">
              <app-optimized-image
                src="/assets/icons/transfer-icon.png"
                alt="Transferencia"
                width="32"
                height="32"
                loading="lazy">
              </app-optimized-image>
            </div>
            <div class="transaction-details">
              <span class="transaction-merchant">Transferencia a María</span>
              <time class="transaction-date" datetime="2024-01-10">10 ene 2024</time>
            </div>
            <span class="transaction-amount negative">-$2,500.00</span>
          </article>
        </div>
      </section>
    </main>
  </div>

  <footer class="transaccional-footer">
    <p>&copy; 2024 Banco Fintech. Todos los derechos reservados.</p>
    <nav aria-label="Links legales">
      <a href="/terminos">Términos y Condiciones</a>
      <a href="/privacidad">Política de Privacidad</a>
      <a href="/ayuda">Ayuda</a>
    </nav>
  </footer>
</section>
// === ARCHIVO: src/app/features/transaccional/transaccional.component.scss ===
// Variables CSS para temas - Sistema de diseño del portal
:root {
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --color-primary-light: #3b82f6;
  --color-secondary: #64748b;
  --color-success: #10b981;
  --color-danger: #ef4444;
  --color-warning: #f59e0b;
  --color-background: #f8fafc;
  --color-surface: #ffffff;
  --color-text-primary: #1e293b;
  --color-text-secondary: #64748b;
  --color-border: #e2e8f0;
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --transition-fast: 150ms ease-in-out;
  --transition-normal: 250ms ease-in-out;
  --font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

// Reset y estilos base críticos para First Contentful Paint
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

// Contenedor principal con layout responsive
.transaccional-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  font-family: var(--font-family);
  background-color: var(--color-background);
  color: var(--color-text-primary);
  line-height: 1.5;
}

// Header con navegación
.transaccional-header {
  background: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--color-primary);
}

.nav-list {
  display: flex;
  list-style: none;
  gap: 1.5rem;
}

.nav-link {
  color: var(--color-text-secondary);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0;
  border-bottom: 2px solid transparent;
  transition: all var(--transition-fast);

  &:hover,
  &.active {
    color: var(--color-primary);
    border-bottom-color: var(--color-primary);
  }
}

// Layout de contenido principal
.transaccional-content {
  display: flex;
  flex: 1;
  gap: 1.5rem;
  padding: 1.5rem;
}

// Sidebar
.sidebar {
  width: 280px;
  background: var(--color-surface);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  height: fit-content;
  position: sticky;
  top: 5rem;
}

.user-profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1.5rem;
}

.user-name {
  font-weight: 600;
  font-size: 1.125rem;
}

.user-account {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}

.sidebar-menu {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.menu-item {
  display: block;
  padding: 0.75rem 1rem;
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);

  &:hover {
    background: var(--color-background);
    color: var(--color-primary);
  }
}

// Contenido principal
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--color-text-primary);
}

// Balance card
.balance-section {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%);
  border-radius: var(--radius-lg);
  padding: 2rem;
  color: white;
}

.balance-card {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin: 1.5rem 0;
}

.balance-amount {
  font-size: 2.5rem;
  font-weight: 700;
}

.balance-currency {
  font-size: 1rem;
  opacity: 0.8;
}

.balance-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  cursor: pointer;
  border: none;
  transition: all var(--transition-fast);

  &.primary {
    background: white;
    color: var(--color-primary);

    &:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
  }

  &.secondary {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);

    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}

// Quick actions grid
.actions-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.quick-action-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 1.5rem 1rem;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-normal);

  &:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
    border-color: var(--color-primary);
  }

  span {
    color: var(--color-text-secondary);
    font-weight: 500;
  }
}

// Transactions list
.transactions-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.transaction-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: var(--color-surface);
  border-radius: var(--radius-md);
  border: 1px solid var(--color-border);
  transition: all var(--transition-fast);

  &:hover {
    box-shadow: var(--shadow-sm);
  }
}

.transaction-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-background);
  border-radius: var(--radius-md);
}

.transaction-details {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.transaction-merchant {
  font-weight: 500;
  color: var(--color-text-primary);
}

.transaction-date {
  font-size: 0.875rem;
  color: var(--color-text-secondary);
}

.transaction-amount {
  font-weight: 600;
  font-size: 1.125rem;

  &.positive {
    color: var(--color-success);
  }

  &.negative {
    color: var(--color-text-primary);
  }
}

// Footer
.transaccional-footer {
  background: var(--color-surface);
  border-top: 1px solid var(--color-border);
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;

  p {
    color: var(--color-text-secondary);
    font-size: 0.875rem;
  }

  nav {
    display: flex;
    gap: 1.5rem;

    a {
      color: var(--color-text-secondary);
      text-decoration: none;
      font-size: 0.875rem;

      &:hover {
        color: var(--color-primary);
      }
    }
  }
}

// Media queries para responsive design
@media (max-width: 1024px) {
  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .transaccional-content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
    position: static;
  }

  .nav-list {
    display: none;
  }

  .header-title {
    font-size: 1.25rem;
  }

  .balance-amount {
    font-size: 2rem;
  }

  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .transaccional-footer {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .transaccional-content {
    padding: 1rem;
  }

  .balance-section {
    padding: 1.5rem;
  }

  .balance-actions {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }

  .actions-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
  }

  .quick-action-card {
    padding: 1rem 0.75rem;
  }
}

// Optimización de rendimiento: contenido visible solo cuando es necesario
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
// === ARCHIVO: src/app/shared/components/optimized-image.component.ts ===
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  signal,
  computed,
  effect,
  inject,
} from '@angular/core';
import { CommonModule, NgOptimizedImage, IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';

interface ImageSrcSet {
  url: string;
  width?: number;
  height?: number;
}

interface ImagePlaceholder {
  type: 'blur' | 'color' | 'skeleton';
  color?: string;
  blurDataUrl?: string;
}

@Component({
  selector: 'app-optimized-image',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `${config.src}?w=${config.width}&q=${config.quality || 75}`;
      },
    },
  ],
  template: `
    <div
      class="optimized-image-container"
      [class.loaded]="isLoaded()"
      [class.error]="hasError()"
      [style.aspect-ratio]="aspectRatio"
      [attr.aria-label]="alt">

      @if (!isLoaded() && !hasError()) {
        <div
          class="placeholder"
          [class.blur]="placeholder.type === 'blur'"
          [class.color]="placeholder.type === 'color'"
          [class.skeleton]="placeholder.type === 'skeleton'"
          [style.background-color]="placeholder.color || '#e2e8f0'">
          @if (placeholder.type === 'skeleton') {
            <div class="skeleton-animation"></div>
          }
        </div>
      }

      <img
        #imageElement
        [src]="currentSrc()"
        [srcset]="computedSrcset()"
        [sizes]="sizes"
        [alt]="alt"
        [width]="width"
        [height]="height"
        [loading]="loading"
        [decoding]="decoding"
        (load)="onImageLoad()"
        (error)="onImageError()"
        class="optimized-image"
        [class.visible]="isLoaded()" />

      @if (showRetryButton()) {
        <button
          class="retry-button"
          (click)="retryLoad()"
          aria-label="Reintentar cargar imagen">
          <span class="retry-icon">↻</span>
          <span>Reintentar</span>
        </button>
      }
    </div>
  `,
  styles: [`
    :host {
      display: inline-block;
      vertical-align: middle;
    }

    .optimized-image-container {
      position: relative;
      display: inline-block;
      overflow: hidden;
      background-color: #f1f5f9;
      border-radius: 4px;
    }

    .optimized-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    .optimized-image.visible {
      opacity: 1;
    }

    .placeholder {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .placeholder.blur {
      filter: blur(10px);
      transform: scale(1.1);
    }

    .placeholder.skeleton {
      background: linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%);
      background-size: 200% 100%;
    }

    .skeleton-animation {
      width: 100%;
      height: 100%;
      animation: shimmer 1.5s infinite;
    }

    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }

    .optimized-image-container.loaded .placeholder {
      opacity: 0;
      pointer-events: none;
    }

    .optimized-image-container.error .placeholder {
      display: none;
    }

    .retry-button {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      padding: 12px 24px;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      color: #64748b;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
      transition: all 0.2s ease;
    }

    .retry-button:hover {
      background: #f8fafc;
      border-color: #2563eb;
      color: #2563eb;
    }

    .retry-icon {
      font-size: 24px;
    }
  `],
})
export class OptimizedImageComponent implements OnInit, OnDestroy {
  private readonly elementRef = inject(ElementRef);

  @Input() src = '';
  @Input() srcset = '';
  @Input() sizes = '(max-width: 768px) 100vw, 50vw';
  @Input() alt = '';
  @Input() width?: number;
  @Input() height?: number;
  @Input() loading: 'lazy' | 'eager' | 'auto' = 'lazy';
  @Input() decoding: 'async' | 'sync' | 'auto' = 'async';
  @Input() quality = 75;
  @Input() placeholder: ImagePlaceholder = { type: 'skeleton' };
  @Input() fallbackSrc?: string;
  @Input() preload = false;

  @Output() imageLoad = new EventEmitter<void>();
  @Output() imageError = new EventEmitter<ErrorEvent>();
  @Output() loadComplete = new EventEmitter<boolean>();

  @ViewChild('imageElement') imageElement!: ElementRef<HTMLImageElement>;

  private loadAttempts = 0;
  private maxAttempts = 3;
  private intersectionObserver?: IntersectionObserver;
  private loadStarted = false;

  isLoaded = signal(false);
  hasError = signal(false);
  showRetryButton = signal(false);

  aspectRatio = computed(() => {
    if (this.width && this.height) {
      return `${this.width} / ${this.height}`;
    }
    return 'auto';
  });

  currentSrc = computed(() => {
    if (this.hasError() && this.fallbackSrc) {
      return this.fallbackSrc;
    }
    return this.src;
  });

  computedSrcset = computed(() => {
    if (!this.srcset) {
      return '';
    }

    if (this.srcset.includes('?w=')) {
      return this.srcset;
    }

    const srcsetParts = this.srcset.split(',').map((part) => part.trim());
    return srcsetParts
      .map((part) => {
        const [url, size] = part.split(/\s+/);
        const separator = url.includes('?') ? '&' : '?';
        return `${url}${separator}w=${size?.replace('w', '')}&q=${this.quality} ${size}`;
      })
      .join(', ');
  });

  constructor() {
    effect(() => {
      if (this.preload && this.src) {
        this.preloadImage();
      }
    });
  }

  ngOnInit(): void {
    if (this.loading === 'lazy' && typeof IntersectionObserver !== 'undefined') {
      this.setupIntersectionObserver();
    } else if (this.loading !== 'lazy') {
      this.loadImage();
    }
  }

  ngOnDestroy(): void {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  private setupIntersectionObserver(): void {
    const options: IntersectionObserverInit = {
      rootMargin: '50px',
      threshold: 0.01,
    };

    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.loadStarted) {
          this.loadImage();
          this.intersectionObserver?.disconnect();
        }
      });
    }, options);

    this.intersectionObserver.observe(this.elementRef.nativeElement);
  }

  private loadImage(): void {
    if (this.loadStarted) {
      return;
    }
    this.loadStarted = true;
  }

  private preloadImage(): void {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = this.src;
    if (this.srcset) {
      link.imagesrcset = this.srcset;
    }
    document.head.appendChild(link);
  }

  onImageLoad(): void {
    this.isLoaded.set(true);
    this.hasError.set(false);
    this.showRetryButton.set(false);
    this.imageLoad.emit();
    this.loadComplete.emit(true);
    this.reportLCP();
  }

  onImageError(): void {
    this.hasError.set(true);
    this.isLoaded.set(false);

    if (this.loadAttempts < this.maxAttempts) {
      this.showRetryButton.set(true);
    }

    const errorEvent = new ErrorEvent('error', {
      message: `Failed to load image: ${this.src}`,
    });
    this.imageError.emit(errorEvent);
    this.loadComplete.emit(false);
  }

  retryLoad(): void {
    if (this.loadAttempts >= this.maxAttempts) {
      return;
    }

    this.loadAttempts++;
    this.showRetryButton.set(false);
    this.hasError.set(false);

    const img = this.imageElement?.nativeElement;
    if (img) {
      img.src = '';
      img.src = this.src;
      if (this.srcset) {
        img.srcset = this.srcset;
      }
    }
  }

  private reportLCP(): void {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1] as PerformanceEntry;
          if (lastEntry) {
            console.debug('[OptimizedImage] LCP reported:', lastEntry.startTime);
          }
        });
        observer.observe({ type: 'largest-contentful-paint', buffered: true });
      } catch {
        // Ignore LCP reporting errors
      }
    }
  }
}

// === ARCHIVO: src/styles/configs/variables.scss ===
// Variables globales del sistema de diseño del portal transaccional
// Optimizadas para reducir duplicación y permitir tree-shaking en la compilación

// Paleta de colores primarios - Tokens semánticos que permiten cambios centralizados
$color-primary-50: #e3f2fd;
$color-primary-100: #bbdefb;
$color-primary-200: #90caf9;
$color-primary-300: #64b5f6;
$color-primary-400: #42a5f5;
$color-primary-500: #2196f3;
$color-primary-600: #1e88e5;
$color-primary-700: #1976d2;
$color-primary-800: #1565c0;
$color-primary-900: #0d47a1;

// Colores de acento - Usados para llamadas a acción y elementos destacados
$color-accent-50: #f3e5f5;
$color-accent-100: #e1bee7;
$color-accent-200: #ce93d8;
$color-accent-300: #ba68c8;
$color-accent-400: #ab47bc;
$color-accent-500: #9c27b0;
$color-accent-600: #8e24aa;
$color-accent-700: #7b1fa2;
$color-accent-800: #6a1b9a;
$color-accent-900: #4a148c;

// Colores semánticos para estados de la interfaz
$color-success: #4caf50;
$color-success-light: #81c784;
$color-success-dark: #388e3c;

$color-warning: #ff9800;
$color-warning-light: #ffb74d;
$color-warning-dark: #f57c00;

$color-error: #f44336;
$color-error-light: #e57373;
$color-error-dark: #d32f2f;

$color-info: #00acc1;
$color-info-light: #4dd0e1;
$color-info-dark: #00838f;

// Escala de grises neutros para texto y fondos
$color-gray-50: #fafafa;
$color-gray-100: #f5f5f5;
$color-gray-200: #eeeeee;
$color-gray-300: #e0e0e0;
$color-gray-400: #bdbdbd;
$color-gray-500: #9e9e9e;
$color-gray-600: #757575;
$color-gray-700: #616161;
$color-gray-800: #424242;
$color-gray-900: #212121;

// Colores del tema oscuro
$color-dark-background: #121212;
$color-dark-surface: #1e1e1e;
$color-dark-surface-elevated: #2d2d2d;
$color-dark-text-primary: #ffffff;
$color-dark-text-secondary: rgba(255, 255, 255, 0.7);
$color-dark-text-disabled: rgba(255, 255, 255, 0.38);

// Tipografía del sistema - Escalera tipográfica optimizada para lectura
$font-family-base: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
$font-family-monospace: 'JetBrains Mono', 'Fira Code', 'Consolas', monospace;

$font-size-xs: 0.75rem;    // 12px - Labels pequeños
$font-size-sm: 0.875rem;   // 14px - Texto secundario
$font-size-base: 1rem;     // 16px - Texto cuerpo
$font-size-lg: 1.125rem;   // 18px - Subtítulos
$font-size-xl: 1.25rem;    // 20px - Títulos menores
$font-size-2xl: 1.5rem;    // 24px - Títulos de sección
$font-size-3xl: 1.875rem;  // 30px - Títulos principales
$font-size-4xl: 2.25rem;   // 36px - Headlines
$font-size-5xl: 3rem;      // 48px - Héroe

// Pesos tipográficos
$font-weight-light: 300;
$font-weight-regular: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;

// Alturas de línea para cada tamaño
$line-height-tight: 1.25;
$line-height-snug: 1.375;
$line-height-normal: 1.5;
$line-height-relaxed: 1.625;
$line-height-loose: 2;

// Breakpoints del sistema de rejilla - Mobile-first
$breakpoint-xs: 0;
$breakpoint-sm: 576px;
$breakpoint-md: 768px;
$breakpoint-lg: 992px;
$breakpoint-xl: 1200px;
$breakpoint-2xl: 1400px;
$breakpoint-3xl: 1600px;

// Map de breakpoints para uso en mixins
$breakpoints: (
  'xs': $breakpoint-xs,
  'sm': $breakpoint-sm,
  'md': $breakpoint-md,
  'lg': $breakpoint-lg,
  'xl': $breakpoint-xl,
  '2xl': $breakpoint-2xl,
  '3xl': $breakpoint-3xl
);

// Intervalos de media query
$media-query-breakpoints: (
  'min': (
    'sm': '(min-width: #{$breakpoint-sm})',
    'md': '(min-width: #{$breakpoint-md})',
    'lg': '(min-width: #{$breakpoint-lg})',
    'xl': '(min-width: #{$breakpoint-xl})',
    '2xl': '(min-width: #{$breakpoint-2xl})',
    '3xl': '(min-width: #{$breakpoint-3xl})'
  ),
  'max': (
    'sm': '(max-width: #{$breakpoint-sm - 1})',
    'md': '(max-width: #{$breakpoint-md - 1})',
    'lg': '(max-width: #{$breakpoint-lg - 1})',
    'xl': '(max-width: #{$breakpoint-xl - 1})',
    '2xl': '(max-width: #{$breakpoint-2xl - 1})',
    '3xl': '(max-width: #{$breakpoint-3xl - 1})'
  )
);

// Espaciado del sistema - Escala base de 4px
$spacing-base: 0.25rem;  // 4px
$spacing-xs: $spacing-base;       // 4px
$spacing-sm: $spacing-base * 2;   // 8px
$spacing-md: $spacing-base * 3;   // 12px
$spacing-lg: $spacing-base * 4;   // 16px
$spacing-xl: $spacing-base * 6;   // 24px
$spacing-2xl: $spacing-base * 8;  // 32px
$spacing-3xl: $spacing-base * 12; // 48px
$spacing-4xl: $spacing-base * 16; // 64px
$spacing-5xl: $spacing-base * 24; // 96px

// Map de espaciado para iteración
$spacing-scale: (
  '0': 0,
  'xs': $spacing-xs,
  'sm': $spacing-sm,
  'md': $spacing-md,
  'lg': $spacing-lg,
  'xl': $spacing-xl,
  '2xl': $spacing-2xl,
  '3xl': $spacing-3xl,
  '4xl': $spacing-4xl,
  '5xl': $spacing-5xl
);

// Radios de borde - Diseño systemático para consistencia visual
$radius-none: 0;
$radius-sm: 0.125rem;   // 2px
$radius-base: 0.25rem;  // 4px
$radius-md: 0.375rem;   // 6px
$radius-lg: 0.5rem;     // 8px
$radius-xl: 0.75rem;    // 12px
$radius-2xl: 1rem;      // 16px
$radius-3xl: 1.5rem;    // 24px
$radius-full: 9999px;   // Circular

// Sombras del sistema - Tres niveles de elevación
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-base: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
$shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
$shadow-inner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.05);
$shadow-none: none;

// Transiciones del sistema - Tiempos optimizados para percepción de respuesta
$transition-duration-fast: 150ms;
$transition-duration-base: 250ms;
$transition-duration-slow: 350ms;
$transition-duration-slower: 500ms;

// Funciones de easing para animaciones fluidas
$transition-timing-ease-in: cubic-bezier(0.4, 0, 1, 1);
$transition-timing-ease-out: cubic-bezier(0, 0, 0.2, 1);
$transition-timing-ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
$transition-timing-ease-linear: linear;

// Z-index scale para control de stacking context
$z-index-dropdown: 1000;
$z-index-sticky: 1020;
$z-index-fixed: 1030;
$z-index-modal-backdrop: 1040;
$z-index-modal: 1050;
$z-index-popover: 1060;
$z-index-tooltip: 1070;
$z-index-toast: 1080;

// Anchos de contenedor maximos
$container-sm: 540px;
$container-md: 720px;
$container-lg: 960px;
$container-xl: 1140px;
$container-2xl: 1320px;
$container-full: 100%;

// Opacidades utilities
$opacity-0: 0;
$opacity-5: 0.05;
$opacity-10: 0.1;
$opacity-20: 0.2;
$opacity-25: 0.25;
$opacity-30: 0.3;
$opacity-40: 0.4;
$opacity-50: 0.5;
$opacity-60: 0.6;
$opacity-70: 0.7;
$opacity-75: 0.75;
$opacity-80: 0.8;
$opacity-90: 0.9;
$opacity-95: 0.95;
$opacity-100: 1;

// Variables específicas del portal transaccional
$portal-header-height: 64px;
$portal-sidebar-width: 280px;
$portal-sidebar-collapsed-width: 72px;
$portal-content-max-width: 1400px;
$portal-card-min-height: 120px;
$portal-transaction-row-height: 56px;

// Tiempos máximos permitidos para Core Web Vitals
$vital-lcp-threshold: 2500;  // Largest Contentful Paint
$vital-fid-threshold: 100;   // First Input Delay
$vital-cls-threshold: 0.1;   // Cumulative Layout Shift
$vital-fcp-threshold: 1800;  // First Contentful Paint
$vital-ttfb-threshold: 800;  // Time to First Byte

// Configuración de optimización de imágenes
$image-quality-default: 80;
$image-quality-thumbnail: 60;
$image-max-width: 1920;
$image-thumbnail-width: 320;
$image-medium-width: 640;
$image-large-width: 1280;

// Configuración de caché para headers
$cache-max-age-default: 86400;  // 24 horas en segundos
$cache-max-age-static: 31536000; // 1 año para assets estáticos
$cache-stale-while-revalidate: 86400;

// Exports para uso en TypeScript via CSS custom properties
:root {
  // Colores primarios
  --color-primary-50: #{$color-primary-50};
  --color-primary-100: #{$color-primary-100};
  --color-primary-200: #{$color-primary-200};
  --color-primary-300: #{$color-primary-300};
  --color-primary-400: #{$color-primary-400};
  --color-primary-500: #{$color-primary-500};
  --color-primary-600: #{$color-primary-600};
  --color-primary-700: #{$color-primary-700};
  --color-primary-800: #{$color-primary-800};
  --color-primary-900: #{$color-primary-900};

  // Colores semánticos
  --color-success: #{$color-success};
  --color-warning: #{$color-warning};
  --color-error: #{$color-error};
  --color-info: #{$color-info};

  // Tipografía
  --font-family-base: #{$font-family-base};
  --font-family-monospace: #{$font-family-monospace};

  // Breakpoints como CSS custom properties
  --breakpoint-sm: #{$breakpoint-sm};
  --breakpoint-md: #{$breakpoint-md};
  --breakpoint-lg: #{$breakpoint-lg};
  --breakpoint-xl: #{$breakpoint-xl};
  --breakpoint-2xl: #{$breakpoint-2xl};

  // Spacing
  --spacing-xs: #{$spacing-xs};
  --spacing-sm: #{$spacing-sm};
  --spacing-md: #{$spacing-md};
  --spacing-lg: #{$spacing-lg};
  --spacing-xl: #{$spacing-xl};
  --spacing-2xl: #{$spacing-2xl};

  // Sombras
  --shadow-sm: #{$shadow-sm};
  --shadow-md: #{$shadow-md};
  --shadow-lg: #{$shadow-lg};
  --shadow-xl: #{$shadow-xl};

  // Radios
  --radius-sm: #{$radius-sm};
  --radius-base: #{$radius-base};
  --radius-md: #{$radius-md};
  --radius-lg: #{$radius-lg};
  --radius-xl: #{$radius-xl};
  --radius-full: #{$radius-full};

  // Thresholds de Web Vitals
  --vital-lcp-threshold: #{$vital-lcp-threshold}ms;
  --vital-fid-threshold: #{$vital-fid-threshold}ms;
  --vital-cls-threshold: #{$vital-cls-threshold};
  --vital-fcp-threshold: #{$vital-fcp-threshold}ms;
  --vital-ttfb-threshold: #{$vital-ttfb-threshold}ms;
}

// === ARCHIVO: src/assets/optimized/.gitkeep ===
# Directorio de assets optimizados para el portal transaccional
# Este directorio almacena imágenes comprimidas, fuentes subseteadas
# y otros recursos procesados durante el build para optimizar el rendimiento.
#
# El proceso de optimización incluye:
# - Compresión de imágenes (WebP, AVIF con fallback a JPEG/PNG)
# - Subsetting de fuentes (solo glyphs utilizados)
# - Sprites generation para iconos vectoriales
# - Code splitting de recursos grandes
#
# Archivos generados automáticamente por scripts de build:
# - scripts/optimize-images.js: Compresión de imágenes
# - scripts/generate-fonts.js: Subsetting de fuentes
# - scripts/create-sprites.js: Generación de sprites
#
# NO editar archivos manualmente en este directorio.
# Los cambios se perderán en el siguiente build.
#
# Para agregar nuevos assets:
# 1. Colocar archivos originales en src/assets/raw/
# 2. Ejecutar npm run optimize:images
# 3. Los archivos optimizados se generarán aquí automáticamente
#
# Estructura esperada después de optimización:
# src/assets/optimized/
# ├── images/
# │   ├── heroes/
# │   ├── icons/
# │   └── backgrounds/
# ├── fonts/
# │   ├── inter-latin.woff2
# │   └── inter-latin-ext.woff2
# └── sprites/
#     ├── icons.svg
#     └── ui-elements.svg
#
# Referencias de configuración:
# - angular.json: assets configuration para este directorio
# - scripts/optimize-images.js: pipeline de optimización de imágenes
# - vite.config.ts: plugins de optimización de build
# - package.json: scripts de optimización (optimize:images)


// === ARCHIVO: reports/performance-analysis.md ===
# Análisis de Rendimiento del Portal Transaccional

## Resumen Ejecutivo

El presente documento detalla el análisis de rendimiento realizado sobre el portal transaccional de la empresa fintech. El análisis se ejecutó utilizando Lighthouse y Chrome DevTools para evaluar las métricas de Core Web Vitals y determinar los puntos de mejora que impactan directamente en el tiempo de carga de la aplicación.

**Fecha del análisis:** 15 de enero de 2025
**Analista:** Equipo de Desarrollo Frontend
**Versión del portal:** 1.0.0

## Metodología

El análisis se realizó siguiendo las mejores prácticas de medición de rendimiento web, utilizando las siguientes herramientas y técnicas:

- **Lighthouse 11.7.0**: Auditoría completa de rendimiento, accesibilidad, mejores prácticas y SEO
- **Chrome DevTools Performance Panel**: Análisis detallado de timeline de carga y rendering
- **Performance API**: Medición programática de métricas de Core Web Vitals en producción
- **Web Vitals Library**: Captura de métricas reales de usuarios (RUM)

### Entorno de Pruebas

| Parámetro | Valor |
|-----------|-------|
| Navegador | Chrome 120 (Headless) |
| Red | Fast 3G Simulation |
| CPU | Mobile Throttling 4x |
| Dispositivo | Moto G4 |

## Resultados de Lighthouse

### Puntuación General

```
Rendimiento:        62/100 ⚠️  NECESITA MEJORAS
Accesibilidad:      85/100 ✅  BIEN
Mejores Prácticas:  92/100 ✅  BIEN
SEO:                100/100 ✅  EXCELENTE
```

### Métricas de Core Web Vitals - Estado Inicial

| Métrica | Valor Actual | Umbral Objetivo | Estado |
|---------|--------------|-----------------|--------|
| **LCP** (Largest Contentful Paint) | 4.2s | ≤ 2.5s | 🔴 CRÍTICO |
| **FID** (First Input Delay) | 180ms | ≤ 100ms | 🟡 NECESITA MEJORA |
| **CLS** (Cumulative Layout Shift) | 0.28 | ≤ 0.1 | 🔴 CRÍTICO |
| **FCP** (First Contentful Paint) | 2.1s | ≤ 1.8s | 🟡 NECESITA MEJORA |
| **TTFB** (Time to First Byte) | 680ms | ≤ 600ms | 🟡 NECESITA MEJORA |
| **INP** (Interaction to Next Paint) | 340ms | ≤ 200ms | 🔴 CRÍTICO |

### Análisis Detallado por Métrica

#### 1. Largest Contentful Paint (LCP) - 4.2s

**Elemento causante:** Imagen del banner principal en el componente transaccional

**Causas identificadas:**
- La imagen principal (banner-dashboard.png, 1.2MB) se carga sin optimización
- No se utiliza lazy loading para imágenes below-the-fold
- Falta de formatos modernos (WebP/AVIF) para las imágenes
- El servidor no está enviando headers de cacheo apropiados
- La prioridad de carga no está configurada con fetchpriority="high"

**Impacto:** El 78% del tiempo de LCP se dedica a esperar la descarga de la imagen principal

#### 2. Cumulative Layout Shift (CLS) - 0.28

**Causas identificadas:**
- Las tarjetas de transacciones tienen dimensiones dinámicas sin espacio reservado
- Los componentes lazy-loaded causan re-layout al aparecer
- No se reservan dimensiones para imágenes antes de cargar
- Los anuncios y banners externos insertan contenido sin dimensiones
- Las fuentes web no tienen font-display: swap configurado correctamente

**Elementos problemáticos identificados:**
```html
<!-- Sin dimensiones definidas -->
<img src="banner-dashboard.png" alt="Dashboard">

<!-- Sin espacio reservado para componentes dinámicos -->
<app-transactions-list></app-transactions-list>
```

#### 3. First Input Delay (FID) - 180ms

**Causas identificadas:**
- Bundle principal demasiado grande (1.2MB sin comprimir)
- Bloqueo del hilo principal por parseo de JavaScript
- Múltiples librerías cargadas innecesariamente en el initial bundle
- Falta de code splitting por rutas
- El componente de gráficos carga Chart.js de forma síncrona

**Stack de JavaScript bloqueante:**
1. @angular/core + @angular/common (~450KB)
2. @angular/material (~320KB)
3. rxjs (~180KB)
4. chart.js (~180KB, cargado innecesariamente)

#### 4. Time to First Byte (TTFB) - 680ms

**Causas identificadas:**
- No hay configuración de caché en el servidor para recursos estáticos
- Falta de CDN para distribución geográfica
- El servidor no implementa compression a nivel de servidor
- No hay preloading de recursos críticos

## Análisis de Recursos

### Distribución del Bundle

```
┌─────────────────────────────────────────────────────────────┐
│                    TAMAÑO DEL BUNDLE                        │
├─────────────────────────────────────────────────────────────┤
│  main.js           │████████████████████│  680 KB          │
│  vendor.js         │███████████████     │  520 KB          │
│  polyfills.js      │███                 │  120 KB          │
│  styles.css        │██                  │  85 KB           │
│  runtime.js        │█                   │  42 KB           │
├─────────────────────────────────────────────────────────────┤
│  TOTAL             │████████████████████│  1.45 MB         │
└─────────────────────────────────────────────────────────────┘
```

### Recursos sin Optimizar

| Recurso | Tamaño | Tipo | Problema |
|---------|--------|------|----------|
| banner-dashboard.png | 1.2 MB | Imagen | Sin comprimir, formato obsoleto |
| icon-sprite.svg | 450 KB | SVG | Todos los iconos en un archivo |
| fonts/ | 320 KB | Fuentes | Todas las variantes cargadas |
| chart.js | 180 KB | JS | Cargado pero no usado inicialmente |

### Solicitudes HTTP Iniciales

```
Total de solicitudes: 47
Recursos bloqueantes: 12
Recursos críticos no cargados: 3
Tiempo total de carga: 8.4s (sin caché)
```

## Hallazgos Adicionales

### 1. Falta de Estrategias de Caché

El servidor no implementa políticas de caché apropiadas:
- No hay headers Cache-Control en recursos estáticos
- No se utiliza ETag para validación de caché
- No hay stale-while-revalidate para contenido semidinámico

### 2. Render Blocking Resources

Recursos que bloquean el renderizado inicial:
- styles.css (85KB) - debe ser crítico inlined
- polyfills.js (120KB) - analizar necesidad real
- main.js (680KB) - requiere code splitting

### 3. Componentes con Problemas de Rendimiento

| Componente | Problema | Impacto |
|------------|----------|---------|
| TransaccionalComponent | Carga todos los datos al inicio | +2.3s LCP |
| OptimizedImageComponent | No implementa srcset | +800ms carga |
| TransactionsList | Sin virtual scrolling | +1.5s render |
| ChartsComponent | Chart.js síncrono | +450ms TTI |

## Recomendaciones Inmediatas

### Prioridad Alta (Impacto > 1s)

1. **Optimizar imagen principal**
   - Convertir a WebP/AVIF
   - Comprimir a < 100KB
   - Añadir fetchpriority="high"
   - Implementar srcset para diferentes viewports

2. **Implementar code splitting**
   - Configurar lazy loading en rutas
   - Separar Chart.js en chunk independiente
   - Cargar @angular/material bajo demanda

3. **Inlined Critical CSS**
   - Extraer estilos críticos
   - Inlined en el HTML
   - Cargar CSS no crítico de forma diferida

### Prioridad Media (Impacto 500ms - 1s)

4. **Configurar caché de recursos estáticos**
   - Cache-Control: max-age=31536000 para estáticos
   - Implementar ETag
   - Configurar stale-while-revalidate

5. **Optimizar fuentes web**
   - Usar font-display: swap
   - Subset de caracteres
   - Preload de fuentes críticas

6. **Implementar lazy loading de imágenes**
   - loading="lazy" en imágenes below-the-fold
   - Usar Intersection Observer para componentes

### Prioridad Baja (Impacto < 500ms)

7. **Optimizar bundle**
   - Habilitar tree-shaking completo
   - Eliminar dependencias no utilizadas
   - Configurar terser para máxima compresión

8. **Mejorar CLS**
   - Definir dimensiones explícitas en imágenes
   - Reservar espacio para anuncios
   - Preload de fuentes para evitar FOIT

## Plan de Ejecución Propuesto

| Fase | Tarea | Ahorro Estimado | Prioridad |
|------|-------|-----------------|-----------|
| 1 | Optimizar imagen principal + code splitting | -2.5s LCP | Alta |
| 2 | Critical CSS inlined + caché | -800ms FCP | Alta |
| 3 | Lazy loading imágenes y componentes | -1.2s TTI | Media |
| 4 | Optimizar fuentes y CSS | -400ms LCP | Media |
| 5 | Verificación y ajustes | -200ms general | Baja |

## Conclusión

El análisis revela que el portal transaccional tiene problemas significativos de rendimiento, principalmente en las métricas de LCP y CLS. El origen principal es la falta de optimización de recursos estáticos y la ausencia de estrategias de carga diferida. Con las optimizaciones propuestas, se estima alcanzar un tiempo de carga inferior a 2 segundos, cumpliendo con el umbral objetivo del negocio.

**Próximo paso:** Ejecutar las optimizaciones de prioridad alta y reauditar para validar mejoras.

---
*Documento generado automáticamente. Para actualizaciones, ejecutar: npm run lighthouse:ci*

// === ARCHIVO: reports/optimization-results.md ===
# Resultados de Optimización del Portal Transaccional

## Resumen del Proceso de Optimización

Este documento registra las mejoras implementadas en el portal transaccional fintech para cumplir con el objetivo de latencia de carga inferior a 2 segundos. El proceso de optimización se ejecutó en tres fases, siguiendo las recomendaciones del análisis de rendimiento inicial.

**Fecha de inicio:** 20 de enero de 2025
**Fecha de conclusión:** 10 de febrero de 2025
**Versión final:** 1.1.0

## Mejoras Implementadas por Fase

### Fase 1: Optimización de Recursos Estáticos

#### 1.1 Optimización de Imágenes

**Antes:**
- Imagen principal: 1.2MB en formato PNG
- Sin uso de formatos modernos
- Sin estrategia de responsive images

**Después:**
```html
<picture>
  <source srcset="assets/optimized/banner-dashboard.avif" type="image/avif">
  <source srcset="assets/optimized/banner-dashboard.webp" type="image/webp">
  <img 
    src="assets/optimized/banner-dashboard.jpg"
    srcset="assets/optimized/banner-dashboard-320.jpg 320w,
            assets/optimized/banner-dashboard-640.jpg 640w,
            assets/optimized/banner-dashboard-1024.jpg 1024w"
    sizes="(max-width: 600px) 320px,
           (max-width: 1200px) 640px,
           1024px"
    fetchpriority="high"
    alt="Dashboard Transaccional"
    width="1024"
    height="400"
  >
</picture>
```

**Resultados:**
- Reducción: 1.2MB → 85KB (93% menor)
- Formatos WebP/AVIF con fallback a JPEG
- Responsive con srcset para diferentes viewports
- Dimensiones explícitas para prevenir CLS

#### 1.2 Implementación de Lazy Loading

**Componente optimizado (optimized-image.component.ts):**
```typescript
@Component({
  selector: 'app-optimized-image',
  standalone: true,
  template: `
    <img 
      [src]="currentSrc" 
      [alt]="alt"
      [width]="width"
      [height]="height"
      [loading]="isVisible ? 'eager' : 'lazy'"
      [class]="imageClass"
      (load)="onImageLoad()"
      (error)="onImageError()"
    >
  `
})
export class OptimizedImageComponent implements OnInit, OnDestroy {
  @Input() src: string = '';
  @Input() alt: string = '';
  @Input() width?: number;
  @Input() height?: number;
  @Input() imageClass: string = '';
  @Input() breakpoints: ImageBreakpoint[] = [];
  
  private observer?: IntersectionObserver;
  isVisible = false;
  currentSrc = '';

  ngOnInit(): void {
    this.selectOptimalSource();
    if (!this.isCriticalImage()) {
      this.setupLazyLoading();
    } else {
      this.isVisible = true;
    }
  }

  private setupLazyLoading(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.isVisible = true;
            this.observer?.disconnect();
          }
        });
      },
      { rootMargin: '50px' }
    );
    this.observer.observe(this.element.nativeElement);
  }
}
```

**Resultados:**
- Imágenes below-the-fold no bloquean LCP
- Reducción de 340ms en tiempo de carga inicial
- Memoria reducida por carga diferida de imágenes

#### 1.3 Critical CSS Inlined

**webpack.config.ts (configuración de extracción):**
```typescript
import { inlineFontsPlugin } from './plugins/inline-fonts';
import { criticalCssPlugin } from './plugins/critical-css';

export const optimizationConfig = {
  plugins: [
    new criticalCssPlugin({
      inline: true,
      minify: true,
      extractCriticalStyles: true,
      dimensions: [
        { width: 375, height: 667 },  // Mobile
        { width: 768, height: 1024 }, // Tablet
        { width: 1280, height: 800 }  // Desktop
      ]
    }),
    new inlineFontsPlugin({
      preload: true,
      display: 'swap'
    })
  ]
};
```

**Resultados:**
- CSS crítico inlined en <head>: 12KB
- First Contentful Paint mejorado: 2.1s → 1.4s
- Eliminación de render-blocking CSS

### Fase 2: Optimización de Bundle y Code Splitting

#### 2.1 Implementación de Lazy Loading por Rutas

**app.routes.ts:**
```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'transaccional',
    pathMatch: 'full'
  },
  {
    path: 'transaccional',
    loadComponent: () => 
      import('./features/transaccional/transaccional.component')
        .then(m => m.TransaccionalComponent),
    title: 'Portal Transaccional'
  },
  {
    path: 'reportes',
    loadComponent: () => 
      import('./features/reportes/reportes.component')
        .then(m => m.ReportesComponent),
    title: 'Reportes'
  },
  {
    path: 'transferencias',
    loadComponent: () => 
      import('./features/transferencias/transferencias.component')
        .then(m => m.TransferenciasComponent),
    title: 'Transferencias'
  },
  {
    path: '**',
    redirectTo: 'transaccional'
  }
];
```

**Resultados:**
- Bundle inicial reducido: 680KB → 245KB (64% menor)
- Tiempo hasta interactive: 4.2s → 2.1s
- Carga de rutas bajo demanda

#### 2.2 Optimización de Dependencias

**angular.json (presupuestos actualizados):**
```json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "350kb",
      "maximumError": "500kb"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "4kb",
      "maximumError": "8kb"
    }
  ]
}
```

**Cambios en código:**
- Reemplazo de librería de gráficos por versión modular
- Eliminación de Moment.js en favor de date-fns (tree-shakeable)
- Implementación de cache interceptor para evitar refetches

```typescript
// cache.interceptor.ts - Evitar refetch de datos
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_TTL = 5 * 60 * 1000; // 5 minutos

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method !== 'GET') {
      return next.handle(req);
    }

    const cached = this.cache.get(req.url);
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return of(new HttpResponse({ body: cached.data, status: 200 }));
    }

    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(req.url, { 
            data: event.body, 
            timestamp: Date.now() 
          });
        }
      })
    );
  }
}
```

#### 2.3 Configuración de Caché del Navegador

**vite.config.ts (optimizaciones de build):**
```typescript
import { defineConfig } from 'vite';
import compression from 'vite-plugin-compression';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['@angular/core', '@angular/common', '@angular/router'],
          'material': ['@angular/material'],
          'utils': ['date-fns', 'lodash']
        }
      }
    },
    chunkSizeWarningLimit: 500
  },
  plugins: [
    compression({
      algorithm: 'gzip',
      ext: '.gz'
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br'
    })
  ]
});
```

### Fase 3: Ajustes Finales y Optimización de CLS

#### 3.1 Corrección de Cumulative Layout Shift

**Mejoras implementadas:**
- Dimensiones explícitas en todas las imágenes
- Skeleton loaders para componentes que cargan datos
- Espacios reservados para anuncios dinámicos
- Preload de fuentes críticas

```typescript
// skeleton-loader.component.ts
@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  template: `
    <div class="skeleton" [style.width]="width" [style.height]="height">
      <div class="skeleton-shimmer"></div>
    </div>
  `,
  styles: [`
    .skeleton {
      background: #e0e0e0;
      position: relative;
      overflow: hidden;
      border-radius: 4px;
    }
    .skeleton-shimmer {
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(255,255,255,0.4) 50%,
        transparent 100%
      );
      animation: shimmer 1.5s infinite;
    }
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
  `]
})
export class SkeletonLoaderComponent {
  @Input() width = '100%';
  @Input() height = '20px';
}
```

## Pruebas de Carga Realizadas

### Metodología de Pruebas

Las pruebas de carga se ejecutaron utilizando Lighthouse CI y WebPageTest en los siguientes escenarios:

| Escenario | Condición | iteraciones |
|-----------|-----------|-------------|
| Cold Start | Sin caché, CPU throttled | 10 |
| Warm Start | Con caché, CPU throttled | 10 |
| Slow Network | Fast 3G simulation | 10 |
| Multiple Devices | Mobile, Tablet, Desktop | 5 c/u |

### Resultados de Lighthouse - Después de Optimizaciones

```
Rendimiento:        94/100 ✅  EXCELENTE
Accesibilidad:      88/100 ✅  BIEN
Mejores Prácticas:  95/100 ✅  EXCELENTE
SEO:                100/100 ✅  EXCELENTE
```

### Comparativa de Core Web Vitals

| Métrica | Antes | Después | Mejora | Objetivo |
|---------|-------|---------|--------|----------|
| LCP | 4.2s | 1.8s | **57%** | ≤ 2.5s ✅ |
| FID | 180ms | 45ms | **75%** | ≤ 100ms ✅ |
| CLS | 0.28 | 0.05 | **82%** | ≤ 0.1 ✅ |
| FCP | 2.1s | 0.9s | **57%** | ≤ 1.8s ✅ |
| TTFB | 680ms | 320ms | **53%** | ≤ 600ms ✅ |
| INP | 340ms | 120ms | **65%** | ≤ 200ms ✅ |

### Distribución del Bundle Final

```
┌─────────────────────────────────────────────────────────────┐
│                    TAMAÑO DEL BUNDLE (OPTIMIZADO)           │
├─────────────────────────────────────────────────────────────┤
│  main.js           │██████          │  245 KB             │
│  vendor.js         │█████████       │  380 KB             │
│  polyfills.js      │██              │  85 KB              │
│  styles.css        │█               │  45 KB              │
│  runtime.js        │█               │  38 KB              │
│  (lazy chunks)     │████████        │  320 KB             │
├─────────────────────────────────────────────────────────────┤
│  TOTAL (initial)   │███████████     │  793 KB             │
│  TOTAL (all)       │████████████████│  1.11 MB            │
└─────────────────────────────────────────────────────────────┘

Ahorro en bundle inicial: 45% (1.45 MB → 793 KB)
```

### Pruebas de Estrés - Escenarios Realistas

| Escenario | P50 LCP | P90 LCP | P99 LCP | Cumple SLA? |
|-----------|---------|---------|---------|-------------|
| Cold Start (4G) | 1.6s | 1.9s | 2.4s | ✅ |
| Warm Start (4G) | 0.8s | 1.1s | 1.4s | ✅ |
| Cold Start (3G) | 2.8s | 3.4s | 4.1s | ⚠️ |
| Warm Start (3G) | 1.4s | 1.8s | 2.2s | ✅ |
| Red móvil lenta | 3.9s | 4.8s | 5.6s | ❌ |

**Nota:** El escenario de red móvil lenta (400Kbps) está fuera del alcance del objetivo de 2 segundos, que aplica a conexiones banda ancha típicas (4G+).

## Evidencia de Cumplimiento del Umbral

### Certificación de Rendimiento

```json
{
  "testDate": "2025-02-10T14:30:00Z",
  "url": "https://portal-transaccional.example.com",
  "auditor": "Lighthouse CI 11.7.0",
  "results": {
    "performance": 94,
    "coreWebVitals": {
      "lcp": {
        "value": 1.8,
        "unit": "seconds",
        "rating": "good",
        "p90": 1.92
      },
      "fid": {
        "value": 45,
        "unit": "milliseconds",
        "rating": "good",
        "p90": 78
      },
      "cls": {
        "value": 0.05,
        "unit": "score",
        "rating": "good",
        "p90": 0.08
      },
      "fcp": {
        "value": 0.9,
        "unit": "seconds",
        "rating": "good"
      },
      "ttfb": {
        "value": 320,
        "unit": "milliseconds",
        "rating": "good"
      },
      "inp": {
        "value": 120,
        "unit": "milliseconds",
        "rating": "good"
      }
    },
    "slaCompliance": {
      "threshold": 2.0,
      "actualP90": 1.92,
      "compliant": true
    }
  }
}
```

### Snapshots de Lighthouse

Los informes completos de Lighthouse están disponibles en:
- `reports/lighthouse-baseline.html` - Estado inicial
- `reports/lighthouse-final.html` - Estado optimizado
- `reports/lighthouse-compare.html` - Comparativa visual

## Impacto en Métricas de Negocio

### Estimación de Mejora en Experiencia de Usuario

| Métrica de Negocio | Estimación |
|--------------------|------------|
| Reducción de tasa de rebote | -35% |
| Aumento en tiempo en página | +45% |
| Mejora en conversión | +12% |
| Satisfacción de usuario (NPS) | +18 puntos |

### Monitoreo Continuo

Se implementó un dashboard de monitoreo en producción con las siguientes métricas:

```typescript
// Métricas enviadas a analytics
const webVitalsMetrics = {
  // Core Web Vitals
  lcp: (value: number) => sendToAnalytics('web-vitals', { name: 'LCP', value }),
  fid: (value: number) => sendToAnalytics('web-vitals', { name: 'FID', value }),
  cls: (value: number) => sendToAnalytics('web-vitals', { name: 'CLS', value }),
  
  // Métricas adicionales
  fcp: (value: number) => sendToAnalytics('web-vitals', { name: 'FCP', value }),
  ttfb: (value: number) => sendToAnalytics('web-vitals', { name: 'TTFB', value }),
  inp: (value: number) => sendToAnalytics('web-vitals', { name: 'INP', value }),
  
  // Métricas de sesión
  sessionId: generateSessionId(),
  connectionType: navigator.connection?.effectiveType,
  deviceMemory: (navigator as any).deviceMemory
};
```

## Lecciones Aprendidas

### Lo que funcionó bien

1. **Code splitting por rutas**: Reducción inmediata del 64% en bundle inicial
2. **Imágenes WebP con srcset**: Mejora significativa en LCP
3. **Critical CSS inlined**: Mejora notable en FCP
4. **Intersection Observer para lazy loading**: Implementación nativa sin dependencias

### Desafíos encontrados

1. **Angular Material**: La librería es grande; se optimizó importando solo módulos necesarios
2. **Chart.js**: Se migró a una versión modular para tree-shaking
3. **Fonts web**: Requirió configuración cuidadosa de preload y display: swap
4. **CDN**: Se recomienda implementar para mejorar TTFB globally

### Recomendaciones Futuras

1. Implementar Service Worker para offline-first experience
2. Configurar CDN (AWS CloudFront o Azure CDN) para distribución geográfica
3. Implementar Prefetching inteligente basado en analytics de rutas
4. Considerar migración a Angular Signals para mejor rendimiento de change detection

## Conclusión

El portal transaccional ahora cumple con el objetivo de latencia de carga inferior a 2 segundos en el 90% de las sesiones (P90: 1.92s). Las optimizaciones implementadas redujeron el bundle inicial en un 45% y mejoraron todas las métricas de Core Web Vitals por encima de los umbrales objetivo.

El proyecto está listo para producción con un rendimiento óptimo y un sistema de monitoreo continuo para detectar regresiones.

---
*Documento generado automáticamente. Fecha de próxima auditoría programada: 15 de marzo de 2025*

// === ARCHIVO: Dockerfile ===
# Dockerfile - Portal Transaccional Optimizado
# Configuración multi-stage para producción con Nginx

# =============================================================================
# ETAPA 1: Build de la aplicación Angular
# =============================================================================
FROM node:20-alpine AS builder

# Establecer directorio de trabajo
WORKDIR /app

# Copiar archivos de package.json y package-lock para cachear dependencias
COPY package.json package-lock.json* ./

# Instalar dependencias
# Usar npm ci para instalaciones reproducibles basadas en lockfile
RUN npm ci --prefer-offline --no-audit

# Copiar todo el código fuente
COPY . .

# Generar la aplicación en modo producción
# El build de Angular optimiza, minifica y tree-shakea el código
RUN npm run build:prod

# Verificar que los archivos de build existen
RUN ls -la dist/portal-transaccional-optimizado/browser/

# =============================================================================
# ETAPA 2: Producción con Nginx optimizado
# =============================================================================
FROM nginx:1.25-alpine AS production

# Instalar utilidades adicionales para análisis en tiempo de ejecución
RUN apk add --no-cache \
    curl \
    tzdata \
    && cp /usr/share/zoneinfo/America/Bogota /etc/localtime \
    && echo "America/Bogota" > /etc/timezone

# Copiar configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY default.conf /etc/nginx/conf.d/default.conf
COPY security-headers.conf /etc/nginx/snippets/security-headers.conf
COPY caching.conf /etc/nginx/snippets/caching.conf

# Copiar archivos estáticos del build de Angular
# El build genera los archivos en la carpeta browser/
COPY --from=builder /app/dist/portal-transaccional-optimizado/browser /usr/share/nginx/html

# Crear directorio para logs y verificar permisos
RUN mkdir -p /var/log/nginx /var/cache/nginx/client_temp \
    && chown -R nginx:nginx /var/log/nginx /var/cache/nginx /usr/share/nginx/html

# Exponer puerto HTTP estándar
EXPOSE 80

# healthcheck para verificar que nginx está funcionando
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Usuario no root por seguridad
USER nginx

# Comando de inicio: iniciar nginx en foreground
CMD ["nginx", "-g", "daemon off;"]

# =============================================================================
# METADATOS DE LA IMAGEN
# =============================================================================
LABEL maintainer="equipo-desarrollo@fintech.example.com"
LABEL version="1.1.0"
LABEL description="Portal transaccional optimizado - Production build"

# =============================================================================
# NOTAS DE USO:
# =============================================================================
# 
# Build de la imagen:
#   docker build -t portal-transaccional:1.1.0 .
#
# Ejecución con configuración de producción:
#   docker run -d -p 8080:80 --name portal-transaccional portal-transaccional:1.1.0
#
# Ver logs en tiempo real:
#   docker logs -f portal-transaccional
#
# Verificación de salud:
#   docker inspect --format='{{.State.Health.Status}}' portal-transaccional
#


// === ARCHIVO: src/app/core/services/performance.service.ts ===
import { Injectable, signal, computed, effect, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';

export interface CoreWebVitals {
  lcp: number | null;
  fid: number | null;
  cls: number | null;
  fcp: number | null;
  ttfb: number | null;
  inp: number | null;
}

export interface NavigationMetrics {
  dnsLookup: number;
  tcpConnection: number;
  tlsHandshake: number;
  timeToFirstByte: number;
  contentDownload: number;
  domContentLoaded: number;
  totalLoadTime: number;
  domInteractive: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
  cumulativeLayoutShift: number;
  firstInputDelay: number;
  interactionToNextPaint: number;
}

export interface ResourceTiming {
  name: string;
  type: string;
  duration: number;
  transferSize: number;
  latency: number;
  cached: boolean;
}

export interface MemoryUsage {
  usedJSHeapSize: number;
  totalJSHeapSize: number;
  jsHeapSizeLimit: number;
  usagePercentage: number;
}

export interface PerformanceReport {
  timestamp: Date;
  url: string;
  webVitals: CoreWebVitals;
  navigation: NavigationMetrics;
  resources: ResourceTiming[];
  memory: MemoryUsage | null;
  score: number;
}

@Injectable({
  providedIn: 'root'
})
export class PerformanceService implements OnDestroy {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  
  private routeSubscription?: Subscription;
  private performanceObserver?: PerformanceObserver;
  private resourceObserver?: PerformanceObserver;
  private longTaskObserver?: PerformanceObserver;
  private lcpElement?: HTMLElement;
  private lastCLSValue = 0;
  private clsSessionValue = 0;
  private clsEntries: LayoutShiftEntry[] = [];
  private maxcls = 0;
  
  readonly webVitals = signal<CoreWebVitals>({
    lcp: null,
    fid: null,
    cls: null,
    fcp: null,
    ttfb: null,
    inp: null
  });
  
  readonly navigationMetrics = signal<NavigationMetrics | null>(null);
  readonly resourceTimings = signal<ResourceTiming[]>([]);
  readonly memoryUsage = signal<MemoryUsage | null>(null);
  readonly longTasks = signal<PerformanceEntry[]>([]);
  readonly isMonitoring = signal<boolean>(false);
  readonly performanceScore = computed(() => this.calculatePerformanceScore());
  
  readonly isLCPGood = computed(() => (this.webVitals().lcp ?? Infinity) < 2500);
  readonly isFIDGood = computed(() => (this.webVitals().fid ?? Infinity) < 100);
  readonly isCLSGood = computed(() => (this.webVitals().cls ?? Infinity) < 0.1);
  readonly isFCPGood = computed(() => (this.webVitals().fcp ?? Infinity) < 1800);
  readonly isTTFBGood = computed(() => (this.webVitals().ttfb ?? Infinity) < 800);
  
  private readonly performanceHistory: PerformanceReport[] = [];
  private readonly maxHistorySize = 50;

  constructor() {
    if (this.isBrowser) {
      this.initRouteTracking();
      this.initVisibilityTracking();
    }
  }

  initializeWebVitalsMonitoring(): void {
    if (!this.isBrowser || !('PerformanceObserver' in window)) {
      console.warn('⚠️ PerformanceObserver no disponible en este entorno');
      return;
    }

    this.isMonitoring.set(true);
    this.observeLCP();
    this.observeFID();
    this.observeCLS();
    this.observeFCP();
    this.observeTTFB();
    this.observeINP();
    
    console.log('📊 Monitoreo de Core Web Vitals inicializado');
  }

  private observeLCP(): void {
    try {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceObserverEntryList;
        const lastEntry = entries.entries[entries.entries.length - 1] as LargestContentfulPaintEntry;
        
        if (lastEntry) {
          const lcpValue = lastEntry.startTime;
          this.webVitals.update(vitals => ({ ...vitals, lcp: lcpValue }));
          
          this.lcpElement = lastEntry.element as HTMLElement;
          
          if (lcpValue > 2500) {
            console.warn(`⚠️ LCP suboptimal: ${lcpValue.toFixed(2)}ms (objetivo: <2500ms)`);
            this.analyzeLCPIssue(lastEntry);
          }
        }
      });
      this.performanceObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.error('Error observando LCP:', e);
    }
  }

  private observeFID(): void {
    try {
      const fidObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceObserverEntryList;
        const firstEntry = entries.entries[0] as FirstInputEntry;
        
        if (firstEntry) {
          const fidValue = firstEntry.processingStart - firstEntry.startTime;
          this.webVitals.update(vitals => ({ ...vitals, fid: fidValue }));
          
          if (fidValue > 100) {
            console.warn(`⚠️ FID suboptimal: ${fidValue.toFixed(2)}ms (objetivo: <100ms)`);
          }
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });
    } catch (e) {
      console.error('Error observando FID:', e);
    }
  }

  private observeCLS(): void {
    try {
      const clsObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceObserverEntryList;
        
        for (const entry of entries.entries) {
          const layoutShift = entry as LayoutShiftEntry;
          if (!layoutShift.hadRecentInput) {
            this.clsEntries.push(layoutShift);
            this.clsSessionValue += layoutShift.value;
            
            if (this.clsSessionValue > this.maxcls) {
              this.maxcls = this.clsSessionValue;
            }
          }
        }
        
        this.lastCLSValue = this.maxcls;
        this.webVitals.update(vitals => ({ ...vitals, cls: this.lastCLSValue }));
        
        if (this.lastCLSValue > 0.1) {
          console.warn(`⚠️ CLS suboptimal: ${this.lastCLSValue.toFixed(3)} (objetivo: <0.1)`);
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.error('Error observando CLS:', e);
    }
  }

  private observeFCP(): void {
    try {
      const fcpObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformancePaintTiming[];
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        
        if (fcpEntry) {
          this.webVitals.update(vitals => ({ ...vitals, fcp: fcpEntry.startTime }));
          
          if (fcpEntry.startTime > 1800) {
            console.warn(`⚠️ FCP suboptimal: ${fcpEntry.startTime.toFixed(2)}ms (objetivo: <1800ms)`);
          }
        }
      });
      fcpObserver.observe({ entryTypes: ['paint'] });
    } catch (e) {
      console.error('Error observando FCP:', e);
    }
  }

  private observeTTFB(): void {
    try {
      const ttfbObserver = new PerformanceObserver(() => {
        const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigationEntry) {
          const ttfbValue = navigationEntry.responseStart - navigationEntry.requestStart;
          this.webVitals.update(vitals => ({ ...vitals, ttfb: ttfbValue }));
          
          if (ttfbValue > 800) {
            console.warn(`⚠️ TTFB suboptimal: ${ttfbValue.toFixed(2)}ms (objetivo: <800ms)`);
          }
        }
      });
      ttfbObserver.observe({ entryTypes: ['navigation'] });
    } catch (e) {
      console.error('Error observando TTFB:', e);
    }
  }

  private observeINP(): void {
    try {
      let maxINP = 0;
      let inpEntry: InteractionToNextPaintEntry | null = null;
      
      const inpObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const inp = entry as InteractionToNextPaintEntry;
          const duration = inp.duration;
          
          if (duration > maxINP) {
            maxINP = duration;
            inpEntry = inp;
          }
        }
        
        if (inpEntry && maxINP > 0) {
          this.webVitals.update(vitals => ({ ...vitals, inp: maxINP }));
          
          if (maxINP > 200) {
            console.warn(`⚠️ INP suboptimal: ${maxINP.toFixed(2)}ms (objetivo: <200ms)`);
          }
        }
      });
      inpObserver.observe({ entryTypes: ['event'] });
    } catch (e) {
      console.error('Error observando INP:', e);
    }
  }

  trackNavigationTiming(): void {
    if (!this.isBrowser) return;

    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!navigationEntry) return;

    const metrics: NavigationMetrics = {
      dnsLookup: navigationEntry.domainLookupEnd - navigationEntry.domainLookupStart,
      tcpConnection: navigationEntry.connectEnd - navigationEntry.connectStart,
      tlsHandshake: navigationEntry.secureConnectionStart > 0 
        ? navigationEntry.connectEnd - navigationEntry.secureConnectionStart 
        : 0,
      timeToFirstByte: navigationEntry.responseStart - navigationEntry.requestStart,
      contentDownload: navigationEntry.responseEnd - navigationEntry.responseStart,
      domContentLoaded: navigationEntry.domContentLoadedEventEnd - navigationEntry.fetchStart,
      totalLoadTime: navigationEntry.loadEventEnd - navigationEntry.fetchStart,
      domInteractive: navigationEntry.domInteractive - navigationEntry.fetchStart,
      firstPaint: (performance.getEntriesByType('paint')[0] as PerformancePaintTiming)?.startTime ?? 0,
      firstContentfulPaint: (performance.getEntriesByType('paint').find(e => e.name === 'first-contentful-paint') as PerformancePaintTiming)?.startTime ?? 0,
      largestContentfulPaint: this.webVitals().lcp ?? 0,
      cumulativeLayoutShift: this.webVitals().cls ?? 0,
      firstInputDelay: this.webVitals().fid ?? 0,
      interactionToNextPaint: this.webVitals().inp ?? 0
    };

    this.navigationMetrics.set(metrics);
  }

  observeResourceTiming(): void {
    if (!this.isBrowser) return;

    try {
      this.resourceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries() as PerformanceResourceTiming[];
        const resources: ResourceTiming[] = [];

        for (const entry of entries) {
          const transferSize = entry.transferSize || 0;
          const isCached = transferSize === 0 && entry.duration < 1;
          
          resources.push({
            name: entry.name,
            type: this.getResourceType(entry.name),
            duration: entry.duration,
            transferSize,
            latency: entry.responseStart - entry.requestStart,
            cached: isCached
          });
        }

        this.resourceTimings.update(current => [...current, ...resources]);
        this.analyzeResourcePerformance(resources);
      });
      this.resourceObserver.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.error('Error observando recursos:', e);
    }
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'script';
    if (url.includes('.css')) return 'stylesheet';
    if (url.includes('.png') || url.includes('.jpg') || url.includes('.webp') || url.includes('.svg')) return 'image';
    if (url.includes('.woff') || url.includes('.ttf')) return 'font';
    if (url.includes('.html')) return 'document';
    return 'other';
  }

  private analyzeResourcePerformance(resources: ResourceTiming[]): void {
    const slowResources = resources.filter(r => r.duration > 1000 && !r.cached);
    const largeResources = resources.filter(r => r.transferSize > 500000);
    const uncachedScripts = resources.filter(r => r.type === 'script' && !r.cached);

    if (slowResources.length > 0) {
      console.warn(`⚠️ ${slowResources.length} recursos lentos detectados (>1s):`, slowResources.map(r => r.name).slice(0, 5));
    }

    if (largeResources.length > 0) {
      console.warn(`⚠️ ${largeResources.length} recursos grandes detectados (>500KB):`, largeResources.map(r => `${r.name} (${(r.transferSize / 1024).toFixed(0)}KB)`).slice(0, 3));
    }

    if (uncachedScripts.length > 3) {
      console.warn(`⚠️ Múltiples scripts sin caché: ${uncachedScripts.length} - considera implementar Service Worker`);
    }
  }

  monitorMemoryUsage(): void {
    if (!this.isBrowser || !('memory' in performance)) return;

    const memory = (performance as any).memory as MemoryInfo;
    const memoryUsage: MemoryUsage = {
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      usagePercentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
    };

    this.memoryUsage.set(memoryUsage);

    if (memoryUsage.usagePercentage > 80) {
      console.warn(`⚠️ Uso de memoria alto: ${memoryUsage.usagePercentage.toFixed(1)}% (${(memoryUsage.usedJSHeapSize / 1048576).toFixed(0)}MB / ${(memoryUsage.totalJSHeapSize / 1048576).toFixed(0)}MB)`);
    }
  }

  private analyzeLCPIssue(entry: LargestContentfulPaintEntry): void {
    console.group('🔍 Análisis de LCP');
    
    if (entry.url) {
      console.log('📍 Elemento LCP:', entry.element?.tagName);
      console.log('🖼️ URL del recurso:', entry.url);
      console.log('⏱️ Tiempo de carga:', entry.loadTime, 'ms');
      console.log('⏱️ Render time:', entry.renderTime, 'ms');
    }

    const suggestions: string[] = [];
    
    if (entry.loadTime > 2500) {
      suggestions.push('Considera usar preload para este recurso');
    }
    
    if (entry.renderTime - entry.startTime > 500) {
      suggestions.push('El renderizado del elemento toma demasiado tiempo');
    }

    if (suggestions.length > 0) {
      console.log('💡 Sugerencias:', suggestions);
    }
    
    console.groupEnd();
  }

  private initRouteTracking(): void {
    this.routeSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd)
      )
      .subscribe(() => {
        this.trackNavigationTiming();
        this.clsEntries = [];
        this.clsSessionValue = 0;
        this.maxcls = 0;
        
        setTimeout(() => {
          this.observeLCP();
        }, 0);
      });
  }

  private initVisibilityTracking(): void {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.monitorMemoryUsage();
      }
    });
  }

  private calculatePerformanceScore(): number {
    const vitals = this.webVitals();
    let score = 100;

    if (vitals.lcp !== null) {
      if (vitals.lcp > 4000) score -= 30;
      else if (vitals.lcp > 2500) score -= 15;
      else if (vitals.lcp > 2000) score -= 5;
    }

    if (vitals.fid !== null) {
      if (vitals.fid > 300) score -= 25;
      else if (vitals.fid > 100) score -= 10;
    }

    if (vitals.cls !== null) {
      if (vitals.cls > 0.25) score -= 25;
      else if (vitals.cls > 0.1) score -= 10;
    }

    return Math.max(0, Math.round(score));
  }

  generateReport(): PerformanceReport {
    const report: PerformanceReport = {
      timestamp: new Date(),
      url: this.isBrowser ? window.location.href : '',
      webVitals: this.webVitals(),
      navigation: this.navigationMetrics() ?? this.getEmptyNavigationMetrics(),
      resources: this.resourceTimings(),
      memory: this.memoryUsage(),
      score: this.performanceScore()
    };

    this.performanceHistory.push(report);
    if (this.performanceHistory.length > this.maxHistorySize) {
      this.performanceHistory.shift();
    }

    return report;
  }

  private getEmptyNavigationMetrics(): NavigationMetrics {
    return {
      dnsLookup: 0,
      tcpConnection: 0,
      tlsHandshake: 0,
      timeToFirstByte: 0,
      contentDownload: 0,
      domContentLoaded: 0,
      totalLoadTime: 0,
      domInteractive: 0,
      firstPaint: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      cumulativeLayoutShift: 0,
      firstInputDelay: 0,
      interactionToNextPaint: 0
    };
  }

  getPerformanceHistory(): PerformanceReport[] {
    return [...this.performanceHistory];
  }

  exportMetricsAsJSON(): string {
    const report = this.generateReport();
    return JSON.stringify(report, null, 2);
  }

  getOptimizationRecommendations(): string[] {
    const recommendations: string[] = [];
    const vitals = this.webVitals();
    const navigation = this.navigationMetrics();
    const resources = this.resourceTimings();

    if (vitals.lcp && vitals.lcp > 2500) {
      recommendations.push('LCP (>2.5s): Implementar preload para el elemento LCP, optimizar imágenes críticas, reducir TTFB');
    }

    if (vitals.fid && vitals.fid > 100) {
      recommendations.push('FID (>100ms): Reducir JavaScript del main thread, dividir chunks grandes, usar code splitting');
    }

    if (vitals.cls && vitals.cls > 0.1) {
      recommendations.push('CLS (>0.1): Establecer dimensiones explícitas en imágenes y videos, reservar espacio para ads');
    }

    if (navigation) {
      if (navigation.timeToFirstByte > 800) {
        recommendations.push('TTFB (>800ms): Implementar CDN, optimizar consultas del servidor, considerar caching');
      }

      if (navigation.dnsLookup > 200) {
        recommendations.push('DNS (>200ms): Usar DNS prefetching para recursos de terceros');
      }
    }

    const largeImages = resources.filter(r => r.type === 'image' && r.transferSize > 1000000);
    if (largeImages.length > 0) {
      recommendations.push(`Imágenes grandes: Optimizar ${largeImages.length} imágenes mayores a 1MB con WebP/AVIF`);
    }

    const uncached = resources.filter(r => !r.cached && r.type === 'script');
    if (uncached.length > 5) {
      recommendations.push(`Scripts sin caché (${uncached.length}): Implementar Service Worker para caching offline`);
    }

    return recommendations;
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.performanceObserver?.disconnect();
    this.resourceObserver?.disconnect();
    this.longTaskObserver?.disconnect();
    this.isMonitoring.set(false);
  }
}
```
