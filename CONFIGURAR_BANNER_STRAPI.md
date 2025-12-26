# Configurar Banner del Hero desde Strapi

Esta guía explica cómo configurar el banner del Hero Section para que sea administrable desde Strapi.

## 📋 Requisitos Previos

- Acceso al panel de administración de Strapi: `https://cmsbiblioteca.aiep.cl/admin`
- Permisos de administrador en Strapi

## 🚀 Pasos para Configurar

### 1. Crear el Tipo de Contenido "Hero Banner"

1. Ve al panel de administración de Strapi: `https://cmsbiblioteca.aiep.cl/admin`
2. En el menú lateral izquierdo, haz clic en **Content-Type Builder**
3. Haz clic en **Create new collection type**
4. Nombre del tipo de contenido: `hero-banner` (debe ser exactamente este nombre)
5. Haz clic en **Continue**

### 2. Agregar Campos al Tipo de Contenido

Agrega los siguientes campos:

#### Campo 1: Imagen Desktop
- **Nombre del campo**: `imagenDesktop`
- **Tipo**: `Media` (Single media)
- **Configuración**: 
  - Marca "Required field" si deseas que sea obligatorio
  - Tipo de archivo: Image

#### Campo 2: Imagen Mobile
- **Nombre del campo**: `imagenMobile`
- **Tipo**: `Media` (Single media)
- **Configuración**: 
  - Marca "Required field" si deseas que sea obligatorio
  - Tipo de archivo: Image

### 3. Guardar el Tipo de Contenido

1. Haz clic en **Save** en la parte superior derecha
2. Espera a que Strapi reinicie el servidor (esto puede tomar unos segundos)

### 4. Configurar Permisos Públicos

Para que el frontend pueda acceder a los datos del banner:

1. Ve a **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Busca la sección **Hero-banner**
3. Marca las siguientes casillas:
   - ✅ **find** (permitir buscar/listar)
   - ✅ **findOne** (permitir obtener un elemento específico)
4. Haz clic en **Save**

### 5. Crear una Entrada del Banner

1. Ve a **Content Manager** en el menú lateral
2. Selecciona **Hero-banner**
3. Haz clic en **Create new entry**
4. Sube las imágenes:
   - **Imagen Desktop**: Imagen para pantallas grandes (recomendado: 1920x1080px o similar)
   - **Imagen Mobile**: Imagen para dispositivos móviles (recomendado: 768x1024px o similar)
5. Haz clic en **Save**
6. Haz clic en **Publish** para publicar la entrada

## 📝 Notas Importantes

- **Nombre del tipo de contenido**: Debe ser exactamente `hero-banner` (con guión, en minúsculas)
- **Orden de prioridad**: Si hay múltiples entradas, se tomará la más reciente (ordenada por `createdAt:desc`)
- **Fallback**: Si Strapi no está disponible o no hay datos, el componente usará las imágenes estáticas por defecto ubicadas en:
  - Desktop: `src/assets/images/hero-background.jpg`
  - Mobile: `src/assets/images/b1b818e26d255f001e62b637fce22a3221cf95c6.jpg`

## 🔍 Verificar que Funciona

1. Abre la consola del navegador (F12)
2. Recarga la página
3. Deberías ver mensajes como:
   - `🔄 Cargando banner desde Strapi...`
   - `✅ Imagen desktop cargada desde Strapi: [URL]`
   - `✅ Imagen mobile cargada desde Strapi: [URL]`

Si ves mensajes de error, verifica:
- Que el tipo de contenido se llame exactamente `hero-banner`
- Que los permisos públicos estén configurados correctamente
- Que la entrada esté publicada (no solo guardada)

## 🎨 Recomendaciones de Imágenes

- **Formato**: JPG o PNG
- **Tamaño Desktop**: 1920x1080px (o proporción 16:9)
- **Tamaño Mobile**: 768x1024px (o proporción 3:4)
- **Peso**: Intenta mantener las imágenes optimizadas (< 500KB cada una)
- **Calidad**: Usa imágenes de alta calidad pero optimizadas para web

## 🔄 Actualizar el Banner

Para cambiar el banner en el futuro:

1. Ve a **Content Manager** → **Hero-banner**
2. Edita la entrada existente o crea una nueva
3. Reemplaza las imágenes según sea necesario
4. Guarda y publica los cambios
5. Recarga la página del sitio web para ver los cambios

