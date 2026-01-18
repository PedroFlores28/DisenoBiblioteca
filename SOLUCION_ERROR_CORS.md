# Solución al Error de CORS

## 🔴 Problema

Error al intentar acceder a la API desde el navegador:

```
Access to XMLHttpRequest at 'http://localhost:3000/api/public/shared-store/...' 
from origin 'http://localhost:8080' has been blocked by CORS policy
```

## 🔍 Causa

El archivo `vue.config.js` tenía configurado el puerto **3000**, pero la aplicación Vue estaba corriendo en el puerto **8080** (puerto por defecto de Vue CLI). Esto causaba un conflicto de puertos y errores de CORS.

## ✅ Solución Aplicada

Se corrigió el puerto en `vue.config.js` de **3000** a **8080**.

### Cambio Realizado

```javascript
// ANTES
devServer: {
  port: 3000,
  open: true,
  // ...
}

// DESPUÉS
devServer: {
  port: 8080,
  open: true,
  // ...
}
```

## 🚀 Pasos para Aplicar la Solución

### 1. Detener el Servidor de Desarrollo

Si tienes el servidor corriendo, detenlo con `Ctrl + C` en la terminal.

### 2. Limpiar Procesos en el Puerto 8080 (si es necesario)

Si el puerto 8080 está ocupado, ejecuta:

```bash
# Ver qué procesos están usando el puerto 8080
lsof -ti:8080

# Matar los procesos (reemplaza PID con el número que te dio el comando anterior)
kill -9 PID
```

O usa este comando para matar todos los procesos en el puerto 8080:

```bash
lsof -ti:8080 | xargs kill -9
```

### 3. Reiniciar el Servidor de Desarrollo

```bash
npm run serve
```

El servidor ahora debería iniciar correctamente en `http://localhost:8080`.

## 🔧 Configuración del Proxy

El `vue.config.js` ya tiene configurado un proxy para redirigir las peticiones `/api` a Strapi:

```javascript
proxy: {
  '/api': {
    target: 'https://cmsbiblioteca.aiep.cl',
    changeOrigin: true,
    secure: true,
    logLevel: 'debug'
  }
}
```

Esto significa que cuando tu aplicación hace una petición a `/api/...`, el servidor de desarrollo la redirige automáticamente a `https://cmsbiblioteca.aiep.cl/api/...`, evitando problemas de CORS.

## 📝 Notas Importantes

### Para Desarrollo Local

- **Puerto del servidor Vue**: `8080`
- **URL de la aplicación**: `http://localhost:8080`
- **Proxy configurado**: Las peticiones a `/api` se redirigen a Strapi

### Para Producción

- El servidor de producción corre en el puerto **3000** con PM2
- Nginx maneja el proxy reverso
- No hay problemas de CORS porque todo está en el mismo dominio

## 🆘 Solución de Problemas

### Error: "Port 8080 is already in use"

Si ves este error, significa que otro proceso está usando el puerto 8080. Soluciones:

1. **Matar el proceso**:
   ```bash
   lsof -ti:8080 | xargs kill -9
   ```

2. **Usar otro puerto temporalmente**:
   ```bash
   PORT=8081 npm run serve
   ```

### Error: "Cannot read properties of null (reading 'length')"

Este error aparece cuando un componente intenta acceder a datos que aún no se han cargado. Soluciones:

1. **Agregar validación en el template**:
   ```vue
   <div v-if="data && data.length > 0">
     <!-- Tu contenido aquí -->
   </div>
   ```

2. **Inicializar datos con valores por defecto**:
   ```javascript
   data() {
     return {
       items: [], // En lugar de null
       loading: true
     }
   }
   ```

### Error de CORS persiste

Si después de reiniciar el servidor el error de CORS persiste:

1. **Limpia la caché del navegador**: `Ctrl + Shift + R` (Windows/Linux) o `Cmd + Shift + R` (Mac)
2. **Verifica que el proxy esté configurado correctamente** en `vue.config.js`
3. **Revisa la consola del servidor** para ver si hay errores de proxy

## 🔗 Referencias

- [Vue CLI - DevServer Proxy](https://cli.vuejs.org/config/#devserver-proxy)
- [CORS - MDN Web Docs](https://developer.mozilla.org/es/docs/Web/HTTP/CORS)
