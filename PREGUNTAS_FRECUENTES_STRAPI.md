# Preguntas Frecuentes para Strapi

Este documento contiene las preguntas frecuentes que están hardcodeadas en el código para que las puedas copiar a Strapi.

## 📋 Estructura en Strapi

El tipo de contenido debe tener los siguientes campos:
- **question** (Text - Long text o Rich text)
- **answer** (Text - Long text o Rich text)
- **orden** (Number) - Opcional, para ordenar las preguntas

## 📝 Preguntas Frecuentes

### 1. ¿Cómo puedo ver la bibliografía de mi carrera?

**Respuesta:**
Puedes acceder a la bibliografía de tu carrera desde la sección "Bibliografía por escuelas" en el menú principal. Allí encontrarás todos los recursos bibliográficos organizados por área de estudio.

**Orden:** 1

---

### 2. ¿Dónde puedo aprender a usar la biblioteca digital?

**Respuesta:**
Puedes acceder a los tutoriales y guías disponibles en la sección de ayuda del sitio web, donde encontrarás instrucciones detalladas sobre cómo utilizar todos los recursos digitales disponibles.

**Orden:** 2

---

### 3. ¿Qué diferencia hay entre libros físicos y digitales?

**Respuesta:**
Los libros físicos están disponibles para préstamo presencial en las sedes de la biblioteca, mientras que los libros digitales pueden ser consultados en línea desde cualquier lugar y en cualquier momento a través de tu cuenta.

**Orden:** 3

---

### 4. ¿Cómo entro a mi cuenta de biblioteca?

**Respuesta:**
Para acceder a tu cuenta de biblioteca, debes utilizar tus credenciales institucionales (usuario y contraseña) en el portal de estudiantes de AIEP.

**Orden:** 4

---

### 5. ¿Qué puedo hacer dentro del sitio de Bibliotecas AIEP?

**Respuesta:**
Dentro del sitio puedes consultar bibliografía por carrera, buscar bibliotecas por ubicación, acceder a servicios y recursos digitales, ver novedades, y encontrar respuestas a preguntas frecuentes sobre nuestros servicios.

**Orden:** 5

---

### 6. ¿Cómo sé si un libro está disponible en mi sede?

**Respuesta:**
Puedes consultar la disponibilidad de libros en la sección de búsqueda del catálogo, filtrando por tu sede específica. También puedes contactar directamente a tu biblioteca para verificar la disponibilidad.

**Orden:** 6

---

## 📥 Formato JSON para Importar

Si prefieres importar directamente, aquí está el formato JSON:

```json
[
  {
    "question": "¿Cómo puedo ver la bibliografía de mi carrera?",
    "answer": "Puedes acceder a la bibliografía de tu carrera desde la sección \"Bibliografía por escuelas\" en el menú principal. Allí encontrarás todos los recursos bibliográficos organizados por área de estudio.",
    "orden": 1
  },
  {
    "question": "¿Dónde puedo aprender a usar la biblioteca digital?",
    "answer": "Puedes acceder a los tutoriales y guías disponibles en la sección de ayuda del sitio web, donde encontrarás instrucciones detalladas sobre cómo utilizar todos los recursos digitales disponibles.",
    "orden": 2
  },
  {
    "question": "¿Qué diferencia hay entre libros físicos y digitales?",
    "answer": "Los libros físicos están disponibles para préstamo presencial en las sedes de la biblioteca, mientras que los libros digitales pueden ser consultados en línea desde cualquier lugar y en cualquier momento a través de tu cuenta.",
    "orden": 3
  },
  {
    "question": "¿Cómo entro a mi cuenta de biblioteca?",
    "answer": "Para acceder a tu cuenta de biblioteca, debes utilizar tus credenciales institucionales (usuario y contraseña) en el portal de estudiantes de AIEP.",
    "orden": 4
  },
  {
    "question": "¿Qué puedo hacer dentro del sitio de Bibliotecas AIEP?",
    "answer": "Dentro del sitio puedes consultar bibliografía por carrera, buscar bibliotecas por ubicación, acceder a servicios y recursos digitales, ver novedades, y encontrar respuestas a preguntas frecuentes sobre nuestros servicios.",
    "orden": 5
  },
  {
    "question": "¿Cómo sé si un libro está disponible en mi sede?",
    "answer": "Puedes consultar la disponibilidad de libros en la sección de búsqueda del catálogo, filtrando por tu sede específica. También puedes contactar directamente a tu biblioteca para verificar la disponibilidad.",
    "orden": 6
  }
]
```

## 🚀 Instrucciones para Agregar en Strapi

1. Ve a **Content Manager** → **Preguntas-frecuentes**
2. Para cada pregunta:
   - Haz clic en **Create new entry**
   - Copia la pregunta en el campo **question**
   - Copia la respuesta en el campo **answer**
   - Si tienes el campo **orden**, agrega el número correspondiente
   - Haz clic en **Save**
   - Haz clic en **Publish** para publicar la entrada
3. Repite para las 6 preguntas

## 📌 Notas

- El campo **orden** es opcional pero recomendado para controlar el orden de aparición
- El código ordena las preguntas por el campo `orden` de forma ascendente
- Si no hay campo `orden`, las preguntas se mostrarán en el orden en que fueron creadas
- Asegúrate de que todas las entradas estén **Publicadas** (no solo guardadas)

