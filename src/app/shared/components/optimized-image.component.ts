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