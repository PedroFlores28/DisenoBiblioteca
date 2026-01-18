# Configurar Novedades Literarias desde Strapi

Esta guía explica cómo configurar las novedades literarias para que sean administrables desde Strapi.

## 📋 Requisitos Previos

- Acceso al panel de administración de Strapi: `https://cmsbiblioteca.aiep.cl/admin`
- Permisos de administrador en Strapi

## 🚀 Pasos para Configurar

### 1. Crear o Verificar el Tipo de Contenido "Libros"

1. Ve al panel de administración de Strapi: `https://cmsbiblioteca.aiep.cl/admin`
2. En el menú lateral izquierdo, haz clic en **Content-Type Builder**
3. Busca si existe el tipo de contenido **Libros**
4. Si no existe, haz clic en **Create new collection type**
5. Nombre del tipo de contenido: `Libros`
6. **IMPORTANTE**: El **API ID** debe ser `libros` (en minúsculas, plural)
7. Haz clic en **Continue**

### 2. Agregar Campos al Tipo de Contenido

Agrega los siguientes campos:

#### Campo 1: Autor
- **Nombre del campo**: `autor` (o `author`)
- **Tipo**: `Text` (Short text)
- **Configuración**: 
  - Marca "Required field" (obligatorio)
  - Ejemplo: "Eastman, Charles M."

#### Campo 2: Título
- **Nombre del campo**: `titulo` (o `title`)
- **Tipo**: `Text` (Short text)
- **Configuración**: 
  - Marca "Required field" (obligatorio)
  - Ejemplo: "BIM handbook : a guide to building information modeling"

#### Campo 3: ISBN
- **Nombre del campo**: `isbn`
- **Tipo**: `Text` (Short text)
- **Configuración**: 
  - Marca "Required field" (obligatorio)
  - Ejemplo: "9780470541371"

#### Campo 4: Descripción
- **Nombre del campo**: `descripcion` (o `description`)
- **Tipo**: `Text` (Long text)
- **Configuración**: 
  - Marca "Required field" (obligatorio)
  - Este será el texto descriptivo del libro

#### Campo 5: Portada (Imagen de la Cubierta)
- **Nombre del campo**: `portada` (o `cover`)
- **Tipo**: `Media` (Single media)
- **Configuración**: 
  - Tipos permitidos: Imágenes (jpg, png, webp)
  - Opcional, pero recomendado
  - Si no se proporciona, se mostrará un placeholder

#### Campo 6: Novedad (Marcar como Novedad Literaria)
- **Nombre del campo**: `novedad`
- **Tipo**: `Boolean`
- **Configuración**: 
  - **MUY IMPORTANTE**: Este campo determina si el libro aparece en "Novedades Literarias"
  - Valor por defecto: `false`
  - Marca como `true` para que aparezca en la sección

#### Campo 7: Orden (Opcional pero Recomendado)
- **Nombre del campo**: `orden`
- **Tipo**: `Number` (Integer)
- **Configuración**: 
  - Opcional
  - Se usa para ordenar los libros (menor número = aparece primero)
  - Si no se especifica, se ordenan por fecha de creación

### 3. Guardar el Tipo de Contenido

1. Haz clic en **Save** en la parte superior derecha
2. Espera a que Strapi reinicie el servidor (esto puede tomar unos segundos)

### 4. Configurar Permisos Públicos

Para que el frontend pueda acceder a los datos:

1. Ve a **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Busca la sección **Libros**
3. Marca las siguientes casillas:
   - ✅ **find** (permitir buscar/listar)
   - ✅ **findOne** (permitir obtener un elemento específico)
4. Haz clic en **Save**

### 5. Crear Entradas de Novedades Literarias

1. Ve a **Content Manager** en el menú lateral
2. Selecciona **Libros**
3. Haz clic en **Create new entry**
4. Completa los campos:
   - **Autor**: Nombre del autor (ej: "Eastman, Charles M.")
   - **Título**: Título del libro
   - **ISBN**: Código ISBN del libro
   - **Descripción**: Descripción breve del libro
   - **Portada**: Sube la imagen de la portada (recomendado: 300x400px o similar)
   - **Novedad**: ✅ **Marca como TRUE** para que aparezca en Novedades Literarias
   - **Orden**: Número para ordenar (ej: 1, 2, 3...)
5. Haz clic en **Save**
6. Haz clic en **Publish** para publicar la entrada
7. Repite este proceso para cada novedad literaria

## 📝 Estructura de Datos Esperada

El código espera la siguiente estructura:

```json
{
  "id": 1,
  "autor": "Eastman, Charles M.",
  "titulo": "BIM handbook : a guide to building information modeling",
  "isbn": "9780470541371",
  "descripcion": "The BIM Handbook presents the technology and processes behind BIM...",
  "portada": {
    "url": "https://ik.imagekit.io/5wps2tups/Biblioteca/bim%20handbook.jpg"
  },
  "novedad": true,
  "orden": 1
}
```

## 🔍 Verificar que Funciona

1. Abre la consola del navegador (F12)
2. Recarga la página
3. Deberías ver mensajes como:
   - `✅ Novedades literarias cargadas desde Strapi: X libros`
4. Verifica que los libros aparezcan en la sección "Novedades literarias"

Si ves mensajes de error, verifica:
- Que el API ID del tipo de contenido sea `libros`
- Que los permisos públicos estén configurados correctamente
- Que las entradas estén publicadas (no solo guardadas)
- Que el campo `novedad` esté marcado como `true`

## 🎨 Recomendaciones

### Cantidad de Libros
- Se recomienda tener entre 4 y 9 libros para un diseño equilibrado
- El carrusel mostrará 3.5 libros en desktop y 4 en modo "Libros por sede"
- En móvil se muestra 1 libro a la vez

