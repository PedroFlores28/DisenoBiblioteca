# Solución: Invalid Host Header en Strapi con Nginx

## Problema
Error: "Invalid host header" cuando accedes a Strapi a través de Nginx proxy reverso.

## Causa
Strapi valida el header `Host` por seguridad y no reconoce el dominio que viene a través del proxy.

## Solución

### Paso 1: Configurar Strapi para aceptar el dominio

Necesitas editar la configuración de Strapi en el servidor. Busca el archivo de configuración:

**Ubicación típica:**
- `config/server.js` o
- `config/env/production/server.js`

**Edita el archivo y agrega:**

```javascript
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://cmsbiblioteca.aiep.cl'),
  proxy: true, // ← IMPORTANTE: Indica que está detrás de un proxy
  app: {
    keys: env.array('APP_KEYS'),
  },
});
```

### Paso 2: Configurar middlewares de seguridad

Edita `config/middlewares.js`:

```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', 'https:'],
          'media-src': ["'self'", 'data:', 'blob:', 'https:'],
          upgradeInsecureRequests: null,
        },
      },
      // ← AGREGAR ESTO para permitir el dominio del proxy
      hsts: {
        enabled: true,
        maxAge: 31536000,
        includeSubDomains: true,
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
```

### Paso 3: Configurar variables de entorno

En el archivo `.env` de Strapi (en el servidor):

```bash
HOST=0.0.0.0
PORT=1337
PUBLIC_URL=https://cmsbiblioteca.aiep.cl
```

### Paso 4: Mejorar configuración de Nginx

Tu configuración de Nginx está bien, pero puedes mejorarla así:

```nginx
server {
    listen 443 ssl http2;
    server_name cmsbiblioteca.aiep.cl;

    ssl_certificate /etc/ssl/aiep/certificado.crt;
    ssl_certificate_key /etc/ssl/aiep/private.key;
    ssl_trusted_certificate /etc/ssl/aiep/ca_bundle.crt;

    # Mejoras de seguridad SSL
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    location / {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;

        # Headers importantes para Strapi
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;

        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;

        # Buffer settings
        proxy_buffering off;
        proxy_request_buffering off;
    }
}

server {
    listen 80;
    server_name cmsbiblioteca.aiep.cl;
    return 301 https://$host$request_uri;
}
```

### Paso 5: Reiniciar servicios

```bash
# Verificar configuración de Nginx
sudo nginx -t

# Recargar Nginx
sudo systemctl reload nginx

# Reiniciar Strapi
# Si usas PM2:
pm2 restart strapi

# O si usas systemd:
sudo systemctl restart strapi

# O si lo ejecutas manualmente:
# Detén el proceso y vuelve a iniciarlo
```

### Paso 6: Verificar que funciona

```bash
# Probar desde el servidor
curl -I https://cmsbiblioteca.aiep.cl/admin

# O desde tu navegador:
# https://cmsbiblioteca.aiep.cl/admin
```

## Solución Alternativa (si el problema persiste)

Si después de estos cambios aún tienes el error, puedes deshabilitar temporalmente la validación del host en Strapi (solo para desarrollo/testing):

**En `config/server.js`:**

```javascript
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://cmsbiblioteca.aiep.cl'),
  proxy: true,
  // ⚠️ SOLO PARA DESARROLLO - NO USAR EN PRODUCCIÓN
  // admin: {
  //   host: '0.0.0.0',
  // },
  app: {
    keys: env.array('APP_KEYS'),
  },
});
```

## Verificación de Logs

Si el problema persiste, revisa los logs:

```bash
# Logs de Nginx
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log

# Logs de Strapi (si usas PM2)
pm2 logs strapi

# O logs del sistema
sudo journalctl -u strapi -f
```

## Notas Importantes

1. **`proxy: true`** es CRÍTICO - le dice a Strapi que está detrás de un proxy
2. **`PUBLIC_URL`** debe coincidir exactamente con el dominio en Nginx
3. Asegúrate de que Strapi escuche en `0.0.0.0` (no solo `localhost`)
4. Reinicia ambos servicios después de los cambios

## Comandos Rápidos

```bash
# 1. Editar configuración de Strapi
nano /ruta/a/strapi/config/server.js

# 2. Editar .env de Strapi
nano /ruta/a/strapi/.env

# 3. Verificar Nginx
sudo nginx -t

# 4. Recargar Nginx
sudo systemctl reload nginx

# 5. Reiniciar Strapi
pm2 restart strapi
```

