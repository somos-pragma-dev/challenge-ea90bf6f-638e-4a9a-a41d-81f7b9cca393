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