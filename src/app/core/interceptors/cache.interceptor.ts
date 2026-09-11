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