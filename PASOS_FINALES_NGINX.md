# Pasos Finales para Configurar Nginx

## 1. Crear el archivo de configuración para la biblioteca

```bash
sudo nano /etc/nginx/sites-available/biblioteca
```

## 2. Pegar esta configuración (cambiar la ruta del root):

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

    # Certificados SSL
    ssl_certificate /etc/ssl/aiep/certificado.crt;
    ssl_certificate_key /etc/ssl/aiep/private.key;
    ssl_trusted_certificate /etc/ssl/aiep/ca_bundle.crt;

    # Configuración SSL moderna
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Headers de seguridad
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # ⚠️ CAMBIAR ESTA RUTA - Usar la ruta completa donde está dist/
    # Ejemplo: /home/bibliotecas/DisenoBiblioteca/dist
    root /home/bibliotecas/DisenoBiblioteca/dist;
    index index.html;

    # Configuración para Vue.js SPA
    location / {
        try_files $uri $uri/ /index.html;
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

    # Logs
    access_log /var/log/nginx/biblioteca-access.log;
    error_log /var/log/nginx/biblioteca-error.log;
}
```

## 3. Habilitar el sitio

```bash
sudo ln -s /etc/nginx/sites-available/biblioteca /etc/nginx/sites-enabled/
```

## 4. Verificar sintaxis

```bash
sudo nginx -t
```

## 5. Verificar que dist/ existe y tiene archivos

```bash
ls -la ~/DisenoBiblioteca/dist/
# Deberías ver: index.html, js/, css/, etc.
```

## 6. Dar permisos correctos

```bash
sudo chown -R www-data:www-data ~/DisenoBiblioteca/dist
sudo chmod -R 755 ~/DisenoBiblioteca/dist
```

## 7. Recargar Nginx

```bash
sudo systemctl reload nginx
```

## 8. Verificar que funciona

```bash
# Ver logs si hay errores
sudo tail -f /var/log/nginx/biblioteca-error.log

# Probar acceso
curl -I https://portal-biblioteca.aiep.cl
```

## Nota Importante

- El archivo `strapi` es para Strapi (CMS)
- El archivo `biblioteca` es para la aplicación Vue.js
- Ambos pueden coexistir si usan diferentes `server_name`

