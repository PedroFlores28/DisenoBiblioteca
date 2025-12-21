# Instrucciones para Importar CSV a MongoDB

## Paso 1: Verificar que MongoDB está corriendo

Antes de ejecutar el script, asegúrate de que MongoDB esté corriendo en tu máquina:

```bash
# Verificar si MongoDB está corriendo
mongosh --eval "db.adminCommand('ping')"
```

O simplemente verifica que el proceso esté activo:
```bash
ps aux | grep mongod
```

Si MongoDB no está corriendo, inícialo:
```bash
# En macOS con Homebrew
brew services start mongodb-community

# O directamente
mongod
```

## Paso 2: Instalar dependencias

```bash
npm install mongodb csv-parser
```

## Paso 3: Ejecutar el script de importación

```bash
npm run import:mongodb
```

O directamente:
```bash
node scripts/import-csv-to-mongodb.js
```

## Configuración

El script está configurado con estos valores por defecto:
- **MongoDB URI**: `mongodb://localhost:27017`
- **Base de datos**: `biblioteca`
- **Colección**: `carreras`

No necesitas configurar nada adicional, solo asegúrate de que MongoDB esté corriendo.

## Qué hace el script

1. ✅ Conecta a MongoDB en localhost:27017
2. ✅ Crea/usa la base de datos `biblioteca`
3. ✅ Crea/limpia la colección `carreras`
4. ✅ Lee el CSV y procesa las 115 carreras
5. ✅ Inserta todas las carreras con sus URLs e imágenes
6. ✅ Crea índices para optimizar búsquedas
7. ✅ Muestra estadísticas de la importación

## Verificar los datos en MongoDB

Una vez importado, puedes verificar los datos:

```bash
# Conectar a MongoDB
mongosh

# Usar la base de datos
use biblioteca

# Ver todas las carreras
db.carreras.find().pretty()

# Contar carreras
db.carreras.countDocuments()

# Ver carreras de una escuela específica
db.carreras.find({ school: "administracion" })

# Estadísticas por escuela
db.carreras.aggregate([
  { $group: { _id: "$school", count: { $sum: 1 } } },
  { $sort: { _id: 1 } }
])
```

## Estructura de los documentos

Cada documento en la colección `carreras` tiene esta estructura:

```javascript
{
  _id: ObjectId("..."),
  name: "AUDITORÍA",
  school: "administracion",
  schoolName: "Administración y Gestión Empresarial",
  url: "https://bibliotecas.aiep.cl/client/...",
  imageUrl: "https://ik.imagekit.io/...",
  createdAt: ISODate("2024-01-01T00:00:00.000Z"),
  updatedAt: ISODate("2024-01-01T00:00:00.000Z")
}
```

## Solución de problemas

### Error: "Cannot connect to MongoDB"
- Verifica que MongoDB esté corriendo: `mongosh --eval "db.adminCommand('ping')"`
- Verifica la URI: debe ser `mongodb://localhost:27017`

### Error: "Cannot find module"
- Ejecuta: `npm install mongodb csv-parser`

### Error: "File not found"
- Verifica que el archivo CSV esté en la raíz del proyecto:
  `Contenido_nuevo_portal_bibliotecas_aiep(bibliografia_escuelas).csv`

