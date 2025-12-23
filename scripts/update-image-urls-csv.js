const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')

// Configuración: ajusta estos valores según tu CSV
const CSV_FILE = path.join(__dirname, '../careers-images.csv') // Nombre de tu archivo CSV
const CAREERS_DATA_FILE = path.join(__dirname, '../src/data/careersData.js')

// Leer el CSV
console.log('Leyendo archivo CSV...')
const imageMap = {}

fs.createReadStream(CSV_FILE)
  .pipe(csv({ separator: ';' })) // Soporta punto y coma o coma automáticamente
  .on('data', (row) => {
    // Ajusta estos nombres de columnas según tu CSV
    const careerName = row['Nombre'] || row['Carrera'] || row['name'] || row[0]
    const imageUrl = row['URL'] || row['ImageUrl'] || row['imageUrl'] || row['URL Imagen'] || row[1]
    
    if (careerName && imageUrl) {
      imageMap[careerName.toString().trim()] = imageUrl.toString().trim()
    }
  })
  .on('end', () => {
    console.log(`Se encontraron ${Object.keys(imageMap).length} URLs de imágenes en el CSV`)
    updateCareersData()
  })
  .on('error', (error) => {
    console.error('Error al leer el CSV:', error.message)
    console.log('\n💡 Asegúrate de que:')
    console.log('   1. El archivo se llame "careers-images.csv" y esté en la raíz del proyecto')
    console.log('   2. El CSV tenga encabezados en la primera fila')
    console.log('   3. Tenga columnas: Nombre (o Carrera) y URL (o ImageUrl)')
    process.exit(1)
  })

function updateCareersData() {
  // Leer el archivo careersData.js
  console.log('Leyendo archivo careersData.js...')
  const careersDataContent = fs.readFileSync(CAREERS_DATA_FILE, 'utf8')

  // Extraer el array de careersData usando una expresión regular más robusta
  const regex = /\{\s*id:\s*(\d+),\s*name:\s*'([^']+)',\s*school:\s*'([^']+)',\s*url:\s*'([^']+)',\s*imageUrl:\s*'([^']*)'\s*\}/g
  
  let updatedContent = careersDataContent
  let match
  let updatedCount = 0
  let totalCareers = 0

  // Reemplazar cada carrera
  updatedContent = careersDataContent.replace(regex, (fullMatch, id, name, school, url, oldImageUrl) => {
    totalCareers++
    let newImageUrl = oldImageUrl
    
    // Buscar coincidencia exacta primero
    if (imageMap[name]) {
      newImageUrl = imageMap[name]
      updatedCount++
      console.log(`✓ Actualizando: ${name}`)
    } else {
      // Buscar coincidencia parcial (sin considerar mayúsculas/minúsculas)
      const foundKey = Object.keys(imageMap).find(key => 
        key.toUpperCase().trim() === name.toUpperCase().trim() ||
        key.toUpperCase().includes(name.toUpperCase()) ||
        name.toUpperCase().includes(key.toUpperCase())
      )
      
      if (foundKey) {
        newImageUrl = imageMap[foundKey]
        updatedCount++
        console.log(`✓ Actualizando (coincidencia parcial): ${name} <- ${foundKey}`)
      }
    }
    
    const imageUrlValue = newImageUrl ? `'${newImageUrl}'` : "''"
    return `{ id: ${id}, name: '${name}', school: '${school}', url: '${url}', imageUrl: ${imageUrlValue} }`
  })

  // Escribir el archivo actualizado
  fs.writeFileSync(CAREERS_DATA_FILE, updatedContent, 'utf8')

  console.log(`\n✅ ¡Actualización completada!`)
  console.log(`   - Total de carreras procesadas: ${totalCareers}`)
  console.log(`   - URLs actualizadas: ${updatedCount}`)
  console.log(`   - URLs sin cambios: ${totalCareers - updatedCount}`)
  console.log(`   - Archivo actualizado: ${CAREERS_DATA_FILE}`)
}
