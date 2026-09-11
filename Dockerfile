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