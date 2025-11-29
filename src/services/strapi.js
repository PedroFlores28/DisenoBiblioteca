import axios from 'axios'

const API_URL = process.env.VUE_APP_STRAPI_URL || 'http://localhost:1337'

const api = axios.create({
  baseURL: `${API_URL}/api`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const strapiService = {
  // Obtener todos los items de una colección
  async getCollection(collectionName, params = {}) {
    try {
      const response = await api.get(`/${collectionName}`, { params })
      return response.data
    } catch (error) {
      console.error(`Error fetching ${collectionName}:`, error)
      throw error
    }
  }
}

export default strapiService

