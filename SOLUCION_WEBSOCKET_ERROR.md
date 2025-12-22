# Solución: Error WebSocket en HTTPS

## Problema
```
Failed to construct 'WebSocket': An insecure WebSocket connection may not be initiated from a page loaded over HTTPS.
```

## Causa
Estás usando el **dev server de Vue.js** (`npm run serve`) en producción a través de HTTPS. El dev server intenta usar WebSocket inseguro (`ws://`) desde una página HTTPS, lo cual los navegadores bloquean por seguridad.

## Solución: Usar Build de Producción

**NO uses el dev server en producción.** En su lugar, construye la aplicación y sirve los archivos estáticos.

### Paso 1: Construir la aplicación

```bash
cd /ruta/a/DisenoBiblioteca
npm run build
```

Esto crea el directorio `dist/` con los archivos optimizados para producción.

### Paso 2: Configurar Nginx para servir `dist/`

```nginx
server {
    listen 443 ssl http2;
    server_name portal-biblioteca.aiep.cl;

    ssl_certificate /etc/ssl/aiep/certificado.crt;
    ssl_certificate_key /etc/ssl/aiep/private.key;
    ssl_trusted_certificate /etc/ssl/aiep/ca_bundle.crt;

    # Ruta al directorio dist (después de npm run build)
    root /ruta/completa/a/DisenoBiblioteca/dist;
    index index.html;

    # CRÍTICO: try_files para Vue.js SPA
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para archivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}

server {
    listen 80;
    server_name portal-biblioteca.aiep.cl;
    return 301 https://$host$request_uri;
}
```

### Paso 3: Verificar permisos

```bash
# Asegurar que Nginx pueda leer los archivos
sudo chown -R www-data:www-data /ruta/a/DisenoBiblioteca/dist
sudo chmod -R 755 /ruta/a/DisenoBiblioteca/dist
```

### Paso 4: Recargar Nginx

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Si AÚN necesitas usar el dev server (solo desarrollo)

Si por alguna razón necesitas usar el dev server a través de HTTPS, necesitas configurar HTTPS en el dev server:

### Opción 1: Configurar HTTPS en Vue Dev Server

Edita `vue.config.js`:

```javascript
const { defineConfig } = require('@vue/cli-service')
const fs = require('fs')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    https: {
      key: fs.readFileSync('/ruta/a/certificado.key'),
      cert: fs.readFileSync('/ruta/a/certificado.crt'),
    },
    allowedHosts: [
      'portal-biblioteca.aiep.cl',
      '.aiep.cl'
    ],
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

Y en Nginx, hacer proxy con WebSocket seguro:

```nginx
location / {
    proxy_pass https://127.0.0.1:3000;  # HTTPS del dev server
    proxy_http_version 1.1;
    
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    
    # WebSocket seguro (WSS)
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
}
```

**PERO:** Esto es complicado y no recomendado para producción.

## Recomendación Final

**SIEMPRE usa la build de producción en producción:**

1. ✅ `npm run build` - Construye la aplicación
2. ✅ Sirve `dist/` con Nginx
3. ❌ NO uses `npm run serve` en producción

## Verificar que funciona

```bash
# Verificar que dist/ existe y tiene archivos
ls -la dist/

# Verificar configuración de Nginx
sudo nginx -t

# Ver logs
sudo tail -f /var/log/nginx/error.log

# Probar desde el navegador
# https://portal-biblioteca.aiep.cl
```

## Diferencia entre Dev Server y Build

| Característica | Dev Server (`npm run serve`) | Build (`npm run build`) |
|----------------|-------------------------------|-------------------------|
| Uso | Solo desarrollo | Producción |
| Velocidad | Más lento | Más rápido |
| Hot Reload | ✅ Sí | ❌ No |
| WebSocket | ✅ Necesario | ❌ No necesario |
| Optimización | ❌ No | ✅ Sí |
| HTTPS | ⚠️ Requiere config | ✅ Funciona con Nginx |

## Comandos Rápidos

```bash
# 1. Construir para producción
npm run build

# 2. Verificar que dist/ se creó
ls -la dist/

# 3. Copiar configuración Nginx
sudo cp nginx-biblioteca.conf /etc/nginx/sites-available/biblioteca

# 4. Editar y cambiar la ruta
sudo nano /etc/nginx/sites-available/biblioteca

# 5. Habilitar sitio
sudo ln -s /etc/nginx/sites-available/biblioteca /etc/nginx/sites-enabled/

# 6. Verificar y recargar
sudo nginx -t
sudo systemctl reload nginx
```

