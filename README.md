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
- Strapi CMS ejecutándose (por defecto en `http://localhost:1337`)

## 🛠️ Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
Crea un archivo `.env` en la raíz del proyecto (ya existe `.env.example`):
```
VUE_APP_STRAPI_URL=http://localhost:1337
```

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

Si no puedes conectarte a Strapi:
1. Verifica que Strapi esté ejecutándose
2. Revisa la URL en `.env`
3. Asegúrate de que las colecciones estén creadas y publicadas en Strapi
4. El proyecto cargará datos de ejemplo si no puede conectarse

## 📄 Licencia

Este proyecto es para uso interno de AIEP.



