# Diagnóstico y Solución: Error 500 en Nginx

## Pasos para Diagnosticar

### 1. Ver los logs de error de Nginx

```bash
# Ver el error específico
sudo tail -50 /var/log/nginx/error.log

# O si tienes logs específicos del sitio
sudo tail -50 /var/log/nginx/biblioteca-error.log
```

### 2. Verificar la configuración de Nginx

```bash
# Verificar sintaxis
sudo nginx -t

# Ver la configuración activa
sudo nginx -T | grep -A 50 "portal-biblioteca"
```

## Causas Comunes y Soluciones

### Causa 1: El directorio `dist/` no existe o está vacío

**Solución:**
```bash
# Construir la aplicación
cd /ruta/a/DisenoBiblioteca
npm run build

# Verificar que dist/ existe y tiene archivos
ls -la dist/
# Deberías ver: index.html, js/, css/, etc.
```

### Causa 2: Ruta incorrecta en Nginx

**Verificar:**
```bash
# Ver la ruta configurada en Nginx
sudo grep "root" /etc/nginx/sites-available/biblioteca

# Verificar que esa ruta existe
ls -la /ruta/que/esta/en/nginx/config
```

**Solución:** Edita la configuración y cambia la ruta:
```bash
sudo nano /etc/nginx/sites-available/biblioteca
# Cambiar la línea "root" a la ruta correcta
```

### Causa 3: Permisos incorrectos

**Solución:**
```bash
# Dar permisos a Nginx (www-data en Ubuntu/Debian)
sudo chown -R www-data:www-data /ruta/a/DisenoBiblioteca/dist
sudo chmod -R 755 /ruta/a/DisenoBiblioteca/dist

# Verificar permisos
ls -la /ruta/a/DisenoBiblioteca/dist
```

### Causa 4: Error de sintaxis en Nginx

**Solución:**
```bash
# Verificar sintaxis
sudo nginx -t

# Si hay errores, corregirlos en:
sudo nano /etc/nginx/sites-available/biblioteca
```

### Causa 5: Certificados SSL incorrectos

**Solución:**
```bash
# Verificar que los certificados existen
sudo ls -la /etc/ssl/aiep/

# Verificar permisos
sudo chmod 644 /etc/ssl/aiep/certificado.crt
sudo chmod 600 /etc/ssl/aiep/private.key
```

## Configuración Nginx Corregida

Asegúrate de que tu configuración tenga esto:

```nginx
server {
    listen 443 ssl http2;
    server_name portal-biblioteca.aiep.cl;

    ssl_certificate /etc/ssl/aiep/certificado.crt;
    ssl_certificate_key /etc/ssl/aiep/private.key;
    ssl_trusted_certificate /etc/ssl/aiep/ca_bundle.crt;

    # ← VERIFICAR que esta ruta existe y tiene archivos
    root /ruta/real/a/DisenoBiblioteca/dist;
    index index.html;

    # CRÍTICO: try_files para Vue.js
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache para estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## Comandos de Diagnóstico Rápido

```bash
# 1. Ver error específico
sudo tail -50 /var/log/nginx/error.log

# 2. Verificar sintaxis
sudo nginx -t

# 3. Verificar que dist/ existe
ls -la /ruta/a/DisenoBiblioteca/dist/

# 4. Verificar permisos
ls -la /ruta/a/DisenoBiblioteca/dist/index.html

# 5. Probar acceso directo
sudo -u www-data cat /ruta/a/DisenoBiblioteca/dist/index.html

# 6. Ver configuración activa
sudo nginx -T | grep -A 30 "portal-biblioteca"
```

## Solución Paso a Paso

1. **Ver el error específico:**
```bash
sudo tail -50 /var/log/nginx/error.log
```

2. **Construir la aplicación (si no lo has hecho):**
```bash
cd /ruta/a/DisenoBiblioteca
npm run build
```

3. **Verificar que dist/ existe:**
```bash
ls -la dist/
# Deberías ver index.html y carpetas js/, css/
```

4. **Corregir permisos:**
```bash
sudo chown -R www-data:www-data /ruta/a/DisenoBiblioteca/dist
sudo chmod -R 755 /ruta/a/DisenoBiblioteca/dist
```

5. **Verificar y recargar Nginx:**
```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Errores Comunes en los Logs

### "No such file or directory"
- El directorio `root` no existe
- Solución: Verificar la ruta o construir la aplicación

### "Permission denied"
- Permisos incorrectos
- Solución: `sudo chown -R www-data:www-data /ruta/dist`

### "Primary script unknown"
- El archivo index.html no existe
- Solución: Ejecutar `npm run build`

### "SSL certificate" errors
- Certificados no encontrados o permisos incorrectos
- Solución: Verificar rutas y permisos de certificados

