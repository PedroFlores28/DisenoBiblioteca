# Comparación: Archivo Estático vs MongoDB

## Para tu caso específico: **ARCHIVO ESTÁTICO ES MEJOR** ✅

### ¿Por qué?

1. **Ya tienes el archivo creado** (`careersData.js`)
2. **115 carreras es un volumen pequeño** - no necesitas una base de datos
3. **Los datos cambian raramente** - cuando cambian, puedes regenerar el archivo
4. **Es más rápido** - los datos están en el bundle, sin esperar HTTP
5. **Menos complejidad** - no necesitas mantener un backend

### ¿Cuándo SÍ usarías MongoDB?

Solo si:
- ✋ Los datos cambian varias veces al día
- ✋ Necesitas que usuarios/admin actualicen desde una interfaz
- ✋ Tienes millones de registros
- ✋ Necesitas búsquedas muy complejas en tiempo real

### Implementación con Archivo Estático (Actual)

```javascript
// ✅ SIMPLE - Solo 2 líneas
import { careersData, getCareersBySchool } from '../../data/careersData'

data() {
  return {
    careers: careersData // Listo para usar
  }
}

computed: {
  filteredCareers() {
    return getCareersBySchool(this.selectedSchool) // Filtrado fácil
  }
}
```

### Si usaras MongoDB (Más Complejo)

Necesitarías:

1. **Backend API** (Express.js):
```javascript
// server.js
const express = require('express')
const { MongoClient } = require('mongodb')
const app = express()

app.get('/api/careers', async (req, res) => {
  const client = await MongoClient.connect(MONGODB_URI)
  const db = client.db(DB_NAME)
  const careers = await db.collection('carreras').find({}).toArray()
  res.json(careers)
  client.close()
})
```

2. **Frontend Vue**:
```javascript
// En BibliografiaSection.vue
async mounted() {
  try {
    const response = await axios.get('/api/careers')
    this.careers = response.data
  } catch (error) {
    console.error('Error cargando carreras:', error)
  }
}
```

3. **Configuración adicional**:
- Servidor corriendo siempre
- Variables de entorno para MongoDB
- Manejo de errores de conexión
- Loading states
- Caching

## Conclusión

**Para las cards de carreras: USA EL ARCHIVO ESTÁTICO** ✅

Es más fácil, más rápido y suficiente para tus necesidades actuales.

MongoDB es útil como herramienta de respaldo o si en el futuro necesitas un panel de administración dinámico, pero para mostrar las cards, el archivo estático es la mejor opción.

