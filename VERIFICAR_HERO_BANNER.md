# Verificar Hero-Banner en Strapi

## 🔍 Pasos de Verificación

### Paso 1: Verificar Permisos Públicos

1. Ve a `https://cmsbiblioteca.aiep.cl/admin`
2. **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
3. Busca la sección **Hero-banner** (o **api::hero-banner.hero-banner**)
4. Asegúrate de que estén marcados:
   - ✅ **find**
   - ✅ **findOne**
5. Haz clic en **Save**

### Paso 2: Probar la API Directamente

Abre estas URLs en tu navegador para verificar:

#### Opción A: Nombre estándar
```
https://cmsbiblioteca.aiep.cl/api/hero-banner
```

#### Opción B: Formato completo Strapi v4
```
https://cmsbiblioteca.aiep.cl/api/api::hero-banner.hero-banner
```

**Resultado esperado:**
- ✅ Deberías ver un JSON con la estructura de datos
- ❌ Si ves 404, el nombre es incorrecto
- ❌ Si ves 403, faltan permisos públicos

### Paso 3: Probar desde la Consola del Navegador

Abre la consola del navegador (F12) en tu sitio y ejecuta:

```javascript
// Probar con el nombre estándar
fetch('https://cmsbiblioteca.aiep.cl/api/hero-banner?populate=*')
  .then(r => {
    console.log('Status:', r.status)
    return r.json()
  })
  .then(d => {
    console.log('✅ hero-banner funciona:', d)
    if (d.data && d.data.length > 0) {
      console.log('📝 Entrada encontrada:', d.data[0])
    }
  })
  .catch(e => console.log('❌ Error:', e))

// Si no funciona, probar con formato completo
fetch('https://cmsbiblioteca.aiep.cl/api/api::hero-banner.hero-banner?populate=*')
  .then(r => {
    console.log('Status:', r.status)
    return r.json()
  })
  .then(d => {
    console.log('✅ api::hero-banner.hero-banner funciona:', d)
  })
  .catch(e => console.log('❌ Error:', e))
```

### Paso 4: Verificar el API ID en Strapi

1. Ve a **Content-Type Builder**
2. Haz clic en **Hero-banner**
3. Busca el campo **API ID** o **API Identifier**
4. Anota el valor exacto

**Posibles valores:**
- `hero-banner` (lo esperado)
- `api::hero-banner.hero-banner` (formato completo)
- `heroBanner` (camelCase)
- Otro nombre

### Paso 5: Si el API ID es Diferente

Si el API ID no es `hero-banner`, actualiza el código:

1. Abre `src/components/sections/HeroSection.vue`
2. Busca la línea ~167:
   ```javascript
   const response = await strapiService.getCollection('hero-banner', {
   ```
3. Cambia `'hero-banner'` por el API ID correcto

**Ejemplo si el API ID es `api::hero-banner.hero-banner`:**
```javascript
const response = await strapiService.getCollection('api::hero-banner.hero-banner', {
```

### Paso 6: Verificar que la Entrada Tenga Imágenes

1. Ve a **Content Manager** → **Hero-banner**
2. Haz clic en la entrada (ID: 1)
3. Verifica que:
   - **Imagen Desktop** tenga una imagen subida
   - **Imagen Mobile** tenga una imagen subida
4. Asegúrate de que la entrada esté **Publicada** (no solo guardada)

### Paso 7: Reiniciar Strapi (si es necesario)

Si hiciste cambios en permisos o configuración:

```bash
pm2 restart strapi
# o
sudo systemctl restart strapi
```

## 🧪 Prueba Rápida con el Servicio

Si estás en modo desarrollo, puedes usar la función de prueba:

```javascript
// En la consola del navegador
testStrapi('hero-banner')
```

O probar directamente:

```javascript
strapiService.getCollection('hero-banner', { populate: '*' })
  .then(r => console.log('✅ Resultado:', r))
  .catch(e => console.error('❌ Error:', e))
```

## 📋 Checklist de Verificación

- [ ] Permisos públicos configurados (find y findOne)
- [ ] API responde correctamente (prueba en navegador)
- [ ] API ID verificado en Content-Type Builder
- [ ] Código actualizado con el API ID correcto (si es diferente)
- [ ] Entrada tiene imágenes subidas
- [ ] Entrada está publicada
- [ ] Strapi reiniciado después de cambios

## 🆘 Si Sigue Sin Funcionar

1. **Revisa los logs de Strapi:**
   ```bash
   pm2 logs strapi
   ```

2. **Verifica la configuración del servidor:**
   - Asegúrate de que `proxy: true` esté en `config/server.js` de Strapi
   - Verifica que la URL pública esté configurada correctamente

3. **Prueba con otras colecciones:**
   - Si `preguntas-frecuentes` funciona pero `hero-banner` no, el problema es específico de esta colección
   - Compara la configuración de ambas colecciones

4. **Verifica la estructura de datos:**
   - Abre la entrada en Strapi
   - Verifica que los campos `imagenDesktop` e `imagenMobile` tengan nombres exactos (case-sensitive)