### Imágenes de Portada
- **Tamaño recomendado**: 300x400px o 600x800px
- **Formato**: JPG, PNG o WebP
- **Peso**: Máximo 500KB por imagen
- **Relación de aspecto**: 3:4 (vertical)
- Si no se proporciona imagen, se mostrará un placeholder con gradiente

### Descripciones
- Mantén las descripciones breves (2-3 líneas)
- En desktop se muestran hasta 3 líneas
- En móvil se muestran hasta 2 líneas
- El texto se trunca automáticamente con "..."

### Orden de Aparición
- Usa el campo `orden` para controlar el orden de aparición
- Los libros se ordenan primero por `orden` (ascendente) y luego por fecha de creación (descendente)
- Ejemplo: orden 1, 2, 3, 4... aparecerán en ese orden

## 🔄 Actualizar Novedades Literarias

Para cambiar las novedades en el futuro:

### Agregar una Nueva Novedad
1. Ve a **Content Manager** → **Libros**
2. Crea una nueva entrada
3. Marca `novedad` como `true`
4. Asigna un número de orden
5. Guarda y publica

### Quitar un Libro de Novedades
1. Ve a **Content Manager** → **Libros**
2. Edita la entrada del libro
3. Cambia `novedad` a `false`
4. Guarda y publica

### Reordenar Novedades
1. Ve a **Content Manager** → **Libros**
2. Edita cada entrada
3. Cambia el campo `orden` según el orden deseado
4. Guarda y publica cada cambio

## 📊 Datos de Ejemplo

Si necesitas crear las novedades literarias iniciales, aquí están los datos de ejemplo:

### Libro 1: BIM Handbook
- **Autor**: `Eastman, Charles M.`
- **Título**: `BIM handbook : a guide to building information modeling for owners, managers, designers, engineers and contractors`
- **ISBN**: `9780470541371`
- **Descripción**: `The BIM Handbook presents the technology and processes behind BIM and how architects, engineers,`
- **Portada URL**: `https://ik.imagekit.io/5wps2tups/Biblioteca/bim%20handbook.jpg`
- **Novedad**: `true`
- **Orden**: `1`

### Libro 2: Python para Todos
- **Autor**: `Severance, Charles R`
- **Título**: `Python para todos : Explorando la información con Python 3`
- **ISBN**: `9798633985566`
- **Descripción**: `Python para todos está diseñado para introducir a los estudiantes en la programación y el desarrollo de software a través de un enfoque en la exploración de datos`
- **Portada URL**: `https://ik.imagekit.io/5wps2tups/Biblioteca/python%20para%20todos.jpg`
- **Novedad**: `true`
- **Orden**: `2`

### Libro 3: Excel 2019 Avanzado
- **Autor**: `Gallego Nieto, Mariano`
- **Título**: `Excel 2019 : Avanzado`
- **ISBN**: `9788418551178`
- **Descripción**: `El objetivo de este libro es que el lector maneje la aplicación de hoja de cálculo Microsoft Excel para realizar tareas avanzadas de manipulación de datos de distinto tipo, uso de funciones, fórmulas, macros, gráficos y un lenguaje de programación.`
- **Portada URL**: `https://ik.imagekit.io/5wps2tups/Biblioteca/excel%20avanzado.jpg`
- **Novedad**: `true`
- **Orden**: `3`

### Libro 4: Administración de Negocios Gastronómicos
- **Autor**: `Bonis, German de`
- **Título**: `Administración de negocios gastronómicos : el ABC de las operaciones de restaurantes y establecimientos de restauración`
- **ISBN**: `9789879468937`
- **Descripción**: `Análisis de fundamentos de gestión, planificación y control aplicados a organizaciones moderna`
- **Portada URL**: `https://ik.imagekit.io/5wps2tups/Biblioteca/admin%20de%20negocios%20gastro.jpg`
- **Novedad**: `true`
- **Orden**: `4`

## 🆘 Notas Importantes

- **API ID**: Debe ser exactamente `libros` (en minúsculas, plural)
- **Campo Novedad**: Es CRÍTICO marcar este campo como `true` para que aparezca en la sección
- **Fallback**: Si Strapi no está disponible o no hay datos, el componente usará los datos de ejemplo hardcodeados
- **Orden**: Los libros se ordenan por `orden` (ascendente) y luego por `createdAt` (descendente)
- **Publicación**: Asegúrate de publicar las entradas, no solo guardarlas como borrador
- **Imágenes**: Las imágenes se pueden subir directamente a Strapi o usar URLs externas

## 🔗 Campos Alternativos

El componente acepta nombres de campos en inglés o español:

- `autor` o `author`
- `titulo` o `title`
- `descripcion` o `description`
- `portada` o `cover`

Esto permite flexibilidad en la configuración de Strapi.

## 📱 Comportamiento Responsive

### Desktop (> 768px)
- Muestra 3.5 libros por vista (modo normal)
- Muestra 4 libros por vista (modo "Libros por sede")
- Navegación con flechas y dots
- Avanza de 1 en 1 libro

### Mobile (≤ 768px)
- Muestra 1 libro a la vez
- Scroll horizontal nativo
- Navegación con flechas
- Sin dots de navegación

## 🎯 Filtros y Consultas

El componente consulta a Strapi con los siguientes parámetros:

```javascript
{
  populate: '*',
  'filters[novedad][$eq]': true,
  sort: 'orden:asc,createdAt:desc'
}
```

Esto significa:
- Trae todos los campos relacionados (`populate: '*'`)
- Filtra solo los libros donde `novedad` es `true`
- Ordena por `orden` ascendente, luego por fecha de creación descendente
