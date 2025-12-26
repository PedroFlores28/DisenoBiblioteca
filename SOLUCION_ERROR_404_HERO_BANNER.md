# Solución: Error 404 al Cargar Hero-Banner

## 🔴 Error
```
GET https://portal-biblioteca.aiep.cl/api/hero-banner?populate=* 404 (Not Found)
```

## 🔍 Diagnóstico

Este error indica que el tipo de contenido `hero-banner` no existe en Strapi o tiene un nombre diferente en la API.

## ✅ Soluciones Paso a Paso

### Paso 1: Verificar que el Tipo de Contenido Existe

1. Accede a Strapi Admin: `https://cmsbiblioteca.aiep.cl/admin`
2. Ve a **Content-Type Builder** (en el menú lateral)
3. Busca si existe un tipo de contenido llamado **Hero-banner** o similar
4. Si no existe, créalo siguiendo las instrucciones en `CONFIGURAR_BANNER_STRAPI.md`

### Paso 2: Verificar el API ID (Strapi v4)

En Strapi v4, el nombre usado en la API puede ser diferente al nombre mostrado:

1. En **Content-Type Builder**, haz clic en el tipo de contenido **Hero-banner**
2. Busca el campo **API ID** o **API Identifier**
3. El API ID puede ser:
   - `hero-banner` (lo esperado)
   - `api::hero-banner.hero-banner` (formato completo de Strapi v4)
   - Otro nombre diferente

### Paso 3: Probar la API Directamente

Abre en tu navegador:
```
https://cmsbiblioteca.aiep.cl/api/hero-banner
```

**Resultados posibles:**

- ✅ **200 OK con JSON**: El tipo de contenido existe y está configurado correctamente
- ❌ **404 Not Found**: El tipo de contenido no existe o el nombre es incorrecto
- ❌ **403 Forbidden**: El tipo de contenido existe pero no tiene permisos públicos

### Paso 4: Verificar Permisos

1. Ve a **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Busca la sección **Hero-banner** (o el nombre que aparezca)
3. Asegúrate de que estén marcados:
   - ✅ **find**
   - ✅ **findOne**

### Paso 5: Verificar que Haya Entradas

1. Ve a **Content Manager** → **Hero-banner**
2. Verifica que exista al menos una entrada
3. Asegúrate de que la entrada esté **Publicada** (no solo guardada como borrador)

### Paso 6: Si el API ID es Diferente

Si el API ID es diferente a `hero-banner`, necesitas actualizar el código:

1. Abre `src/components/sections/HeroSection.vue`
2. Busca la línea que dice:
   ```javascript
   const response = await strapiService.getCollection('hero-banner', {
   ```
3. Cambia `'hero-banner'` por el API ID correcto que encontraste en el Paso 2

**Ejemplos:**
- Si el API ID es `api::hero-banner.hero-banner`, usa: `'api::hero-banner.hero-banner'`
- Si el API ID es `heroBanner`, usa: `'heroBanner'`

### Paso 7: Verificar la URL Base

Si estás en desarrollo y el error muestra `portal-biblioteca.aiep.cl` en lugar de `cmsbiblioteca.aiep.cl`:

1. Verifica que estés usando el proxy correcto
2. Revisa `vue.config.js` - el proxy debe apuntar a `https://cmsbiblioteca.aiep.cl`
3. Reinicia el servidor de desarrollo:
   ```bash
   npm run serve
   ```

## 🧪 Prueba Rápida

Ejecuta esto en la consola del navegador (F12) para probar diferentes nombres:

```javascript
// Probar con el nombre estándar
fetch('https://cmsbiblioteca.aiep.cl/api/hero-banner')
  .then(r => r.json())
  .then(d => console.log('✅ hero-banner funciona:', d))
  .catch(e => console.log('❌ hero-banner no funciona'))

// Si no funciona, prueba con otros nombres comunes
fetch('https://cmsbiblioteca.aiep.cl/api/api::hero-banner.hero-banner')
  .then(r => r.json())
  .then(d => console.log('✅ api::hero-banner.hero-banner funciona:', d))
  .catch(e => console.log('❌ api::hero-banner.hero-banner no funciona'))
```

## 📋 Checklist de Verificación

- [ ] El tipo de contenido existe en Content-Type Builder
- [ ] El API ID es `hero-banner` o se actualizó el código con el nombre correcto
- [ ] Los permisos públicos están configurados (find y findOne)
- [ ] Existe al menos una entrada en Content Manager
- [ ] La entrada está publicada (no solo guardada)
- [ ] La URL de la API responde correctamente (prueba en el navegador)

## 🆘 Si Nada Funciona

1. **Crea el tipo de contenido desde cero:**
   - Sigue las instrucciones en `CONFIGURAR_BANNER_STRAPI.md`
   - Asegúrate de usar exactamente el nombre `hero-banner`

2. **Verifica los logs de Strapi:**
   - Si tienes acceso al servidor, revisa los logs de Strapi
   - Busca errores relacionados con `hero-banner`

3. **Reinicia Strapi:**
   ```bash
   pm2 restart strapi
   # o
   sudo systemctl restart strapi
   ```

## 💡 Nota Importante

El componente tiene un **fallback automático**: si no puede cargar desde Strapi, usará las imágenes estáticas por defecto. Esto significa que el sitio seguirá funcionando, pero no podrás administrar el banner desde Strapi hasta que se resuelva el problema.

