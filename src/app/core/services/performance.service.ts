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