import axios from 'axios'

// URL del servidor Strapi
// En desarrollo: usa el proxy de vue.config.js (relativo)
// En producción: usa la URL completa desde variables de entorno
const getApiBase = () => {
  // En desarrollo, usar el proxy (ruta relativa)
  if (process.env.NODE_ENV === 'development') {
    return '/api' // Usa el proxy configurado en vue.config.js
  }
  
  // En producción, usar la URL completa desde variables de entorno
  const prodUrl = process.env.VUE_APP_STRAPI_URL_PROD || process.env.VUE_APP_STRAPI_URL || 'http://68.211.112.39:1337'
  
  // Verificar si la página está en HTTPS
  if (typeof window !== 'undefined' && window.location.protocol === 'https:') {
    // Si la URL de producción es HTTP, mostrar advertencia
    if (prodUrl.startsWith('http://')) {
      console.error('❌ ERROR: La aplicación está en HTTPS pero Strapi está configurado en HTTP')
      console.error('❌ Esto causará un error de "Mixed Content"')
      console.error('📋 Soluciones:')
      console.error('   1. Configura HTTPS en tu servidor Strapi')
      console.error('   2. O crea un archivo .env.production con: VUE_APP_STRAPI_URL_PROD=https://tu-servidor:1337')
      console.error('   3. O usa un proxy reverso con HTTPS')
    }
  }
  
  return `${prodUrl}/api`
}

const API_BASE = getApiBase()

// Función helper para obtener la URL base sin /api (para mensajes de error)
const getStrapiBaseUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return process.env.VUE_APP_STRAPI_URL || 'http://68.211.112.39:1337'
  }
  return process.env.VUE_APP_STRAPI_URL_PROD || process.env.VUE_APP_STRAPI_URL || 'http://68.211.112.39:1337'
}

// Log para debugging
if (process.env.NODE_ENV === 'development') {
  console.log('🔗 Conectando a Strapi (desarrollo - usando proxy):', API_BASE)
} else {
  console.log('🔗 Conectando a Strapi (producción):', API_BASE)
}

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000 // 10 segundos de timeout
})

export const strapiService = {
  // Obtener todos los items de una colección
  async getCollection(collectionName, params = {}) {
    try {
      console.log(`📡 Solicitando ${collectionName} desde: ${API_BASE}/${collectionName}`)
      const response = await api.get(`/${collectionName}`, { params })
      console.log(`✅ Respuesta recibida para ${collectionName}:`, response.data)
      return response.data
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un código de estado fuera del rango 2xx
        if (error.response.status === 403) {
          console.error(`❌ Error 403 (Forbidden) al obtener ${collectionName}`)
          console.error(`🔒 La colección "${collectionName}" no tiene permisos públicos configurados en Strapi.`)
          console.error(`📋 Para solucionarlo:`)
          console.error(`   1. Ve a Strapi Admin: ${getStrapiBaseUrl()}/admin`)
          console.error(`   2. Settings → Users & Permissions Plugin → Roles → Public`)
          console.error(`   3. Busca "${collectionName}" y marca "find" y "findOne"`)
          console.error(`   4. Guarda los cambios`)
        } else {
          console.error(`❌ Error ${error.response.status} al obtener ${collectionName}:`, error.response.data)
        }
      } else if (error.request) {
        // La petición fue hecha pero no se recibió respuesta
        console.error(`❌ No se pudo conectar con Strapi para ${collectionName}. Verifica que el servidor esté disponible en: ${getStrapiBaseUrl()}`)
      } else {
        // Algo pasó al configurar la petición
        console.error(`❌ Error al configurar la petición para ${collectionName}:`, error.message)
      }
      throw error
    }
  },

  // Obtener un item específico por ID
  async getItem(collectionName, id, params = {}) {
    try {
      const response = await api.get(`/${collectionName}/${id}`, { params })
      return response.data
    } catch (error) {
      console.error(`Error fetching ${collectionName} with id ${id}:`, error)
      throw error
    }
  },

  // Función de prueba para verificar la conexión
  async testConnection(collectionName = 'preguntas-frecuentes') {
    console.log('🧪 Iniciando prueba de conexión con Strapi...')
    console.log('📍 URL base de la API:', API_BASE)
    console.log('📦 Colección a probar:', collectionName)
    
    try {
      const result = await this.getCollection(collectionName, { populate: '*' })
      console.log('✅ ¡Conexión exitosa!')
      console.log('📊 Estructura de datos recibida:', result)
      
      // Determinar versión de Strapi basado en la estructura
      if (result.data && Array.isArray(result.data)) {
        console.log('🔍 Detectado: Strapi v4 (estructura: response.data.data)')
        if (result.data.length > 0) {
          console.log('📝 Ejemplo de item:', result.data[0])
        }
      } else if (Array.isArray(result)) {
        console.log('🔍 Detectado: Strapi v3 (estructura: response.data como array)')
        if (result.length > 0) {
          console.log('📝 Ejemplo de item:', result[0])
        }
      }
      
      return { success: true, data: result }
    } catch (error) {
      console.error('❌ Prueba de conexión fallida:', error)
      return { success: false, error }
    }
  }
}

export default strapiService

