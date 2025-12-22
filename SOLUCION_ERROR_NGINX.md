# Solución: Error Nginx - Archivo no encontrado y bucle de redirección

## Problema 1: Archivo no encontrado
```
open() "/etc/nginx/sites-enabled/biblioteca" failed (2: No such file or directory)
```

## Problema 2: Bucle de redirección
```
rewrite or internal redirection cycle while internally redirecting to "/index.html"
```

## Solución Paso a Paso

### 1. Verificar que el archivo existe en sites-available

```bash
ls -la /etc/nginx/sites-available/biblioteca
```

Si NO existe, créalo:

```bash
sudo nano /etc/nginx/sites-available/biblioteca
```

Y pega esta configuración CORREGIDA (sin bucle):

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

    # ⚠️ Cambiar esta ruta
    root /home/bibliotecas/DisenoBiblioteca/dist;
    index index.html;

    # CORREGIDO: try_files sin bucle
    location / {
        try_files $uri $uri/ @fallback;
    }

    # Fallback para SPA
    location @fallback {
        rewrite ^.*$ /index.html last;
    }

    # Cache para archivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    # Proxy para Strapi API
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

    # Proxy para Strapi Admin
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

### 2. Crear el enlace simbólico

```bash
# Eliminar enlace roto si existe
sudo rm -f /etc/nginx/sites-enabled/biblioteca

# Crear nuevo enlace
sudo ln -s /etc/nginx/sites-available/biblioteca /etc/nginx/sites-enabled/biblioteca

# Verificar que se creó
ls -la /etc/nginx/sites-enabled/biblioteca
```

### 3. Verificar sintaxis

```bash
sudo nginx -t
```

### 4. Verificar que dist/ existe

```bash
ls -la ~/DisenoBiblioteca/dist/index.html
```

Si NO existe, construir la aplicación:

```bash
cd ~/DisenoBiblioteca
npm run build
```

### 5. Dar permisos

```bash
sudo chown -R www-data:www-data ~/DisenoBiblioteca/dist
sudo chmod -R 755 ~/DisenoBiblioteca/dist
```

### 6. Recargar Nginx

```bash
sudo systemctl reload nginx
```

### 7. Verificar estado

```bash
sudo systemctl status nginx
```

## Alternativa: Configuración más simple (si la anterior no funciona)

Si el problema persiste, usa esta configuración más simple:

```nginx
server {
    listen 443 ssl http2;
    server_name portal-biblioteca.aiep.cl;

    ssl_certificate /etc/ssl/aiep/certificado.crt;
    ssl_certificate_key /etc/ssl/aiep/private.key;
    ssl_trusted_certificate /etc/ssl/aiep/ca_bundle.crt;

    root /home/bibliotecas/DisenoBiblioteca/dist;
    index index.html;

    # Configuración simple para SPA
    location / {
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://127.0.0.1:1337;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    access_log /var/log/nginx/biblioteca-access.log;
    error_log /var/log/nginx/biblioteca-error.log;
}
```

