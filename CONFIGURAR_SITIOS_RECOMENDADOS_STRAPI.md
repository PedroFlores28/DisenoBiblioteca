# Configurar Sitios Recomendados desde Strapi

Esta guía explica cómo configurar los sitios recomendados para que sean administrables desde Strapi.

## 📋 Requisitos Previos

- Acceso al panel de administración de Strapi: `https://cmsbiblioteca.aiep.cl/admin`
- Permisos de administrador en Strapi

## 🚀 Pasos para Configurar

### 1. Crear o Verificar el Tipo de Contenido "Sitios Recomendados"

1. Ve al panel de administración de Strapi: `https://cmsbiblioteca.aiep.cl/admin`
2. En el menú lateral izquierdo, haz clic en **Content-Type Builder**
3. Busca si existe el tipo de contenido **Sitios-recomendados**
4. Si no existe, haz clic en **Create new collection type**
5. Nombre del tipo de contenido: `Sitios Recomendados` (o cualquier nombre)
6. **IMPORTANTE**: El **API ID** debe ser `sitios-recomendados` (con guión, en minúsculas, plural)
7. Haz clic en **Continue**

### 2. Agregar Campos al Tipo de Contenido

Agrega los siguientes campos:

#### Campo 1: Nombre (Título)
- **Nombre del campo**: `name`
- **Tipo**: `Text` (Short text)
- **Configuración**: 
  - Marca "Required field" (obligatorio)
  - Este será el título que aparece en la tarjeta

#### Campo 2: URL (Link de Redirección)
- **Nombre del campo**: `url`
- **Tipo**: `Text` (Short text) o `URL`
- **Configuración**: 
  - Marca "Required field" (obligatorio)
  - Este será el link al que redirige el botón "Ir al sitio"

#### Campo 3: Descripción
- **Nombre del campo**: `description`
- **Tipo**: `Text` (Long text)
- **Configuración**: 
  - Opcional, pero recomendado
  - Este será el texto descriptivo que aparece debajo del título

#### Campo 4: Tipo de Ícono
- **Nombre del campo**: `iconType`
- **Tipo**: `Enumeration` (recomendado) o `Text`
- **Configuración**: 
  - Si usas Enumeration, agrega estos valores:
    - `book`
    - `document`
    - `people`
    - `normas`
    - `diario-oficial`
    - `thomson-reuters`
    - `eni`
    - `oit`
  - Si usas Text, el usuario puede escribir el tipo de ícono directamente

#### Campo 5: Orden (Opcional pero Recomendado)
- **Nombre del campo**: `orden`
- **Tipo**: `Number` (Integer)
- **Configuración**: 
  - Opcional
  - Se usa para ordenar los sitios (menor número = aparece primero)
  - Si no se especifica, se ordenan por fecha de creación

### 3. Guardar el Tipo de Contenido

1. Haz clic en **Save** en la parte superior derecha
2. Espera a que Strapi reinicie el servidor (esto puede tomar unos segundos)

### 4. Configurar Permisos Públicos

Para que el frontend pueda acceder a los datos:

1. Ve a **Settings** → **Users & Permissions Plugin** → **Roles** → **Public**
2. Busca la sección **Sitios-recomendados** (o el nombre que le diste)
3. Marca las siguientes casillas:
   - ✅ **find** (permitir buscar/listar)
   - ✅ **findOne** (permitir obtener un elemento específico)
4. Haz clic en **Save**

### 5. Crear Entradas de Sitios Recomendados

1. Ve a **Content Manager** en el menú lateral
2. Selecciona **Sitios-recomendados** (o el nombre que le diste)
3. Haz clic en **Create new entry**
4. Completa los campos:
   - **Name**: Título del sitio (ej: "Revistas Académicas (Proquest)")
   - **URL**: URL completa del sitio (ej: "https://www.ejemplo.com")
   - **Description**: Descripción del sitio (ej: "Accede a una amplia colección de revistas académicas")
   - **Icon Type**: Tipo de ícono (ej: "book", "document", etc.)
   - **Orden**: Número para ordenar (ej: 1, 2, 3...)
5. Haz clic en **Save**
6. Haz clic en **Publish** para publicar la entrada
7. Repite este proceso para cada sitio recomendado

## 📝 Tipos de Íconos Disponibles

El componente soporta los siguientes tipos de íconos:

- `book` - Libro abierto
- `document` - Documento con lápiz
- `people` - Personas/Grupo
- `normas` - Normas técnicas
- `diario-oficial` - Diario oficial
- `thomson-reuters` - Biblioteca Thomson-Reuters
- `eni` - Biblioteca ENI
- `oit` - Enciclopedia OIT

Si usas un tipo de ícono que no existe, se mostrará un ícono por defecto.

