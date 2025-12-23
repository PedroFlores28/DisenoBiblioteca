# Configuración: PM2 + Nginx (Sin archivos estáticos dist)

Esta configuración usa **PM2** para ejecutar la aplicación Vue.js y **Nginx** como proxy inverso.

## 📋 Resumen

- **PM2**: Ejecuta `npm run serve` en el puerto **3000**
- **Nginx**: Hace proxy de `portal-biblioteca.aiep.cl` → `http://127.0.0.1:3000`
- **Sin compilación**: No necesitas ejecutar `npm run build`

## 🔧 Pasos para configurar

### 1. Actualizar configuración de Nginx

Copia el contenido de `nginx-biblioteca.conf` al archivo de configuración de Nginx:

```bash
# Copiar la configuración
sudo cp nginx-biblioteca.conf /etc/nginx/sites-available/biblioteca

# O editar directamente
sudo nano /etc/nginx/sites-available/biblioteca
```

**Importante**: La nueva configuración hace proxy a `http://127.0.0.1:3000` en lugar de servir archivos estáticos.

### 2. Verificar y recargar Nginx

```bash
# Verificar sintaxis
sudo nginx -t

# Si todo está bien, recargar
sudo systemctl reload nginx
```

### 3. Asegurar que PM2 esté corriendo

```bash
# Verificar estado
pm2 status

# Si no está corriendo, iniciarlo
pm2 start ecosystem.config.js

# O usar el script
npm run pm2:start
```

### 4. Probar el deploy

```bash
# Ejecutar el script de deploy
./deploy.sh

# O manualmente:
git pull
npm install  # Solo si hay cambios en package.json
pm2 restart biblioteca-aiep
sudo systemctl reload nginx
```

## 📝 Cambios realizados

### `deploy.sh`
- ✅ Eliminado `npm run build` (ya no compila)
- ✅ Se reinicia PM2 después de `git pull`
- ✅ Se recarga Nginx

### `nginx-biblioteca.conf`
- ✅ Cambiado de servir archivos estáticos (`root`) a proxy (`proxy_pass`)
- ✅ Proxy a `http://127.0.0.1:3000`
- ✅ Soporte para WebSocket (hot reload)

### `vue.config.js`
- ✅ Agregado `portal-biblioteca.aiep.cl` a `allowedHosts`

## 🔍 Verificar que funciona

1. **Verificar PM2**:
   ```bash
   pm2 status
   pm2 logs biblioteca-aiep
   ```

2. **Verificar puerto 3000**:
   ```bash
   curl http://localhost:3000
   ```

3. **Verificar Nginx**:
   ```bash
   curl -I https://portal-biblioteca.aiep.cl
   ```

## ⚠️ Notas importantes

1. **PM2 debe estar corriendo siempre**: Si se reinicia el servidor, asegúrate de que PM2 se inicie automáticamente:
   ```bash
   pm2 startup
   pm2 save
   ```

2. **Puerto 3000**: La aplicación Vue.js corre en el puerto 3000. Asegúrate de que este puerto esté disponible y no bloqueado por firewall.

3. **Desarrollo vs Producción**: Esta configuración usa el modo desarrollo de Vue.js. Si quieres optimizaciones de producción, podrías considerar:
   - Usar `NODE_ENV=production` en PM2
   - O volver a la configuración con archivos estáticos (`dist`)

## 🔄 Comparación: Archivos estáticos vs PM2

| Aspecto | Archivos estáticos (`dist`) | PM2 (puerto 3000) |
|---------|----------------------------|-------------------|
| **Rendimiento** | Más rápido (archivos estáticos) | Más lento (Node.js procesando) |
| **Actualización** | Requiere `npm run build` | Solo reiniciar PM2 |
| **Memoria** | Menor uso | Mayor uso (Node.js corriendo) |
| **Hot Reload** | No disponible | Disponible en desarrollo |
| **Recomendado para** | Producción | Desarrollo/Testing |

## 🐛 Solución de problemas

### Error: "502 Bad Gateway"
- Verifica que PM2 esté corriendo: `pm2 status`
- Verifica que el puerto 3000 esté activo: `curl http://localhost:3000`
- Revisa logs: `pm2 logs biblioteca-aiep`

### Los cambios no se reflejan
- Reinicia PM2: `pm2 restart biblioteca-aiep`
- Verifica que PM2 esté usando los archivos correctos
- Revisa los logs de PM2 para errores

### Error de permisos en Nginx
- Verifica que el usuario `www-data` pueda conectarse a `127.0.0.1:3000`
- Revisa los logs de Nginx: `sudo tail -f /var/log/nginx/biblioteca-error.log`

