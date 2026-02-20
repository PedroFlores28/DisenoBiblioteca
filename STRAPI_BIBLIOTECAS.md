# 📚 Guía: Content Type "Bibliotecas" en Strapi

Esta guía te explica cómo crear el Content Type `bibliotecas` en Strapi para administrar todas las bibliotecas AIEP desde el CMS.

---

## 1. Crear el Content Type en Strapi

1. Entra al panel de Strapi: **https://cmsbiblioteca.aiep.cl/admin**
2. En el menú izquierdo, ve a **"Content-Type Builder"**
3. Haz clic en **"+ Create new collection type"**
4. En **Display Name** escribe: `biblioteca`  
   Strapi creará automáticamente el plural `bibliotecas` como endpoint de la API.
5. Haz clic en **"Continue"**

---

## 2. Campos a crear

Agrega los siguientes campos uno por uno:

| Campo              | Tipo             | Nombre        | Notas |
|--------------------|------------------|---------------|-------|
| Nombre             | Text (Short)     | `nombre`      | Required |
| Dirección          | Text (Short)     | `direccion`   | Required |
| Email              | Email            | `email`       | |
| Teléfono           | Text (Short)     | `telefono`    | |
| Región             | Enumeration      | `region`      | Ver valores abajo |
| URL Mapa           | Text (Short)     | `url_mapa`    | Link de Google Maps |
| Horario semana     | Text (Short)     | `horario_semana`  | Ej: "Lunes a Viernes 08:30 a 21:30 horas" |
| Horario sábado     | Text (Short)     | `horario_sabado`  | Ej: "Sábados de 09:00 a 18:00 horas" |
| Ciudad             | Text (Short)     | `ciudad`      | Sirve para la búsqueda |
| Imagen             | Media (Single)   | `imagen`      | Foto de la biblioteca |
| Orden              | Number (Integer) | `orden`       | Para ordenar las tarjetas |

### Valores del campo `region` (Enumeration)
Copia exactamente estos valores (uno por línea en Strapi):
```
norte
centro-costa
metropolitana
sur
```

### Pasos para crear el campo Enumeration "region":
1. Clic en **"+ Add another field"**
2. Selecciona **"Enumeration"**
3. Name: `region`
4. En el campo de valores, agrega cada valor en una línea separada:
   - `norte`
   - `centro-costa`
   - `metropolitana`
   - `sur`
5. Guarda el campo

---

## 3. Guardar el Content Type

Una vez creados todos los campos, haz clic en **"Save"** (botón arriba a la derecha). Strapi reiniciará el servidor automáticamente.

---

## 4. Configurar los Permisos

Para que el frontend pueda leer los datos **sin autenticación**:

1. Ve a **Settings → Users & Permissions Plugin → Roles**
2. Haz clic en el rol **"Public"**
3. Busca **"Biblioteca"** en la lista de permisos
4. Activa los permisos:
   - ✅ `find` (listar todas)
   - ✅ `findOne` (ver una biblioteca)
5. Haz clic en **"Save"**

---

## 5. Cargar los datos de las Bibliotecas



El campo `orden` permite controlar en qué posición aparece cada biblioteca dentro de su región.  
- Número más bajo = aparece primero
- Ejemplo: Grajales → 1, Ejército → 2, Bellavista → 3, etc.

---

## 8. Verificar que funciona

Una vez configurado, puedes verificar la API en:
```
https://cmsbiblioteca.aiep.cl/api/bibliotecas?populate=*
```

Si ves un JSON con los datos de las bibliotecas, ¡está funcionando correctamente!

El frontend cargará automáticamente los datos de Strapi. Si Strapi no está disponible o no devuelve datos, el sitio usará los datos locales como respaldo.

---

## 9. Cómo editar una biblioteca en el futuro

1. Entra a **https://cmsbiblioteca.aiep.cl/admin**
2. Ve a **Content Manager → Biblioteca**
3. Haz clic en la biblioteca que quieres editar
4. Modifica los campos necesarios
5. Haz clic en **"Save"** y luego en **"Publish"**

Los cambios se reflejarán en el sitio inmediatamente (o dentro de los próximos minutos según el caché).
