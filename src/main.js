import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'
import strapiService from './services/strapi'

createApp(App).mount('#app')

// Exponer servicio de Strapi en window para pruebas desde la consola
if (process.env.NODE_ENV === 'development') {
  window.strapiService = strapiService
  window.testStrapi = async (collectionName = 'preguntas-frecuentes') => {
    console.log('🧪 Ejecutando prueba de conexión...')
    console.log('💡 Usa: testStrapi("nombre-coleccion") para probar otras colecciones')
    return await strapiService.testConnection(collectionName)
  }
  console.log('💡 Herramientas de debug disponibles:')
  console.log('   - testStrapi("preguntas-frecuentes") - Probar conexión con Strapi')
  console.log('   - strapiService - Acceso directo al servicio')
}