## 📋 Estructura de Datos Esperada

El código espera la siguiente estructura:

```json
{
  "id": 1,
  "name": "Revistas Académicas (Proquest)",
  "url": "https://www.ejemplo.com",
  "description": "Descripción del sitio",
  "iconType": "book",
  "orden": 1
}
```

## 🔍 Verificar que Funciona

1. Abre la consola del navegador (F12)
2. Recarga la página
3. Deberías ver mensajes como:
   - `✅ Sitios recomendados cargados desde Strapi`
4. Verifica que los sitios aparezcan en la sección "Sitios recomendados para tus estudios"

Si ves mensajes de error, verifica:
- Que el API ID del tipo de contenido sea `sitios-recomendados`
- Que los permisos públicos estén configurados correctamente
- Que las entradas estén publicadas (no solo guardadas)

## 🎨 Recomendaciones

- **Cantidad de sitios**: Se recomienda tener entre 4 y 8 sitios para un diseño equilibrado
- **Orden**: Usa el campo `orden` para controlar el orden de aparición
- **Descripciones**: Mantén las descripciones breves (1-2 líneas)
- **URLs**: Asegúrate de que las URLs sean válidas y accesibles

## 🔄 Actualizar Sitios Recomendados

Para cambiar los sitios en el futuro:

1. Ve a **Content Manager** → **Sitios-recomendados**
2. Edita la entrada existente o crea una nueva
3. Modifica los campos según sea necesario
4. Guarda y publica los cambios
5. Recarga la página del sitio web para ver los cambios

## 📊 Datos de Ejemplo

Si necesitas crear los 8 sitios recomendados iniciales, aquí están los datos:

1. **Revistas Académicas (Proquest)**
   - URL: `https://itmsp.museknowledge.com/MuseSessionID=0910qnxid/MuseProtocol=https/MuseHost=www.proquest.com/MusePath/index?parentSessionId=Qru4aIKBNrLQJ%2FvHVgOHse7XO26dC1QXWOcVe1ik2RQ%3D&accountid=163619`
   - Descripción: `Accede a una amplia colección de revistas académicas y recursos de investigación.`
   - Icon Type: `book`
   - Orden: `1`

2. **Portal de Revistas Académicas Chilenas**
   - URL: `https://revistaschilenas.uchile.cl/`
   - Descripción: `Biblioteca digital de revistas académicas publicadas en Chile.`
   - Icon Type: `document`
   - Orden: `2`

3. **Biblioteca del Congreso**
   - URL: `https://www.leychile.cl/Consulta/homebasico`
   - Descripción: `Consulta la legislación chilena y documentos oficiales del Congreso.`
   - Icon Type: `people`
   - Orden: `3`

4. **Normas Chilenas**
   - URL: `https://www.inncoleccion.cl/colecao.aspx`
   - Descripción: `Accede a las normas técnicas chilenas y estándares nacionales.`
   - Icon Type: `normas`
   - Orden: `4`

5. **Diario Oficial de la República**
   - URL: `http://www.diariooficial.interior.gob.cl/`
   - Descripción: `Consulta las publicaciones oficiales y decretos del gobierno.`
   - Icon Type: `diario-oficial`
   - Orden: `5`

6. **Biblioteca Thomson-Reuters**
   - URL: `https://09115nxig-y-https-next--proview-thomsonreuters-com.itmsp.museknowledge.com/library`
   - Descripción: `Recursos especializados en derecho y ciencias jurídicas.`
   - Icon Type: `thomson-reuters`
   - Orden: `6`

7. **Biblioteca ENI**
   - URL: `https://0910cnxik-y-https-www-eni--training-com.itmsp.museknowledge.com/instant-Connection/Default.aspx`
   - Descripción: `Materiales de formación y capacitación profesional.`
   - Icon Type: `eni`
   - Orden: `7`

8. **Enciclopedia OIT**
   - URL: `http://www.insht.es/portal/site/Insht/menuitem.1f1a3bc79ab34c578c2e8884060961ca/?vgnextoid=a981ceffc39a5110VgnVCM100000dc0ca8c0RCRD&vgnextchannel=9f164a7f8a651110VgnVCM100000dc0ca8c0RCRD`
   - Descripción: `Recursos sobre seguridad y salud en el trabajo de la OIT.`
   - Icon Type: `oit`
   - Orden: `8`

## 🆘 Notas Importantes

- **API ID**: Debe ser exactamente `sitios-recomendados` (con guión, en minúsculas, plural)
- **Fallback**: Si Strapi no está disponible o no hay datos, el componente usará los datos de ejemplo hardcodeados
- **Orden**: Los sitios se ordenan por el campo `orden` de forma ascendente
- **Publicación**: Asegúrate de publicar las entradas, no solo guardarlas como borrador

