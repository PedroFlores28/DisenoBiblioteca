# Solución: Error al Subir Imágenes en Strapi

## 🔴 Error
```
Unexpected token '<', "<html>..." is not valid JSON
```

Este error ocurre cuando Strapi devuelve una página HTML (probablemente una página de error) en lugar de una respuesta JSON al intentar subir una imagen.

## 🔍 Diagnóstico

El error indica que el endpoint de upload de Strapi está devolviendo HTML en lugar de JSON. Esto puede deberse a:

1. **Problema de configuración del servidor/proxy**
2. **Problema de permisos en el servidor**
3. **Configuración incorrecta de Strapi**
4. **Problema con el tamaño máximo de archivo**

## ✅ Soluciones

### ⚡ Solución Rápida (Más Común)

El problema más frecuente es que la configuración de Nginx no está optimizada para uploads. 

**Pasos rápidos:**

1. **Verifica que Nginx tenga configurado el tamaño máximo de archivo:**
   ```bash
   # Edita la configuración de Nginx para cmsbiblioteca.aiep.cl
   sudo nano /etc/nginx/sites-available/cmsbiblioteca
   # o el archivo que corresponda
   ```

2. **Asegúrate de que incluya estas líneas al inicio del bloque `server {`:**
   ```nginx
   client_max_body_size 100M;
   ```

3. **Y en los bloques `location /api` y `location /admin`, agrega:**
   ```nginx
   proxy_request_buffering off;
   proxy_buffering off;
   client_max_body_size 100M;
   ```

4. **Reinicia Nginx:**
   ```bash
   sudo nginx -t  # Verificar que no hay errores
   sudo systemctl reload nginx
   ```

5. **Reinicia Strapi:**
   ```bash
   pm2 restart strapi
   # o
   sudo systemctl restart strapi
   ```

**Nota:** Puedes usar el archivo de ejemplo `nginx-cms-strapi.conf` en este proyecto como referencia.

### Solución 1: Verificar Configuración de Nginx

Si estás usando Nginx como proxy reverso, verifica que la configuración incluya el manejo correcto de uploads:

```nginx
# En tu configuración de Nginx para Strapi
server {
    listen 443 ssl http2;
    server_name cmsbiblioteca.aiep.cl;

    # Aumentar el tamaño máximo de upload
    client_max_body_size 100M;

    # Proxy para Strapi API
    location /api {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Headers importantes para uploads
        proxy_request_buffering off;
        proxy_buffering off;
    }

    # Proxy para Strapi Admin
    location /admin {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # Headers importantes para uploads
        proxy_request_buffering off;
        proxy_buffering off;
    }

    # Proxy para uploads y archivos estáticos
    location /uploads {
        proxy_pass http://localhost:1337;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # Permitir archivos grandes
        client_max_body_size 100M;
    }
}
```

**Después de modificar Nginx:**
```bash
sudo nginx -t  # Verificar configuración
sudo systemctl reload nginx
```

### Solución 2: Verificar Configuración de Strapi

Asegúrate de que Strapi esté configurado correctamente para manejar uploads:

**1. Verificar `config/server.js` o `config/env/production/server.js`:**

```javascript
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://cmsbiblioteca.aiep.cl'),
  proxy: true, // IMPORTANTE: debe estar en true si está detrás de un proxy
  app: {
    keys: env.array('APP_KEYS'),
  },
});
```

**2. Verificar `config/middlewares.js`:**

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

**3. Verificar variables de entorno `.env`:**

```bash
PUBLIC_URL=https://cmsbiblioteca.aiep.cl
HOST=0.0.0.0
PORT=1337
```

### Solución 3: Verificar Permisos de Archivos

Asegúrate de que Strapi tenga permisos para escribir en el directorio de uploads:

```bash
# Ir al directorio de Strapi
cd /ruta/a/tu/proyecto/strapi

# Verificar permisos del directorio public/uploads
ls -la public/uploads

# Si no tiene permisos, corregirlos
sudo chown -R usuario:grupo public/uploads
sudo chmod -R 755 public/uploads
```

### Solución 4: Verificar Tamaño Máximo de Archivo

**En Strapi (`config/plugins.js` o `config/env/production/plugins.js`):**

```javascript
module.exports = ({ env }) => ({
  upload: {
    config: {
      sizeLimit: 100 * 1024 * 1024, // 100MB en bytes
    },
  },
});
```

**En Nginx (ya mencionado arriba):**
```nginx
client_max_body_size 100M;
```

### Solución 5: Verificar que Strapi Esté Corriendo

```bash
# Si usas PM2
pm2 list
pm2 logs strapi

# Si usas systemd
sudo systemctl status strapi

# Verificar que el puerto 1337 esté escuchando
sudo netstat -tlnp | grep 1337
# o
sudo ss -tlnp | grep 1337
```

### Solución 6: Verificar Logs de Strapi

Revisa los logs de Strapi para ver errores específicos:

```bash
# Si usas PM2
pm2 logs strapi --lines 100

# Si usas systemd
sudo journalctl -u strapi -n 100

# O revisa los logs en el directorio de Strapi
tail -f logs/*.log
```

### Solución 7: Probar Upload Directamente al Servidor

Para verificar si el problema es del proxy o de Strapi:

1. Accede directamente a Strapi (sin proxy): `http://localhost:1337/admin`
2. Intenta subir una imagen
3. Si funciona directamente pero no a través del proxy, el problema está en Nginx

### Solución 8: Verificar CORS

Asegúrate de que CORS esté configurado correctamente en Strapi:

**En `config/middlewares.js` o crear `config/middlewares.js`:**

```javascript
module.exports = [
  'strapi::logger',
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      enabled: true,
      origin: ['https://cmsbiblioteca.aiep.cl', 'https://portal-biblioteca.aiep.cl'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
  // ... resto de middlewares
];
```

## 🔄 Reiniciar Servicios

Después de hacer cambios:

```bash
# Reiniciar Nginx
sudo systemctl reload nginx

# Reiniciar Strapi (si usas PM2)
pm2 restart strapi

# O si usas systemd
sudo systemctl restart strapi
```

## 🧪 Probar la Solución

1. Abre el panel de administración de Strapi: `https://cmsbiblioteca.aiep.cl/admin`
2. Ve a Content Manager → Hero-banner (o cualquier colección con imágenes)
3. Intenta subir una imagen pequeña primero (< 1MB)
4. Si funciona, prueba con imágenes más grandes

## 📝 Notas Adicionales

- **Tamaño de imagen recomendado**: Para banners, usa imágenes optimizadas (< 2MB)
- **Formatos soportados**: JPG, PNG, GIF, WebP
- **Resolución recomendada**: 
  - Desktop: 1920x1080px
  - Mobile: 768x1024px

## 🆘 Si el Problema Persiste

1. Revisa los logs de Nginx: `sudo tail -f /var/log/nginx/error.log`
2. Revisa los logs de Strapi (ver Solución 6)
3. Verifica que el firewall permita conexiones al puerto 1337
4. Prueba acceder directamente a Strapi sin proxy para aislar el problema

