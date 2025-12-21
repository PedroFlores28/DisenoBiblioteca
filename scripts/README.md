# Scripts de Importación

## Importar CSV a MongoDB

Este script importa los datos del CSV de carreras a MongoDB.

### Instalación de dependencias

```bash
npm install
```

### Configuración

Puedes configurar la conexión a MongoDB usando variables de entorno o editar el script directamente:

**Variables de entorno (opcional - los valores por defecto ya están configurados):**
```bash
export MONGODB_URI="mongodb://localhost:27017"  # Por defecto ya está configurado
export DB_NAME="biblioteca"                      # Por defecto ya está configurado
export COLLECTION_NAME="carreras"                # Por defecto ya está configurado
```

**Configuración por defecto:**
- URI: `mongodb://localhost:27017`
- Base de datos: `biblioteca`
- Colección: `carreras`

O para MongoDB Atlas (cloud):
```bash
export MONGODB_URI="mongodb+srv://usuario:password@cluster.mongodb.net/?retryWrites=true&w=majority"
export DB_NAME="bibliotecas_aiep"
export COLLECTION_NAME="carreras"
```

### Ejecución

```bash
npm run import:mongodb
```

O directamente:
```bash
node scripts/import-csv-to-mongodb.js
```

### Qué hace el script

1. Conecta a MongoDB usando la URI configurada
2. Lee el archivo CSV: `Contenido_nuevo_portal_bibliotecas_aiep(bibliografia_escuelas).csv`
3. Procesa cada fila del CSV
4. Mapea las escuelas a los valores usados en la aplicación
5. Inserta los datos en la colección `carreras`
6. Crea índices para mejorar el rendimiento de las consultas
7. Muestra estadísticas de la importación

### Estructura de los documentos en MongoDB

Cada documento tiene la siguiente estructura:

```javascript
{
  name: "AUDITORÍA",
  school: "administracion",
  schoolName: "Administración y Gestión Empresarial",
  url: "https://bibliotecas.aiep.cl/client/...",
  imageUrl: "https://ik.imagekit.io/...",
  createdAt: ISODate("2024-01-01T00:00:00.000Z"),
  updatedAt: ISODate("2024-01-01T00:00:00.000Z")
}
```

### Notas

- El script elimina todos los documentos existentes en la colección antes de importar (limpia la colección)
- Si quieres mantener datos existentes, comenta la línea que hace `deleteMany({})`
- Las carreras sin imagen válida tendrán `imageUrl: null`
- Se crean índices en los campos `school`, `name`, y `school+name` para optimizar búsquedas

### Ejemplos de consultas en MongoDB

Una vez importados los datos, puedes hacer consultas como:

```javascript
// Obtener todas las carreras de una escuela
db.carreras.find({ school: "administracion" })

// Buscar una carrera por nombre
db.carreras.find({ name: /AUDITORÍA/i })

// Contar carreras por escuela
db.carreras.aggregate([
  { $group: { _id: "$school", count: { $sum: 1 } } }
])
```

