# Configuración Nginx para Aplicación Vue.js - Biblioteca

## Configuración para servir la aplicación Vue.js construida

Esta configuración sirve la aplicación Vue.js desde el directorio `dist` después de hacer `npm run build`.

### Configuración Nginx Completa

```nginx
server {
    listen 443 ssl http2;
    server_name cmsbiblioteca.aiep.cl;  # O el dominio que uses

    ssl_certificate /etc/ssl/aiep/certificado.crt;
    ssl_certificate_key /etc/ssl/aiep/private.key;
    ssl_trusted_certificate /etc/ssl/aiep/ca_bundle.crt;

    # Mejoras de seguridad SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Ruta al directorio dist de Vue.js (después de npm run build)
    root /ruta/a/tu/proyecto/DisenoBiblioteca/dist;
    index index.html;

    # Headers de seguridad
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Configuración para Vue.js SPA (Single Page Application)
    location / {
        try_files $uri $uri/ /index.html;
        
        # Cache para archivos estáticos
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # Proxy para Strapi API (si necesitas acceder a Strapi desde la misma URL)
    location /api {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Proxy para Strapi Admin (opcional)
    location /admin {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        
        # WebSocket support (para hot reload en desarrollo)
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    # Logs
    access_log /var/log/nginx/biblioteca-access.log;
    error_log /var/log/nginx/biblioteca-error.log;
}

# Redirección HTTP a HTTPS
server {
    listen 80;
    server_name cmsbiblioteca.aiep.cl;
    return 301 https://$host$request_uri;
}
```

## Pasos para Configurar

### 1. Construir la aplicación Vue.js

```bash
cd /ruta/a/DisenoBiblioteca
npm run build
```

Esto creará el directorio `dist/` con los archivos estáticos.

### 2. Configurar Nginx

```bash
# Crear archivo de configuración
sudo nano /etc/nginx/sites-available/biblioteca

# Copiar la configuración de arriba
# IMPORTANTE: Cambiar la ruta en "root" a la ruta real de tu proyecto
# Ejemplo: root /var/www/biblioteca/dist;

# Habilitar el sitio
sudo ln -s /etc/nginx/sites-available/biblioteca /etc/nginx/sites-enabled/

# Verificar configuración
sudo nginx -t

# Recargar Nginx
sudo systemctl reload nginx
```

### 3. Verificar permisos

```bash
# Asegurar que Nginx pueda leer los archivos
sudo chown -R www-data:www-data /ruta/a/DisenoBiblioteca/dist
sudo chmod -R 755 /ruta/a/DisenoBiblioteca/dist
```

## Solución al Error "Invalid host header"

Si estás usando el **dev server de Vue** (`npm run serve`) y accedes a través de Nginx, el error "Invalid host header" puede aparecer.

### Opción 1: Usar la build de producción (Recomendado)

**NO uses el dev server en producción.** En su lugar:

1. Construye la aplicación:
```bash
npm run build
```

2. Sirve el directorio `dist/` con Nginx (como en la configuración de arriba)

### Opción 2: Si necesitas usar el dev server (solo desarrollo)

Edita `vue.config.js`:

```javascript
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    open: true,
    // ← AGREGAR ESTO para permitir acceso desde otros hosts
    allowedHosts: [
      'cmsbiblioteca.aiep.cl',
      '.aiep.cl'  // Permite cualquier subdominio de aiep.cl
    ],
    // O deshabilitar la validación (solo para desarrollo)
    // disableHostCheck: true,  // ⚠️ Solo para desarrollo local
    proxy: {
      '/api': {
        target: process.env.VUE_APP_STRAPI_URL || 'http://68.211.112.39:1337',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
      }
    }
  }
})
```

Y configura Nginx para hacer proxy al dev server:

```nginx
location / {
    proxy_pass http://127.0.0.1:3000;  # Puerto del dev server
    proxy_http_version 1.1;
    
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    # WebSocket support (necesario para hot reload)
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

## Configuración Recomendada para Producción

**Siempre usa la build de producción en producción:**

1. **Construir:**
```bash
npm run build
```

2. **Configurar Nginx para servir `dist/`:**
```nginx
root /ruta/completa/a/DisenoBiblioteca/dist;
index index.html;

location / {
    try_files $uri $uri/ /index.html;
}
```

3. **No uses el dev server en producción** - es más lento y menos seguro.

## Verificar que funciona

```bash
# Verificar configuración
sudo nginx -t

# Ver logs en tiempo real
sudo tail -f /var/log/nginx/biblioteca-error.log
sudo tail -f /var/log/nginx/biblioteca-access.log

# Probar desde el servidor
curl -I https://cmsbiblioteca.aiep.cl

# O desde el navegador
# https://cmsbiblioteca.aiep.cl
```

## Estructura de Directorios Recomendada

```
/var/www/
└── biblioteca/
    ├── dist/              # ← Nginx sirve desde aquí
    │   ├── index.html
    │   ├── js/
    │   ├── css/
    │   └── ...
    └── (archivos fuente del proyecto)
```

## Notas Importantes

1. **Producción:** Siempre usa `npm run build` y sirve `dist/` con Nginx
2. **Desarrollo:** Usa `npm run serve` localmente, no a través de Nginx
3. **`try_files`** es crítico para Vue.js SPA - redirige todas las rutas a `index.html`
4. **Cache:** Los archivos estáticos (JS, CSS, imágenes) se cachean por 1 año

