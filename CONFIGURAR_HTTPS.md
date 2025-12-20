# Guía: Configurar HTTPS en Strapi (Opción 1)

Esta guía te ayudará a configurar HTTPS en tu servidor Strapi en AWS.

## Requisitos Previos

- Acceso SSH al servidor AWS (68.211.112.39)
- Permisos de administrador (sudo)
- Un dominio apuntando a tu servidor (opcional pero recomendado)
- Strapi ya instalado y funcionando en el puerto 1337

## Opción A: Con Dominio (Recomendado - Let's Encrypt)

### Paso 1: Instalar Certbot (Let's Encrypt)

```bash
# Conectarse al servidor
ssh usuario@68.211.112.39

# Actualizar el sistema
sudo apt update && sudo apt upgrade -y

# Instalar Certbot
sudo apt install certbot python3-certbot-nginx -y
```

### Paso 2: Instalar y Configurar Nginx

```bash
# Instalar Nginx
sudo apt install nginx -y

# Iniciar Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### Paso 3: Configurar Nginx como Proxy Reverso

Crea el archivo de configuración:

```bash
sudo nano /etc/nginx/sites-available/strapi
```

Pega esta configuración (reemplaza `tu-dominio.com` con tu dominio real):

```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    # Redirigir HTTP a HTTPS (se configurará después)
    location / {
        return 301 https://$server_name$request_uri;
    }
}

server {
    listen 443 ssl http2;
    server_name tu-dominio.com www.tu-dominio.com;

    # Certificados SSL (se generarán con Certbot)
    ssl_certificate /etc/letsencrypt/live/tu-dominio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tu-dominio.com/privkey.pem;

    # Configuración SSL moderna
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # Headers de seguridad
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

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
    }

    # Proxy para uploads y archivos estáticos
    location /uploads {
        proxy_pass http://localhost:1337;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Habilita el sitio:

```bash
sudo ln -s /etc/nginx/sites-available/strapi /etc/nginx/sites-enabled/
sudo nginx -t  # Verificar configuración
sudo systemctl reload nginx
```

### Paso 4: Obtener Certificado SSL

```bash
# Obtener certificado (reemplaza tu-dominio.com)
sudo certbot --nginx -d tu-dominio.com -d www.tu-dominio.com

# Seguir las instrucciones interactivas
# Certbot configurará automáticamente Nginx
```

### Paso 5: Configurar Strapi

Edita el archivo de configuración de Strapi:

```bash
# Ir al directorio de Strapi
cd /ruta/a/tu/proyecto/strapi

# Editar config/server.js o config/env/production/server.js
nano config/server.js
```

Asegúrate de que tenga esta configuración:

```javascript
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL', 'https://tu-dominio.com'),
  proxy: true, // Importante: indica que está detrás de un proxy
  app: {
    keys: env.array('APP_KEYS'),
  },
});
```

Y en `config/middlewares.js`:

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

### Paso 6: Configurar Variables de Entorno

En el archivo `.env` de Strapi:

```bash
PUBLIC_URL=https://tu-dominio.com
HOST=0.0.0.0
PORT=1337
```

### Paso 7: Reiniciar Strapi

```bash
# Si usas PM2
pm2 restart strapi

# O si usas systemd
sudo systemctl restart strapi
```

### Paso 8: Renovar Certificado Automáticamente

```bash
# Certbot crea un cron job automáticamente
# Verificar con:
sudo certbot renew --dry-run
```

## Opción B: Sin Dominio (Self-Signed Certificate)

Si no tienes un dominio, puedes usar un certificado autofirmado (los navegadores mostrarán una advertencia):

### Paso 1: Generar Certificado Self-Signed

```bash
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/strapi-selfsigned.key \
  -out /etc/ssl/certs/strapi-selfsigned.crt
```

### Paso 2: Configurar Nginx

Crea `/etc/nginx/sites-available/strapi`:

```nginx
server {
    listen 443 ssl http2;
    server_name 68.211.112.39;

    ssl_certificate /etc/ssl/certs/strapi-selfsigned.crt;
    ssl_certificate_key /etc/ssl/private/strapi-selfsigned.key;

    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

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
    }

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
    }

    location /uploads {
        proxy_pass http://localhost:1337;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Paso 3: Habilitar y Reiniciar

```bash
sudo ln -s /etc/nginx/sites-available/strapi /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Configurar Firewall

Asegúrate de que los puertos estén abiertos:

```bash
# Permitir HTTPS
sudo ufw allow 443/tcp

# Permitir HTTP (para redirección)
sudo ufw allow 80/tcp

# Verificar estado
sudo ufw status
```

## Actualizar Variables de Entorno en Vue

Una vez configurado HTTPS, actualiza tu archivo `.env.production`:

```bash
VUE_APP_STRAPI_URL_PROD=https://tu-dominio.com
# O si usas IP directamente:
VUE_APP_STRAPI_URL_PROD=https://68.211.112.39
```

## Verificar Configuración

1. **Probar HTTPS:**
   ```bash
   curl -I https://tu-dominio.com/api
   ```

2. **Verificar certificado:**
   ```bash
   openssl s_client -connect tu-dominio.com:443 -servername tu-dominio.com
   ```

3. **Probar desde el navegador:**
   - Ve a `https://tu-dominio.com/admin`
   - Deberías ver el candado verde (con Let's Encrypt)
   - O una advertencia que puedes aceptar (con self-signed)

## Solución de Problemas

### Error: "502 Bad Gateway"
- Verifica que Strapi esté corriendo: `sudo systemctl status strapi`
- Verifica los logs de Nginx: `sudo tail -f /var/log/nginx/error.log`

### Error: "SSL certificate problem"
- Verifica que el certificado esté en la ruta correcta
- Verifica permisos: `sudo chmod 644 /etc/ssl/certs/strapi-*.crt`

### Strapi no responde
- Verifica que Strapi escuche en `0.0.0.0:1337` (no solo `localhost`)
- Verifica firewall: `sudo ufw status`

## Notas Importantes

1. **Con dominio:** Usa Let's Encrypt (gratis y confiable)
2. **Sin dominio:** Usa certificado self-signed (solo para desarrollo/testing)
3. **Producción:** Siempre usa un dominio real con Let's Encrypt
4. **Renovación:** Let's Encrypt renueva automáticamente cada 90 días





