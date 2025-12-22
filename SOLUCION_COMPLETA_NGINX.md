# Solución Completa: Nginx - Archivo no existe, conflicto y permisos

## Problemas Detectados:
1. ❌ Archivo `/etc/nginx/sites-available/biblioteca` no existe
2. ⚠️ Conflicto: "conflicting server name portal-biblioteca.aiep.cl" (ya existe otra configuración)
3. ❌ Error de permisos: `EACCES: permission denied` al construir

## Solución Paso a Paso

### 1. Verificar qué configuraciones existen con ese dominio

```bash
# Buscar todas las configuraciones que usan portal-biblioteca.aiep.cl
sudo grep -r "portal-biblioteca.aiep.cl" /etc/nginx/sites-available/
sudo grep -r "portal-biblioteca.aiep.cl" /etc/nginx/sites-enabled/
```

### 2. Arreglar permisos para poder construir

```bash
# Dar permisos al usuario bibliotecas para construir
sudo chown -R bibliotecas:bibliotecas ~/DisenoBiblioteca/dist
cd ~/DisenoBiblioteca
npm run build
```

### 3. Crear el archivo de configuración

```bash
sudo nano /etc/nginx/sites-available/biblioteca
```

**Pega esta configuración:**

```nginx
# Redirección HTTP a HTTPS
server {
    listen 80;
    server_name portal-biblioteca.aiep.cl;
    return 301 https://$host$request_uri;
}

# Configuración HTTPS
server {
    listen 443 ssl http2;
    server_name portal-biblioteca.aiep.cl;

    ssl_certificate /etc/ssl/aiep/certificado.crt;
    ssl_certificate_key /etc/ssl/aiep/private.key;
    ssl_trusted_certificate /etc/ssl/aiep/ca_bundle.crt;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    root /home/bibliotecas/DisenoBiblioteca/dist;
    index index.html;

    # Configuración para Vue.js SPA
    location / {
        try_files $uri /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location /api {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Port $server_port;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    location /admin {
        proxy_pass http://127.0.0.1:1337;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    access_log /var/log/nginx/biblioteca-access.log;
    error_log /var/log/nginx/biblioteca-error.log;
}
```

### 4. Si hay conflicto, deshabilitar la configuración anterior

```bash
# Ver qué archivos están habilitados
ls -la /etc/nginx/sites-enabled/

# Si hay otro archivo con el mismo dominio, deshabilitarlo temporalmente
# (NO lo elimines, solo deshabilita el enlace)
sudo rm /etc/nginx/sites-enabled/nombre-del-archivo-conflicto
```

### 5. Habilitar la nueva configuración

```bash
sudo ln -s /etc/nginx/sites-available/biblioteca /etc/nginx/sites-enabled/biblioteca
```

### 6. Verificar sintaxis

```bash
sudo nginx -t
```

### 7. Dar permisos correctos después de construir

```bash
# Después de npm run build, cambiar permisos para Nginx
sudo chown -R www-data:www-data ~/DisenoBiblioteca/dist
sudo chmod -R 755 ~/DisenoBiblioteca/dist
```

### 8. Recargar Nginx

```bash
sudo systemctl reload nginx
```

## Alternativa: Si quieres mantener ambas configuraciones

Si necesitas mantener otra configuración con el mismo dominio, puedes:

1. **Usar un dominio diferente** para una de las configuraciones
2. **Combinar ambas configuraciones** en un solo archivo usando diferentes `location` blocks
3. **Deshabilitar una** si no la necesitas

## Comandos Rápidos (Copia y Pega)

```bash
# 1. Buscar conflictos
sudo grep -r "portal-biblioteca.aiep.cl" /etc/nginx/sites-available/
sudo grep -r "portal-biblioteca.aiep.cl" /etc/nginx/sites-enabled/

# 2. Arreglar permisos y construir
sudo chown -R bibliotecas:bibliotecas ~/DisenoBiblioteca/dist
cd ~/DisenoBiblioteca && npm run build

# 3. Crear archivo (después de pegar la configuración en nano)
sudo nano /etc/nginx/sites-available/biblioteca

# 4. Habilitar
sudo ln -s /etc/nginx/sites-available/biblioteca /etc/nginx/sites-enabled/biblioteca

# 5. Verificar y recargar
sudo nginx -t
sudo chown -R www-data:www-data ~/DisenoBiblioteca/dist
sudo chmod -R 755 ~/DisenoBiblioteca/dist
sudo systemctl reload nginx
```

