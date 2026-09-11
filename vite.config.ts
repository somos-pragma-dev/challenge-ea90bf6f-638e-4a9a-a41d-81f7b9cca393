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