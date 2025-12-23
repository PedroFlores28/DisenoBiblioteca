const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')

// Configuración: ajusta estos valores según tu CSV
const CSV_FILE = path.join(__dirname, '../bibliotecas.csv')
const BIBLIOTECAS_SECTION_FILE = path.join(__dirname, '../src/components/sections/BibliotecasSection.vue')

// Leer el CSV con punto y coma como delimitador
console.log('Leyendo archivo CSV de bibliotecas...')
const imageMap = {}

fs.createReadStream(CSV_FILE)
  .pipe(csv({ separator: ';' })) // Usar punto y coma como delimitador
  .on('data', (row) => {
    // El CSV tiene: Orden;Nombre;Region;Dirección;Correo Contacto;Horario Atencion;URL Foto;Teléfono;URL;Aprobado
    const libraryName = row['Nombre']
    const imageUrl = row['URL Foto']
    
    if (libraryName && imageUrl) {
      imageMap[libraryName.toString().trim()] = imageUrl.toString().trim()
    }
  })
  .on('end', () => {
    console.log(`Se encontraron ${Object.keys(imageMap).length} URLs de imágenes en el CSV`)
    updateBibliotecasSection()
  })
  .on('error', (error) => {
    console.error('Error al leer el CSV:', error.message)
    console.log('\n💡 Asegúrate de que:')
    console.log('   1. El archivo se llame "bibliotecas.csv" y esté en la raíz del proyecto')
    console.log('   2. El CSV use punto y coma (;) como delimitador')
    process.exit(1)
  })

function updateBibliotecasSection() {
  // Leer el archivo BibliotecasSection.vue
  console.log('Leyendo archivo BibliotecasSection.vue...')
  const content = fs.readFileSync(BIBLIOTECAS_SECTION_FILE, 'utf8')

  // Buscar objetos de bibliotecas en el array
  // Formato: { id: X, name: 'Nombre Biblioteca', address: '...', email: '...', phone: '...', region: '...', hours: {...} }
  const regex = /\{\s*id:\s*(\d+),\s*name:\s*'([^']+)',\s*address:\s*'([^']*)',\s*email:\s*'([^']*)',\s*phone:\s*'([^']*)',\s*region:\s*'([^']+)',\s*hours:\s*\{[^}]+\}\s*\}/g
  
  let updatedContent = content
  let updatedCount = 0
  let totalLibraries = 0

  // Reemplazar cada biblioteca, agregando imageUrl si existe en el mapa
  updatedContent = content.replace(regex, (fullMatch, id, name, address, email, phone, region, hoursStr) => {
    totalLibraries++
    let newMatch = fullMatch
    
    // Buscar coincidencia exacta primero
    if (imageMap[name]) {
      // Verificar si ya tiene imageUrl
      if (!fullMatch.includes('imageUrl:')) {
        // Insertar imageUrl antes de hours
        const imageUrlValue = `'${imageMap[name]}'`
        newMatch = fullMatch.replace(
          /region:\s*'([^']+)',\s*hours:/,
          `region: '${region}', imageUrl: ${imageUrlValue}, hours:`
        )
        updatedCount++
        console.log(`✓ Agregando imagen a: ${name}`)
      } else {
        // Actualizar imageUrl existente
        newMatch = fullMatch.replace(
          /imageUrl:\s*'[^']*'/,
          `imageUrl: '${imageMap[name]}'`
        )
        updatedCount++
        console.log(`✓ Actualizando imagen de: ${name}`)
      }
    } else {
      // Buscar coincidencia parcial
      const foundKey = Object.keys(imageMap).find(key => 
        key.toUpperCase().trim() === name.toUpperCase().trim() ||
        key.toUpperCase().includes(name.toUpperCase()) ||
        name.toUpperCase().includes(key.toUpperCase())
      )
      
      if (foundKey) {
        if (!fullMatch.includes('imageUrl:')) {
          const imageUrlValue = `'${imageMap[foundKey]}'`
          newMatch = fullMatch.replace(
            /region:\s*'([^']+)',\s*hours:/,
            `region: '${region}', imageUrl: ${imageUrlValue}, hours:`
          )
          updatedCount++
          console.log(`✓ Agregando imagen (coincidencia parcial): ${name} <- ${foundKey}`)
        } else {
          newMatch = fullMatch.replace(
            /imageUrl:\s*'[^']*'/,
            `imageUrl: '${imageMap[foundKey]}'`
          )
          updatedCount++
          console.log(`✓ Actualizando imagen (coincidencia parcial): ${name} <- ${foundKey}`)
        }
      }
    }
    
    return newMatch
  })

  // Escribir el archivo actualizado
  fs.writeFileSync(BIBLIOTECAS_SECTION_FILE, updatedContent, 'utf8')

  console.log(`\n✅ ¡Actualización completada!`)
  console.log(`   - Total de bibliotecas procesadas: ${totalLibraries}`)
  console.log(`   - URLs agregadas/actualizadas: ${updatedCount}`)
  console.log(`   - Archivo actualizado: ${BIBLIOTECAS_SECTION_FILE}`)
}
