# Instrucciones para PM2 y Deploy

## 🔄 Problema: Los cambios de Git no se reflejan

Cuando haces `git pull`, los cambios no se reflejan porque **PM2 está ejecutando la versión anterior del código en memoria**. Necesitas reiniciar PM2 para que cargue los nuevos cambios.

## ✅ Solución Rápida

Después de hacer `git pull`, ejecuta:

```bash
pm2 restart biblioteca-aiep
```

O usa el script de deploy automatizado:

```bash
npm run deploy
# o directamente:
./deploy.sh
```

## 📋 Comandos Útiles de PM2

### Ver el estado de la aplicación
```bash
npm run pm2:status
# o
pm2 status
```

### Reiniciar la aplicación
```bash
npm run pm2:restart
# o
pm2 restart biblioteca-aiep
```

### Ver los logs en tiempo real
```bash
npm run pm2:logs
# o
pm2 logs biblioteca-aiep
```

### Detener la aplicación
```bash
npm run pm2:stop
# o
pm2 stop biblioteca-aiep
```

### Iniciar la aplicación
```bash
npm run pm2:start
# o
pm2 start ecosystem.config.js
```

### Recargar sin downtime (zero-downtime)
```bash
npm run pm2:reload
# o
pm2 reload biblioteca-aiep
```

## 🚀 Proceso de Deploy Completo

### Opción 1: Script Automatizado (Recomendado)

```bash
# 1. Hacer git pull y reiniciar automáticamente
npm run deploy
```

El script `deploy.sh` hace lo siguiente:
1. ✅ Hace `git pull` para obtener los últimos cambios
2. ✅ Instala nuevas dependencias si es necesario
3. ✅ Reinicia PM2 automáticamente
4. ✅ Muestra el estado de la aplicación

### Opción 2: Manual

```bash
# 1. Obtener cambios
git pull

# 2. Instalar dependencias (si hay cambios en package.json)
npm install

# 3. Reiniciar PM2
pm2 restart biblioteca-aiep

# 4. Verificar que está corriendo
pm2 status
```

## 🔧 Configuración Inicial de PM2

Si es la primera vez que usas PM2 con este proyecto:

```bash
# 1. Iniciar la aplicación con PM2
npm run pm2:start

# 2. Guardar la configuración para que PM2 la inicie automáticamente al reiniciar el servidor
pm2 save
pm2 startup
```

## 📝 Configuración del Archivo ecosystem.config.js

El archivo `ecosystem.config.js` contiene la configuración de PM2. Si necesitas cambiar el nombre de la aplicación o la ruta, edita este archivo.

**Importante:** Si cambias la ruta del proyecto, actualiza la propiedad `cwd` en `ecosystem.config.js`.

## 🐛 Solución de Problemas

### La aplicación no inicia después del reinicio

1. Verifica los logs:
```bash
pm2 logs biblioteca-aiep --lines 50
```

2. Verifica que el puerto no esté en uso:
```bash
# Si usas el puerto 3000
lsof -i :3000
```

3. Verifica las variables de entorno:
```bash
pm2 env biblioteca-aiep
```

### Los cambios aún no se reflejan

1. Asegúrate de haber hecho `git pull` correctamente:
```bash
git status
git log -1
```

2. Verifica que PM2 esté usando el código correcto:
```bash
pm2 info biblioteca-aiep
# Revisa el campo "cwd" (directorio de trabajo)
```

3. Si usas archivos compilados (build), recompila:
```bash
npm run build
pm2 restart biblioteca-aiep
```

### La aplicación se cae constantemente

1. Revisa los logs de error:
```bash
pm2 logs biblioteca-aiep --err
```

2. Verifica el uso de memoria:
```bash
pm2 monit
```

3. Aumenta el límite de memoria en `ecosystem.config.js` si es necesario.

## 📊 Monitoreo

### Ver uso de recursos en tiempo real
```bash
pm2 monit
```

### Ver información detallada de la aplicación
```bash
pm2 describe biblioteca-aiep
```

### Ver logs de los últimos 100 líneas
```bash
pm2 logs biblioteca-aiep --lines 100
```

## 🔐 Permisos del Script de Deploy

Si el script `deploy.sh` no tiene permisos de ejecución:

```bash
chmod +x deploy.sh
```

## 💡 Tips

- **Usa `pm2 reload` en lugar de `restart`** para zero-downtime (solo funciona si la aplicación ya está corriendo)
- **Guarda la configuración de PM2** con `pm2 save` para que persista después de reiniciar el servidor
- **Revisa los logs regularmente** para detectar problemas temprano
- **Usa el script de deploy** para automatizar el proceso y evitar errores

