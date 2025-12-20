# Estructura de URL de Búsqueda - Catálogo Bibliotecas AIEP

## URL Base
```
https://bibliotecas.aiep.cl
```

## Estructura Completa de Búsqueda

### Formato General
```
https://bibliotecas.aiep.cl/client/{idioma}/{config}/search/results?qu={termino}&te={tipo}
```

### Ejemplo Real
```
https://bibliotecas.aiep.cl/client/en_US/default/search/results?qu=diseno&te=
```

## Desglose de Componentes

### 1. Path Base
```
/client/en_US/default
```

- `/client` - Identificador del cliente del sistema de catálogo
- `/en_US` - Código de idioma
  - `en_US` = Inglés (Estados Unidos)
  - `es_ES` = Español (España) 
  - `es_CL` = Español (Chile) - posible variante
- `/default` - Configuración por defecto del catálogo

### 2. Endpoint de Búsqueda
```
/search/results
```
- Endpoint que muestra los resultados de búsqueda

### 3. Parámetros de Consulta (Query Parameters)

#### `qu` (query/query term)
- **Descripción:** Término de búsqueda
- **Ejemplo:** `qu=diseno`
- **Codificación:** Debe estar codificado con `encodeURIComponent()`
- **Requerido:** Sí (aunque puede estar vacío)

#### `te` (target/type)
- **Descripción:** Tipo de búsqueda o campo objetivo
- **Ejemplo:** `te=` (vacío = buscar en todos los campos)
- **Valores posibles:**
  - Vacío (`te=`) = Buscar en todos los campos
  - `te=title` = Buscar solo en títulos
  - `te=author` = Buscar solo en autores
  - `te=subject` = Buscar solo en materias/asignaturas
  - `te=isbn` = Buscar por ISBN
  - Otros valores según el sistema

## Ejemplos de URLs

### Búsqueda Simple (Todos los campos)
```
https://bibliotecas.aiep.cl/client/en_US/default/search/results?qu=diseno&te=
```

### Búsqueda por Título
```
https://bibliotecas.aiep.cl/client/en_US/default/search/results?qu=teoria+del+color&te=title
```

### Búsqueda por Autor
```
https://bibliotecas.aiep.cl/client/en_US/default/search/results?qu=joseff+albers&te=author
```

### Búsqueda por Asignatura
```
https://bibliotecas.aiep.cl/client/en_US/default/search/results?qu=DGR101&te=subject
```

### Búsqueda por ISBN
```
https://bibliotecas.aiep.cl/client/en_US/default/search/results?qu=9788425221361&te=isbn
```

## Implementación en Vue.js

### Función de Búsqueda
```javascript
handleSearch() {
  const searchTerm = this.searchQuery.trim()
  const baseUrl = 'https://bibliotecas.aiep.cl/client/en_US/default'
  
  if (!searchTerm) {
    window.location.href = baseUrl
    return
  }
  
  const encodedTerm = encodeURIComponent(searchTerm)
  const searchType = this.searchFilter || ''
  
  let searchUrl = `${baseUrl}/search/results?qu=${encodedTerm}`
  
  if (searchType) {
    searchUrl += `&te=${encodeURIComponent(searchType)}`
  } else {
    searchUrl += `&te=`
  }
  
  window.location.href = searchUrl
}
```

### Mapeo de Filtros
```javascript
// Mapeo de filtros del formulario a códigos del sistema
const filterMap = {
  'titulo': 'title',
  'autor': 'author',
  'asignatura': 'subject',
  'carrera': 'subject', // Puede variar
  'isbn': 'isbn'
}
```

## Notas Importantes

1. **Codificación URL:** Siempre usar `encodeURIComponent()` para los términos de búsqueda
2. **Espacios:** Se convierten en `+` o `%20` al codificar
3. **Caracteres especiales:** Se codifican automáticamente (ñ, acentos, etc.)
4. **Parámetro `te`:** Si está vacío, busca en todos los campos del catálogo
5. **Idioma:** El código `en_US` puede cambiarse según el idioma del catálogo

## Sistema de Catálogo

Basado en la información del sitio, parece ser un sistema **SirsiDynix** (mencionado en el copyright: "Sirsi Corporation - Portfolio Version 5.2.1.6").

Este tipo de sistemas suelen tener:
- Búsqueda avanzada con múltiples campos
- Filtros por tipo de material (libros, ebooks, revistas, etc.)
- Filtros por colección
- Filtros por asignatura/carrera
- Ordenamiento de resultados

## Referencias

- URL del catálogo: https://bibliotecas.aiep.cl
- Sistema: SirsiDynix Portfolio
- Versión: 5.2.1.6

