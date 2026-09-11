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