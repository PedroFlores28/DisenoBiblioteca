const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')

// Configuración: ajusta estos valores según tu CSV
const CSV_FILE = 'c:\\Users\\flore\\Downloads\\Contenido_nuevo_portal_bibliotecas_aiep(sitios-recomendados OK).csv'
const SITIOS_SECTION_FILE = path.join(__dirname, '../src/components/sections/SitiosRecomendadosSection.vue')

// Leer el CSV con punto y coma como delimitador
console.log('Leyendo archivo CSV de sitios recomendados...')
const urlMap = {}

fs.createReadStream(CSV_FILE)
  .pipe(csv({ separator: ';' })) // Usar punto y coma como delimitador
  .on('data', (row) => {
    // El CSV tiene: Nombre;URL;Orden;Aprobado
    const siteName = row['Nombre']
    const siteUrl = row['URL']
    
    if (siteName && siteUrl) {
      urlMap[siteName.toString().trim()] = siteUrl.toString().trim()
    }
  })
  .on('end', () => {
    console.log(`Se encontraron ${Object.keys(urlMap).length} URLs en el CSV`)
    console.log('URLs encontradas:')
    Object.keys(urlMap).forEach(name => {
      console.log(`  - ${name}: ${urlMap[name]}`)
    })
    updateSitiosSection()
  })
  .on('error', (error) => {
    console.error('Error al leer el CSV:', error.message)
    console.log('\n💡 Asegúrate de que:')
    console.log('   1. El archivo se llame "Contenido_nuevo_portal_bibliotecas_aiep(sitios-recomendados OK).csv"')
    console.log('   2. El archivo esté en la carpeta Downloads')
    console.log('   3. El CSV use punto y coma (;) como delimitador')
    process.exit(1)
  })

function updateSitiosSection() {
  // Leer el archivo SitiosRecomendadosSection.vue
  console.log('\nLeyendo archivo SitiosRecomendadosSection.vue...')
  const content = fs.readFileSync(SITIOS_SECTION_FILE, 'utf8')

  // Buscar objetos de sitios en el array
  // Formato: { id: X, name: 'Nombre Sitio', url: '...', iconType: '...' }
  const regex = /\{\s*id:\s*(\d+),\s*name:\s*'([^']+)',\s*url:\s*'([^']*)',\s*iconType:\s*'([^']+)'\s*\}/g
  
  let updatedContent = content
  let updatedCount = 0
  let totalSites = 0

  // Reemplazar cada sitio, actualizando la URL si existe en el mapa
  updatedContent = content.replace(regex, (fullMatch, id, name, currentUrl, iconType) => {
    totalSites++
    let newMatch = fullMatch
    
    // Buscar coincidencia exacta primero
    if (urlMap[name]) {
      // Actualizar la URL
      newMatch = fullMatch.replace(
        /url:\s*'[^']*'/,
        `url: '${urlMap[name]}'`
      )
      updatedCount++
      console.log(`✓ Actualizando URL de: ${name}`)
      console.log(`  URL anterior: ${currentUrl}`)
      console.log(`  URL nueva: ${urlMap[name]}`)
    } else {
      // Buscar coincidencia parcial
      const foundKey = Object.keys(urlMap).find(key => {
        const keyUpper = key.toUpperCase().trim()
        const nameUpper = name.toUpperCase().trim()
        return keyUpper === nameUpper ||
               keyUpper.includes(nameUpper) ||
               nameUpper.includes(keyUpper)
      })
      
      if (foundKey) {
        newMatch = fullMatch.replace(
          /url:\s*'[^']*'/,
          `url: '${urlMap[foundKey]}'`
        )
        updatedCount++
        console.log(`✓ Actualizando URL (coincidencia parcial): ${name} <- ${foundKey}`)
        console.log(`  URL nueva: ${urlMap[foundKey]}`)
      } else {
        console.log(`⚠ No se encontró URL para: ${name}`)
      }
    }
    
    return newMatch
  })

  // Escribir el archivo actualizado
  fs.writeFileSync(SITIOS_SECTION_FILE, updatedContent, 'utf8')

  console.log(`\n✅ ¡Actualización completada!`)
  console.log(`   - Total de sitios procesados: ${totalSites}`)
  console.log(`   - URLs actualizadas: ${updatedCount}`)
  console.log(`   - Archivo actualizado: ${SITIOS_SECTION_FILE}`)
}
