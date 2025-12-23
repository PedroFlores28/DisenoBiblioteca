const fs = require('fs')
const path = require('path')
const XLSX = require('xlsx')

// Configuración: ajusta estos valores según tu Excel
const EXCEL_FILE = path.join(__dirname, '../careers-images.xlsx') // Cambia el nombre del archivo
const CAREERS_DATA_FILE = path.join(__dirname, '../src/data/careersData.js')
const SHEET_NAME = 'Sheet1' // Cambia si tu hoja tiene otro nombre
const COLUMN_NAME = 'A' // Columna con el nombre de la carrera
const COLUMN_IMAGE_URL = 'B' // Columna con la URL de la imagen

// Leer el archivo Excel
console.log('Leyendo archivo Excel...')
const workbook = XLSX.readFile(EXCEL_FILE)
const sheetName = workbook.SheetNames[0] || SHEET_NAME
const worksheet = workbook.Sheets[sheetName]

// Convertir a JSON
const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 })

// Crear un mapa de nombre de carrera -> URL de imagen
const imageMap = {}
for (let i = 1; i < data.length; i++) { // Saltar encabezado (fila 1)
  const row = data[i]
  const careerName = row[0] ? row[0].toString().trim() : null // Columna A (nombre)
  const imageUrl = row[1] ? row[1].toString().trim() : null // Columna B (URL)
  
  if (careerName && imageUrl) {
    imageMap[careerName] = imageUrl
  }
}

console.log(`Se encontraron ${Object.keys(imageMap).length} URLs de imágenes en el Excel`)

// Leer el archivo careersData.js
console.log('Leyendo archivo careersData.js...')
const careersDataContent = fs.readFileSync(CAREERS_DATA_FILE, 'utf8')

// Extraer el array de careersData
const careersDataMatch = careersDataContent.match(/export const careersData = \[([\s\S]*?)\]/)
if (!careersDataMatch) {
  console.error('No se pudo encontrar careersData en el archivo')
  process.exit(1)
}

// Parsear cada objeto de carrera
const careerObjects = []
const regex = /\{\s*id:\s*(\d+),\s*name:\s*'([^']+)',\s*school:\s*'([^']+)',\s*url:\s*'([^']+)',\s*imageUrl:\s*'([^']*)'\s*\}/g
let match
let updatedCount = 0

while ((match = regex.exec(careersDataMatch[1])) !== null) {
  const id = parseInt(match[1])
  const name = match[2]
  const school = match[3]
  const url = match[4]
  let imageUrl = match[5] || ''
  
  // Buscar la nueva URL en el mapa
  if (imageMap[name]) {
    imageUrl = imageMap[name]
    updatedCount++
    console.log(`Actualizando: ${name}`)
  }
  
  careerObjects.push({ id, name, school, url, imageUrl })
}

// Reconstruir el contenido del archivo
let newContent = 'export const careersData = [\n'
careerObjects.forEach((career, index) => {
  const imageUrlValue = career.imageUrl ? `'${career.imageUrl}'` : "''"
  newContent += `  { id: ${career.id}, name: '${career.name}', school: '${career.school}', url: '${career.url}', imageUrl: ${imageUrlValue} }`
  if (index < careerObjects.length - 1) {
    newContent += ','
  }
  newContent += '\n'
})
newContent += ']\n\n'

// Copiar las funciones exportadas originales
const restOfFile = careersDataContent.substring(careersDataMatch.index + careersDataMatch[0].length)
newContent += restOfFile

// Escribir el archivo actualizado
fs.writeFileSync(CAREERS_DATA_FILE, newContent, 'utf8')

console.log(`\n✅ ¡Actualización completada!`)
console.log(`   - Total de carreras procesadas: ${careerObjects.length}`)
console.log(`   - URLs actualizadas: ${updatedCount}`)
console.log(`   - Archivo actualizado: ${CAREERS_DATA_FILE}`)
