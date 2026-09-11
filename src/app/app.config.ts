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