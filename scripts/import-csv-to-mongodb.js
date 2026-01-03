const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')
const { MongoClient } = require('mongodb')

// Configuración de MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const DB_NAME = process.env.DB_NAME || 'biblioteca'
const COLLECTION_NAME = process.env.COLLECTION_NAME || 'carreras'

// Mapeo de escuelas del CSV a los valores usados en el componente
const schoolMap = {
  'Administración y Gestión Empresarial': 'administracion',
  'Arte & Industrias Creativas': 'artes',
  'Desarrollo Social & Educación': 'desarrollo',
  'Estética Integral': 'estetica',
  'Gastronomía, Hotelería y Turismo': 'gastronomia',
  'Ingenierías, Energías y Tecnologías': 'ingenieria',
  'Salud y Deportes': 'salud'
}

async function importCSVToMongoDB() {
  const csvPath = path.join(__dirname, '../Contenido_nuevo_portal_bibliotecas_aiep(bibliografia_escuelas).csv')
  const client = new MongoClient(MONGODB_URI)
  
  try {
    console.log('🔌 Conectando a MongoDB...')
    await client.connect()
    console.log('✅ Conectado a MongoDB')
    
    const db = client.db(DB_NAME)
    const collection = db.collection(COLLECTION_NAME)
    
    // Limpiar colección existente (opcional - comentar si quieres mantener datos existentes)
    console.log(`🗑️  Limpiando colección "${COLLECTION_NAME}"...`)
    await collection.deleteMany({})
    console.log('✅ Colección limpiada')
    
    const careers = []
    
    console.log('📖 Leyendo archivo CSV...')
    
    return new Promise((resolve, reject) => {
      // Leer CSV con encoding latin1 para manejar caracteres especiales
      fs.createReadStream(csvPath, { encoding: 'latin1' })
        .pipe(csv({ separator: ';' }))
        .on('data', (row) => {
          const escuela = row.Escuela?.trim()
          const nombreCarrera = row['Nombre Carrera']?.trim()
          const urlCarrera = row['URL Carrera']?.trim()
          const fotoUrl = row.FOTO_URL?.trim()
          
          // Saltar filas vacías, headers o sin datos válidos
          if (!escuela || !nombreCarrera || escuela === 'Escuela') {
            return
          }
          
          // Limpiar URLs e imágenes
          const urlClean = urlCarrera?.replace(/"/g, '').trim() || ''
          const fotoClean = fotoUrl?.replace(/"/g, '').trim() || ''
          
          // Solo agregar si tiene URL válida
          if (urlClean && urlClean.startsWith('http')) {
            const schoolKey = schoolMap[escuela]
            if (schoolKey) {
              careers.push({
                name: nombreCarrera,
                school: schoolKey,
                schoolName: escuela,
                url: urlClean,
                imageUrl: fotoClean && fotoClean.startsWith('http') ? fotoClean : null,
                createdAt: new Date(),
                updatedAt: new Date()
              })
            }
          }
        })
        .on('end', async () => {
          try {
            console.log(`📊 Procesadas ${careers.length} carreras`)
            
            if (careers.length === 0) {
              console.log('⚠️  No se encontraron carreras para importar')
              await client.close()
              resolve()
              return
            }
            
            console.log(`💾 Insertando ${careers.length} carreras en MongoDB...`)
            const result = await collection.insertMany(careers)
            console.log(`✅ ${result.insertedCount} carreras insertadas exitosamente`)
            
            // Crear índices para mejor rendimiento
            console.log('📇 Creando índices...')
            await collection.createIndex({ school: 1 })
            await collection.createIndex({ name: 1 })
            await collection.createIndex({ school: 1, name: 1 })
            console.log('✅ Índices creados')
            
            // Mostrar estadísticas
            const stats = await collection.aggregate([
              {
                $group: {
                  _id: '$school',
                  count: { $sum: 1 }
                }
              },
              {
                $sort: { _id: 1 }
              }
            ]).toArray()
            
            console.log('\n📊 Estadísticas por escuela:')
            stats.forEach(stat => {
              console.log(`   ${stat._id}: ${stat.count} carreras`)
            })
            
            console.log(`\n✅ Importación completada exitosamente!`)
            console.log(`📍 Base de datos: ${DB_NAME}`)
            console.log(`📍 Colección: ${COLLECTION_NAME}`)
            console.log(`📍 Total de documentos: ${careers.length}`)
            
            await client.close()
            resolve()
          } catch (error) {
            await client.close()
            reject(error)
          }
        })
        .on('error', async (error) => {
          console.error('❌ Error leyendo CSV:', error)
          await client.close()
          reject(error)
        })
    })
  } catch (error) {
    console.error('❌ Error:', error)
    await client.close()
    throw error
  }
}

// Ejecutar si se llama directamente
if (require.main === module) {
  importCSVToMongoDB()
    .then(() => {
      console.log('\n🎉 Proceso finalizado')
      process.exit(0)
    })
    .catch((error) => {
      console.error('\n❌ Error en el proceso:', error)
      process.exit(1)
    })
}

module.exports = { importCSVToMongoDB }
