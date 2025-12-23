# Diagnosticar: Sigue mostrando cambios antiguos

## 🔍 Pasos para diagnosticar el problema

### 1. Verificar qué está sirviendo Nginx

```bash
# Ver la configuración actual de Nginx
sudo cat /etc/nginx/sites-available/biblioteca | grep -A 5 "location /"

# Debería mostrar algo como:
# location / {
#     proxy_pass http://127.0.0.1:3000;
#     ...
# }
```

**Si muestra `root` o `try_files`**, entonces está sirviendo archivos estáticos (dist).  
**Si muestra `proxy_pass http://127.0.0.1:3000`**, entonces está haciendo proxy correctamente.

### 2. Verificar que PM2 está corriendo

```bash
# Ver estado de PM2
pm2 status

# Debería mostrar biblioteca-aiep como "online"
```

### 3. Verificar que el puerto 3000 está activo

```bash
# Verificar que el puerto 3000 está escuchando
netstat -tuln | grep 3000
# O
ss -tuln | grep 3000

# Probar directamente
curl http://localhost:3000
```

### 4. Verificar logs de PM2

```bash
# Ver logs recientes
pm2 logs biblioteca-aiep --lines 50

# Ver si hay errores
pm2 logs biblioteca-aiep --err
```

### 5. Verificar configuración de Nginx y recargar

```bash
# Verificar sintaxis
sudo nginx -t

# Ver la configuración completa
sudo cat /etc/nginx/sites-available/biblioteca

# Si está correcta, recargar
sudo systemctl reload nginx

# O reiniciar completamente
sudo systemctl restart nginx
```

## 🔧 Soluciones comunes

### Problema 1: Nginx está sirviendo archivos estáticos (dist)

**Síntomas**: La configuración muestra `root /home/bibliotecas/DisenoBiblioteca/dist;`

**Solución**:
```bash
# 1. Editar la configuración
sudo nano /etc/nginx/sites-available/biblioteca

# 2. Cambiar de:
#    root /home/bibliotecas/DisenoBiblioteca/dist;
#    location / {
#        try_files $uri /index.html;
#    }

# 3. A:
#    location / {
#        proxy_pass http://127.0.0.1:3000;
#        proxy_http_version 1.1;
#        proxy_set_header Host $host;
#        proxy_set_header X-Real-IP $remote_addr;
#        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
#        proxy_set_header X-Forwarded-Proto $scheme;
#        proxy_set_header Upgrade $http_upgrade;
#        proxy_set_header Connection "upgrade";
#    }

# 4. Verificar y recargar
sudo nginx -t
sudo systemctl reload nginx
```

### Problema 2: PM2 no está corriendo

**Solución**:
```bash
# Iniciar PM2
cd /home/bibliotecas/DisenoBiblioteca
pm2 start ecosystem.config.js

# Verificar
pm2 status
pm2 logs biblioteca-aiep
```

### Problema 3: Cache del navegador

**Solución**:
- Presiona `Ctrl + Shift + R` (Windows/Linux) o `Cmd + Shift + R` (Mac) para recargar sin cache
- O abre en modo incógnito
- O limpia el cache del navegador

### Problema 4: Nginx no se recargó después de cambiar la configuración

**Solución**:
```bash
# Recargar Nginx
sudo nginx -t
sudo systemctl reload nginx

# Verificar que está corriendo
sudo systemctl status nginx
```

## 🧪 Prueba rápida

Ejecuta estos comandos en orden:

```bash
# 1. Verificar PM2
pm2 status

# 2. Verificar puerto 3000
curl -I http://localhost:3000

# 3. Verificar configuración de Nginx
sudo grep -A 10 "location /" /etc/nginx/sites-available/biblioteca

# 4. Verificar respuesta desde Nginx
curl -I https://portal-biblioteca.aiep.cl

# 5. Ver logs de Nginx
sudo tail -f /var/log/nginx/biblioteca-error.log
```

## 📝 Comandos de diagnóstico completo

```bash
#!/bin/bash
echo "=== Diagnóstico completo ==="

echo -e "\n1. Estado de PM2:"
pm2 status

echo -e "\n2. Puerto 3000:"
netstat -tuln | grep 3000 || echo "Puerto 3000 no está activo"

echo -e "\n3. Test puerto 3000:"
curl -I http://localhost:3000 2>&1 | head -5

echo -e "\n4. Configuración Nginx (location /):"
sudo grep -A 5 "location /" /etc/nginx/sites-available/biblioteca

echo -e "\n5. Test desde Nginx:"
curl -I https://portal-biblioteca.aiep.cl 2>&1 | head -5

echo -e "\n6. Últimos logs de PM2:"
pm2 logs biblioteca-aiep --lines 10 --nostream

echo -e "\n7. Últimos errores de Nginx:"
sudo tail -5 /var/log/nginx/biblioteca-error.log
```

Guarda este script como `diagnostico.sh` y ejecútalo: `bash diagnostico.sh`

