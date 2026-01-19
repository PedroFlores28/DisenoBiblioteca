import axios from 'axios'

// URL del servidor Strapi
// En desarrollo: usa el proxy de vue.config.js (relativo)
// En producción: usa la URL completa directamente
const STRAPI_URL = 'https://cmsbiblioteca.aiep.cl'

const getApiBase = () => {
  // En desarrollo, usar el proxy (ruta relativa)
  if (process.env.NODE_ENV === 'development') {
    return '/api' // Usa el proxy configurado en vue.config.js
  }
  
  // En producción, usar la URL completa directamente
  return `${STRAPI_URL}/api`
}

const API_BASE = getApiBase()

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
    const response = await api.get(`/${collectionName}`, { params })
    return response.data
  },

  // Obtener un item específico por ID
  async getItem(collectionName, id, params = {}) {
    const response = await api.get(`/${collectionName}/${id}`, { params })
    return response.data
  },

  // Función helper para obtener la URL completa de una imagen desde Strapi
  getImageUrl(image) {
    if (!image) return null
    
    // Si ya es una URL completa, retornarla
    if (typeof image === 'string' && (image.startsWith('http://') || image.startsWith('https://'))) {
      return image
    }
    
    // Si es un objeto con data (Strapi v4)
    if (image.data) {
      const imageData = Array.isArray(image.data) ? image.data[0] : image.data
      if (imageData?.attributes?.url) {
        return `${STRAPI_URL}${imageData.attributes.url}`
      }
      if (imageData?.url) {
        return `${STRAPI_URL}${imageData.url}`
      }
    }
    
    // Si es un objeto con url directamente
    if (image.url) {
      // Si la URL ya es completa, retornarla
      if (image.url.startsWith('http://') || image.url.startsWith('https://')) {
        return image.url
      }
      // Si es relativa, agregar el dominio de Strapi
      return `${STRAPI_URL}${image.url}`
    }
    
    // Si es un objeto con attributes (Strapi v4)
    if (image.attributes?.url) {
      const url = image.attributes.url
      if (url.startsWith('http://') || url.startsWith('https://')) {
        return url
      }
      return `${STRAPI_URL}${url}`
    }
    
    return null
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

