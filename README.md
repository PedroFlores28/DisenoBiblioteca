# AIEP Bibliotecas - Proyecto Vue.js con Strapi

Proyecto Vue CLI para el sitio web de Bibliotecas AIEP, conectado a un CMS Strapi.

## 🚀 Características

- **Vue 3** con Composition API
- **Vue CLI** para desarrollo y build
- **Conexión a Strapi CMS** para gestión de contenido
- **Diseño responsive** y moderno
- **Página única con múltiples secciones**:
  - Header con navegación
  - Hero section con búsqueda de libros
  - Bibliografía por escuela
  - Encuentra tu biblioteca
  - Novedades literarias
  - Sitios recomendados
  - Preguntas frecuentes
  - Footer

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Acceso al servidor Strapi en AWS (configurado en `http://68.211.112.39:1337`)

## 🛠️ Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:

**Para desarrollo:**
Crea un archivo `.env.local` en la raíz del proyecto:
```
VUE_APP_STRAPI_URL=http://68.211.112.39:1337
```

**Para producción:**
Crea un archivo `.env.production` en la raíz del proyecto:
```
# IMPORTANTE: Si tu aplicación está en HTTPS, Strapi también debe estar en HTTPS
# Opción 1: Si Strapi tiene HTTPS configurado
VUE_APP_STRAPI_URL_PROD=https://68.211.112.39:1337

# Opción 2: Si Strapi solo tiene HTTP, necesitarás configurar HTTPS o usar un proxy reverso
# VUE_APP_STRAPI_URL_PROD=http://68.211.112.39:1337
```

**Nota:** El archivo `.env.local` ya está creado para desarrollo. En producción, asegúrate de usar HTTPS para evitar errores de "Mixed Content".

## 🏃 Ejecutar el Proyecto

### Desarrollo
```bash
npm run serve
```
El proyecto estará disponible en `http://localhost:8080`

### Producción
```bash
npm run build
```

## 📁 Estructura del Proyecto

```
DisenoBiblioteca/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/         # Componentes Vue
│   │   └── sections/       # Secciones de la página
│   ├── services/           # Servicios (API, Strapi)
│   ├── styles/             # Estilos globales
│   ├── views/              # Vistas
│   ├── App.vue             # Componente principal
│   └── main.js             # Punto de entrada
├── .env                    # Variables de entorno
├── package.json            # Dependencias
└── vue.config.js          # Configuración de Vue CLI
```

## 🔌 Configuración de Strapi

El proyecto espera las siguientes colecciones en Strapi:

- **escuelas**: Escuelas académicas
- **bibliotecas**: Información de bibliotecas
- **libros**: Catálogo de libros
- **sitios-recomendados**: Sitios web recomendados
- **preguntas-frecuentes**: Preguntas frecuentes

### Ejemplo de estructura en Strapi:

**Escuelas:**
- `name` (Text)
- `color` (Text) - para el color del acento

**Bibliotecas:**
- `name` (Text)
- `address` (Text)
- `email` (Email)
- `phone` (Text)
- `region` (Enumeration: norte, centro, metropolitana, sur)
- `hours` (JSON)

**Libros:**
- `title` (Text)
- `author` (Text)
- `isbn` (Text)
- `description` (Text)
- `novedad` (Boolean)

## 🎨 Personalización

Los colores principales están definidos en `src/styles/main.css` como variables CSS:
- `--primary-blue`: Azul principal
- `--secondary-blue`: Azul secundario
- `--accent-red`: Rojo de acento
- `--background-light`: Fondo claro

## 📝 Notas

- El proyecto incluye datos de ejemplo que se cargan si Strapi no está disponible
- Todas las secciones están en una sola página (`HomePage.vue`)
- Los componentes están organizados en `components/sections/`
- El servicio de Strapi está en `services/strapi.js`

## 🐛 Solución de Problemas

### Error "Mixed Content" en Producción
Si recibes el error "Mixed Content: The page was loaded over HTTPS, but requested an insecure XMLHttpRequest endpoint", significa que tu aplicación está en HTTPS pero intenta conectarse a Strapi en HTTP.

**Soluciones:**

1. **Configurar HTTPS en Strapi (Recomendado):**
   - 📖 **Guía completa:** Ver `CONFIGURAR_HTTPS.md` para instrucciones detalladas paso a paso
   - Configura un certificado SSL en tu servidor Strapi (Let's Encrypt recomendado)
   - Configura Nginx como proxy reverso
   - Actualiza `.env.production` con la URL HTTPS: `VUE_APP_STRAPI_URL_PROD=https://tu-dominio.com`

2. **Usar un Proxy Reverso:**
   - Configura Nginx o Apache como proxy reverso con HTTPS
   - El proxy maneja HTTPS y se comunica con Strapi en HTTP internamente

3. **Variables de Entorno:**
   - Asegúrate de tener `.env.production` con la URL correcta (HTTPS si la app está en HTTPS)

### Error 403 (Forbidden)
Si recibes un error 403, significa que la colección no tiene permisos públicos configurados en Strapi.

**Solución:**
1. Accede al panel de administración de Strapi: `http://68.211.112.39:1337/admin`
2. Ve a **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
3. Busca la colección que necesitas (ej: `preguntas-frecuentes`)
4. Marca las casillas:
   - ✅ **find** (para obtener listas)
   - ✅ **findOne** (para obtener un item específico)
5. Haz clic en **Save** (guardar)
6. Repite este proceso para todas las colecciones que uses:
   - `preguntas-frecuentes`
   - `libros`
   - `bibliotecas`
   - `escuelas`
   - `sitios-recomendados`

### Otros problemas comunes

Si no puedes conectarte a Strapi:
1. Verifica que el servidor Strapi en AWS esté disponible en `http://68.211.112.39:1337`
2. Revisa la URL en `.env.local` (debe ser `http://68.211.112.39:1337`)
3. Asegúrate de que las colecciones estén creadas y publicadas en Strapi
4. Verifica que el servidor de AWS permita conexiones desde tu IP (configuración de seguridad)
5. El proyecto cargará datos de ejemplo si no puede conectarse a Strapi
6. Revisa la consola del navegador para ver mensajes de error detallados

### Herramientas de Debug

En modo desarrollo, puedes usar en la consola del navegador:
```javascript
// Probar conexión con una colección
testStrapi("preguntas-frecuentes")

// Acceso directo al servicio
strapiService.getCollection("preguntas-frecuentes")
```

## 📄 Licencia

Este proyecto es para uso interno de AIEP.



