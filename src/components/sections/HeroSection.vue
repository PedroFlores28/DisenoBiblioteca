<template>
  <section class="hero">
    <div 
      class="hero-background" 
      :class="{ 'has-image': backgroundImage }"
      :style="backgroundImage ? { 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : {}"
    ></div>
    <div class="hero-container">
      <div class="hero-content">
        <div class="hero-text">
          <p class="hero-subtitle">Servicios y recursos al servicio de tu aprendizaje</p>
          <h2 class="hero-title">¡Bienvenidos a Bibliotecas AIEP!</h2>
          <button class="btn btn-secondary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_40002132_2958)">
                <path d="M12 22.2857C6.32571 22.2857 1.71429 17.6743 1.71429 12C1.71429 6.32571 6.32571 1.71429 12 1.71429C17.6743 1.71429 22.2857 6.32571 22.2857 12C22.2857 17.6743 17.6743 22.2857 12 22.2857ZM12 0C5.38286 0 0 5.38286 0 12C0 18.6171 5.38286 24 12 24C18.6171 24 24 18.6171 24 12C24 5.38286 18.6171 0 12 0ZM16.3714 12.7029C15.7886 13.2086 10.6629 16.0114 9.84 16.2686C9.14571 16.5 8.86286 16.1057 8.76 15.9429C8.64 15.7029 8.58 15.4457 8.58 15.18V8.81999C8.58 8.56285 8.64857 8.29714 8.76 8.05714C8.86286 7.88571 9.14571 7.50857 9.84 7.72285C10.6629 7.98857 15.7886 10.7829 16.3714 11.2886C16.6114 11.4943 16.7229 11.7171 16.7229 11.9914C16.7229 12.2657 16.6114 12.4886 16.3714 12.6943V12.7029ZM10.3629 6.09429C9.10286 5.69143 7.91143 6.12 7.26 7.21714C7.26 7.21714 7.26 7.23428 7.26 7.24285L7.24286 7.26C6.99429 7.74 6.86571 8.27999 6.86571 8.81999V15.18C6.86571 15.72 6.99429 16.26 7.24286 16.74C7.24286 16.7486 7.25143 16.7571 7.26 16.7657V16.7829C7.26 16.7829 7.32 16.86 7.34571 16.9029C7.34571 16.92 7.36286 16.9286 7.38 16.9457C7.86857 17.6571 8.60571 18.06 9.43714 18.06C9.73714 18.06 10.0457 18.0086 10.3543 17.9143C11.2886 17.6143 16.6629 14.7257 17.4857 14.0057C18.1029 13.4743 18.42 12.78 18.42 12.0086C18.42 11.2371 18.0943 10.5429 17.4857 10.0114C16.6629 9.29142 11.2886 6.40285 10.3543 6.10285H10.3714L10.3629 6.09429Z" fill="#024588"/>
              </g>
              <defs>
                <clipPath id="clip0_40002132_2958">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            Ver guía rápida de uso
          </button>
        </div>
        <div class="hero-widget">
          <div class="widget-tabs-wrapper">
            <div class="widget-tabs">
              <button 
                :class="['tab', { active: activeTab === 'fisicos' }]"
                @click="activeTab = 'fisicos'"
              >
                Libros por sede
              </button>
              <!-- <button 
                :class="['tab', { active: activeTab === 'digitales' }]"
                @click="activeTab = 'digitales'"
              >
                Libros digitales
              </button> -->
            </div>
          </div>
          <div class="widget-divider"></div>
          <h3 class="widget-title">
            {{ activeTab === 'fisicos' ? 'Libros disponibles en tu sede' : 'Accede a libros y recursos digitales' }}
          </h3>
          <p class="widget-description">
            {{ activeTab === 'fisicos' ? 'Accede al catálogo de libros físicos disponibles para préstamo.' : 'Descubre lecturas y materiales digitales que facilitan tu estudio' }}
          </p>
          <div class="search-container">
            <div class="search-box">
              <select v-model="searchFilter" class="search-filter">
                <option value="">Filtra resultados</option>
                <option value="asignatura">Asignatura</option>
                <option value="autor">Autor</option>
                <option value="carrera">Carrera</option>
                <option value="isbn">ISBN</option>
                <option value="titulo">Título</option>
              </select>
              <input 
                v-model="searchQuery"
                type="text" 
                class="search-input" 
                placeholder="La teoría del color por Joseff Albers"
                @keyup.enter="handleSearch"
              />
            </div>
            <button class="search-btn" @click="handleSearch">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
            <select v-model="searchFilter" class="search-filter search-filter-mobile">
              <option value="">Filtra resultados</option>
              <option value="asignatura">Asignatura</option>
              <option value="autor">Autor</option>
              <option value="carrera">Carrera</option>
              <option value="isbn">ISBN</option>
              <option value="titulo">Título</option>
            </select>
            <div class="search-input-group">
              <input 
                v-model="searchQuery"
                type="text" 
                class="search-input search-input-mobile" 
                placeholder="La teoría del color por Joseff Albers"
                @keyup.enter="handleSearch"
              />
              <button class="search-btn search-btn-mobile" @click="handleSearch">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="floating-btn">
      <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.3292 5.30168C15.6865 5.70653 14.8383 6.15637 13.8036 6.64477C12.3127 7.35166 10.9954 7.87861 9.87719 8.19993C9.61371 8.27704 9.31168 8.32203 8.99679 8.34131C8.6819 8.32203 8.37986 8.27704 8.11639 8.19993C6.99822 7.87219 5.68083 7.35166 4.18993 6.64477C3.16173 6.15637 2.31346 5.70653 1.67083 5.30168C1.61942 5.26955 1.53588 5.21171 1.45234 5.14102C1.31096 5.02535 1.28526 4.8904 1.28526 4.81328C1.28526 4.73617 1.30453 4.59479 1.45234 4.47912C1.55516 4.402 1.6387 4.33774 1.70296 4.29918C2.34559 3.90075 3.18101 3.45734 4.18993 2.97537C5.68083 2.26848 6.99822 1.74152 8.11639 1.42021C8.37986 1.34309 8.6819 1.29811 8.99679 1.27883C9.31168 1.29811 9.61371 1.34309 9.87719 1.42021C10.9954 1.74795 12.3127 2.26848 13.8036 2.97537C14.819 3.45734 15.6544 3.90075 16.2906 4.29918C16.3549 4.33774 16.4384 4.402 16.5412 4.47912C16.689 4.59479 16.7083 4.73617 16.7083 4.81328C16.7083 4.8904 16.689 5.02535 16.5412 5.14102C16.4513 5.21171 16.3742 5.26955 16.3227 5.30168H16.3292ZM13.1289 11.4645C11.9979 11.9786 10.9568 12.3834 10.0186 12.6726C9.7101 12.769 9.35666 12.8268 8.99679 12.8461C8.63692 12.8268 8.27704 12.769 7.97501 12.6726C7.03677 12.3834 5.98929 11.9786 4.86469 11.4645C4.6462 11.3617 4.49839 11.1367 4.49839 10.8861V8.19993C5.70653 8.73974 6.799 9.15744 7.75652 9.4402C8.12924 9.54945 8.53409 9.61371 8.96466 9.63299H9.02892C9.45948 9.61371 9.86434 9.54302 10.2371 9.4402C11.1946 9.16387 12.287 8.73974 13.4888 8.20636V10.8861C13.4888 11.1367 13.3474 11.3681 13.1225 11.4645H13.1289ZM18 4.81971C18 4.29275 17.7558 3.80436 17.3381 3.47662C17.1903 3.36094 17.0618 3.27098 16.9718 3.21314C16.2906 2.789 15.4166 2.32631 14.3563 1.82506C12.8076 1.08604 11.4195 0.539808 10.2371 0.199215C9.86434 0.0899688 9.45948 0.0257051 9.02892 0H8.96466C8.53409 0.0192788 8.12924 0.0899688 7.75652 0.199215C6.57408 0.546234 5.19243 1.09247 3.63727 1.83149C2.58336 2.33274 1.70296 2.80186 1.02178 3.22599C0.93181 3.28383 0.803285 3.3738 0.661906 3.48947C0.237772 3.81721 0 4.30561 0 4.83256C0 5.35952 0.237772 5.84149 0.661906 6.16923C0.790432 6.27205 0.906105 6.35559 0.989647 6.407C1.58086 6.77972 2.33274 7.18458 3.21314 7.61514V10.899C3.21314 11.6508 3.65013 12.3385 4.33131 12.6469C5.50732 13.1803 6.60621 13.6044 7.59586 13.9129C8.01999 14.0414 8.47626 14.1185 8.95823 14.1442H9.02249C9.51089 14.1185 9.96716 14.0414 10.3913 13.9129C11.3809 13.6109 12.4798 13.1803 13.6558 12.6469C14.337 12.3385 14.774 11.6508 14.774 10.899V7.61514C15.5195 7.24884 16.1621 6.90825 16.7019 6.58693V11.5737C16.7019 11.9272 16.9911 12.2164 17.3445 12.2164C17.698 12.2164 17.9871 11.9272 17.9871 11.5737V4.90968C17.9871 4.90968 17.9936 4.85827 17.9936 4.83256V4.81971H18Z" fill="white"/>
      </svg>
      <span class="floating-btn-text">
        <span>Revisa la bibliografía</span>
        <span>de tu carrera</span>
      </span>
    </button>
  </section>
</template>

<script>
import strapiService from '../../services/strapi'

let backgroundImageDesktop = null
let backgroundImageMobile = null

try {
  backgroundImageDesktop = require('@/assets/images/hero-background.jpg')
} catch (e) {
  // Imagen de fondo desktop no encontrada
}

try {
  backgroundImageMobile = require('@/assets/images/b1b818e26d255f001e62b637fce22a3221cf95c6.jpg')
} catch (e) {
  // Imagen de fondo mobile no encontrada
}

export default {
  name: 'HeroSection',
  data() {
    return {
      activeTab: 'fisicos',
      searchQuery: '',
      searchFilter: '', // Filtro seleccionado
      backgroundImageDesktop: backgroundImageDesktop,
      backgroundImageMobile: backgroundImageMobile,
      isMobile: false
    }
  },
  computed: {
    backgroundImage() {
      return this.isMobile ? this.backgroundImageMobile : this.backgroundImageDesktop
    }
  },
  async mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
    await this.loadBannerFromStrapi()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768
    },
    async loadBannerFromStrapi() {
      // Lista de nombres posibles para el tipo de contenido
      const possibleNames = ['hero-banners', 'hero-banner', 'api::hero-banner.hero-banner']
      
      for (const collectionName of possibleNames) {
        try {
          console.log(`🔄 Intentando cargar banner desde Strapi con nombre: ${collectionName}...`)
          const response = await strapiService.getCollection(collectionName, {
            populate: '*',
            'pagination[limit]': 1,
            sort: 'createdAt:desc'
          })
          
          console.log(`✅ Respuesta de Strapi para ${collectionName}:`, response)
          
          // Manejar diferentes estructuras de respuesta (Strapi v3 y v4)
          let bannerData = null
          
          // Strapi v4: response.data.data
          if (response.data?.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
            bannerData = response.data.data[0]
            console.log('🔍 Detectado: Strapi v4 (response.data.data)')
          }
          // Strapi v4 alternativo: response.data como array
          else if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            bannerData = response.data[0]
            console.log('🔍 Detectado: Strapi v4 (response.data como array)')
          }
          // Strapi v3: response como array
          else if (Array.isArray(response) && response.length > 0) {
            bannerData = response[0]
            console.log('🔍 Detectado: Strapi v3')
          }
          
          if (bannerData) {
            // Extraer atributos según la estructura
            const attributes = bannerData.attributes || bannerData
            
            // Obtener imagen desktop
            if (attributes.imagenDesktop) {
              const desktopUrl = strapiService.getImageUrl(attributes.imagenDesktop)
              if (desktopUrl) {
                this.backgroundImageDesktop = desktopUrl
                console.log('✅ Imagen desktop cargada desde Strapi:', desktopUrl)
              }
            }
            
            // Obtener imagen mobile
            if (attributes.imagenMobile) {
              const mobileUrl = strapiService.getImageUrl(attributes.imagenMobile)
              if (mobileUrl) {
                this.backgroundImageMobile = mobileUrl
                console.log('✅ Imagen mobile cargada desde Strapi:', mobileUrl)
              }
            }
            
            // Si encontramos datos, salir del loop
            console.log(`✅ Banner cargado exitosamente usando el nombre: ${collectionName}`)
            return
          } else {
            console.log(`⚠️ No se encontraron datos en ${collectionName}, probando siguiente nombre...`)
          }
        } catch (error) {
          // Si es un 404, probar con el siguiente nombre
          if (error.response && error.response.status === 404) {
            console.log(`⚠️ ${collectionName} no existe (404), probando siguiente nombre...`)
            continue
          }
          // Si es otro error, loguearlo pero continuar
          console.warn(`⚠️ Error al cargar ${collectionName}:`, error.message)
        }
      }
      
      // Si llegamos aquí, ningún nombre funcionó
      console.warn('⚠️ No se pudo cargar el banner desde Strapi con ningún nombre, usando imágenes por defecto')
    },
    handleSearch() {
      // URL base del catálogo de bibliotecas AIEP
      const CATALOG_BASE_URL = 'https://bibliotecas.aiep.cl/client/en_US/default'
      
      const searchTerm = this.searchQuery.trim()
      
      // Si no hay término de búsqueda, redirigir a la página principal del catálogo
      if (!searchTerm) {
        window.location.href = CATALOG_BASE_URL
        return
      }
      
      // Codificar el término de búsqueda para la URL (maneja espacios, acentos, caracteres especiales)
      const encodedTerm = encodeURIComponent(searchTerm)
      
      // Construir la URL de búsqueda
      // Estructura: /search/results?qu=TERMINO&te=TIPO
      // - qu: query (término de búsqueda) - REQUERIDO
      // - te: target/type (tipo de búsqueda) - vacío = buscar en todos los campos
      const searchUrl = `${CATALOG_BASE_URL}/search/results?qu=${encodedTerm}&te=`
      
      // Redirigir automáticamente a la URL de búsqueda del catálogo
      window.location.href = searchUrl
    }
  }
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 500px;
  padding: 100px 20px 60px;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.hero-background.has-image {
  background: none;
}

.hero-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 51, 102, 0.75) 0%, rgba(0, 102, 204, 0.7) 100%);
  z-index: 1;
}

.hero-background.has-image::after {
  background: #182844A6;
}

@media (max-width: 768px) {
  .hero-background::after {
    background: linear-gradient(135deg, rgba(0, 51, 102, 0.75) 0%, rgba(0, 102, 204, 0.65) 100%);
  }
}

.hero-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0;
  box-sizing: border-box;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 40px;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
}

.hero-text {
  color: var(--white);
}

.hero-text .btn {
  margin-top: 16px;
  border-radius: 8px;
  font-weight: bold;
  color: #024588;
}

.hero-text .btn svg path {
  fill: #024588;
}

.hero-subtitle {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 0;
  color: #FFFFFF;
}

.hero-title {
  font-size: 56px;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 0;
  line-height: 1.2;
  flex: 1;
  display: flex;
  align-items: center;
}

.hero-widget {
  background: #F8F8F8;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.widget-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 0;
  background: #F8F8F8;
  border-radius: 8px 8px 0 0;
  padding: 8px;
}

.widget-divider {
  width: 100%;
  height: 1px;
  background: var(--border-gray);
  margin: 16px 0;
}

@media (max-width: 768px) {
  .widget-divider {
    width: calc(100% + 48px);
    margin-left: -24px;
    margin-right: -24px;
  }
}

@media (min-width: 769px) {
  .widget-divider {
    height: 1px;
    background: #E0E0E0;
    margin: 0;
  }
}

@media (min-width: 769px) {
  .hero {
    padding: 100px 0 60px;
  }
  
  .hero-container {
    max-width: 1200px;
    padding: 0 25px;
    width: 100%;
  }
  
  .hero-subtitle {
    white-space: nowrap;
    margin-bottom: 0;
    padding-top: 12px;
  }
  
  .hero-title {
    margin-top: -24px;
    margin-bottom: 0;
  }
  
  .hero-content {
    align-items: flex-start;
    padding-left: 0;
    padding-right: 0;
    min-width: 0;
    gap: 40px;
  }
  
  .hero-text {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-top: 0;
    height: 263px;
  }
  
  .hero-text .btn {
    margin-top: auto;
    align-self: flex-start;
  }
  
  .hero-widget {
    width: 100%;
    max-width: 753px;
    height: 289px;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    box-sizing: border-box;
  }
  
  .widget-tabs-wrapper {
    width: auto;
    background: #F8F8F8;
    border-radius: 8px 8px 0 0;
  }
  
  .widget-tabs {
    background: #F8F8F8;
    border-radius: 8px 8px 0 0;
    padding: 12px 8px 8px 15.5px;
    margin-bottom: 0;
    flex-shrink: 0;
  }
  
  .widget-title {
    padding: 12px 24px 4px 21px;
    margin: 0;
    font-size: 28px;
    color: #024588;
  }
  
  .widget-description {
    padding: 0 24px 16px 21px;
    margin: 0;
    font-size: 16px;
    font-family: Verdana, sans-serif;
  }
  
  .search-container {
    padding: 0 24px 24px 16px;
    margin-top: 0;
  }
}

.tab {
  padding: 10px 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--secondary-blue);
  border-radius: 4px;
  transition: all 0.3s;
  font-size: 14px;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 500;
}

.tab.active {
  background: #024588;
  color: var(--white);
  font-weight: 500;
}

.widget-title {
  font-size: 28px;
  color: #024588;
  margin-bottom: 8px;
  margin-top: 28px;
}

.widget-description {
  color: var(--text-light);
  font-size: 16px;
  margin-bottom: -14px;
  font-family: Verdana, sans-serif;
}

.search-container {
  margin-top: 23px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.search-box {
  display: flex;
  gap: 0;
  border: 2px solid #102A8A;
  border-radius: 8px;
  overflow: hidden;
  flex: 1;
}

.search-filter {
  padding: 12px 16px;
  padding-right: 32px;
  border: none;
  border-radius: 0;
  background: #F4F7FFB5;
  color: #102A8A;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  border-right: 2px solid #102A8A;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg%20width%3D%2212%22%20height%3D%227%22%20viewBox%3D%220%200%2012%207%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.26332%205.78502V5.77802L0.357318%202.04002C-0.0976821%201.59202%20-0.132682%200.843024%200.336318%200.367024C0.784318%20-0.0879756%201.52632%20-0.129976%202.00932%200.339024L5.60732%203.79002L9.19832%200.332024C9.67432%20-0.129976%2010.4303%20-0.101976%2010.8783%200.367024C11.0953%200.598024%2011.2003%200.899024%2011.2003%201.17902C11.2003%201.48002%2011.0813%201.80202%2010.8363%202.03302L6.96532%205.75002H6.95132C6.15332%206.46402%205.05432%206.47802%204.26332%205.77102V5.78502Z%22%20fill%3D%22%23102A8A%22%2F%3E%3C%2Fsvg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-color: #F4F7FFB5;
}

.search-filter {
  color: #102A8A;
}

.search-filter option:first-child {
  color: #102A8A;
}

.search-box .search-filter {
  color: #102A8A;
}

.search-box .search-filter option:first-child {
  color: #102A8A;
}

.search-filter option:not(:first-child) {
  color: #24334E;
}

.search-filter:focus {
  outline: none;
}

.search-input {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 0;
  font-size: 16px;
  background: var(--white);
  color: var(--text-dark);
}

.search-filter-mobile {
  display: none;
}

.search-input-mobile {
  display: none;
}

.search-input-group {
  display: none;
}

.search-btn-mobile {
  display: none;
}

.search-input:focus {
  outline: none;
}

.search-btn {
  width: 48px;
  height: 48px;
  padding: 0;
  background: var(--accent-red);
  color: var(--white);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.search-btn:hover {
  background: #880000;
}

.floating-btn {
  position: absolute;
  top: 20px;
  right: 0;
  padding: 12px 20px;
  background: var(--accent-red);
  color: var(--white);
  border: none;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  z-index: 10;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 500;
  font-size: 13px;
}

.floating-btn-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
  text-align: left;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 500;
  font-size: 13px;
}

.floating-btn-text span {
  display: block;
}

.floating-btn:hover {
  background: #880000;
}

@media (max-width: 968px) {
  .hero-content {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 36px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 80px 20px 40px;
    min-height: 550px;
  }
  
  .hero-text {
    display: none;
  }
  
  .hero-widget {
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
    min-height: 400px;
  }
  
  .hero-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .floating-btn {
    position: absolute;
    top: 20px;
    right: 0;
    padding: 8px 12px;
    font-size: 13px;
    border-radius: 4px 0 0 4px;
  }
  
  .floating-btn span:first-child {
    font-size: 13px;
  }
  
  .floating-btn-text {
    font-size: 13px;
    line-height: 1.3;
  }
  
  .widget-tabs-wrapper {
    width: 100%;
    overflow: hidden;
  }
  
  .widget-tabs {
    margin-bottom: 0px;
    display: flex;
    gap: 0;
    width: 100%;
    flex-wrap: nowrap;
    min-width: 0;
    padding: 4px;
    background: #F8F8F8;
  }
  
  .tab {
    flex: 1;
    padding: 8px 4px;
    flex-basis: 50%;
    padding: 12px 8px;
    font-size: 14px;
    white-space: nowrap;
    line-height: 1.3;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    width: 50%;
    box-sizing: border-box;
  }
  
  .tab.active {
    border-radius: 4px 4px 0 0;
  }
  
  .tab:not(.active) {
    background: transparent;
    color: var(--secondary-blue);
    border: none;
  }
  
  .widget-title {
    font-size: 28px;
    margin-bottom: 4px;
    line-height: 1.2;
  }
  
  .widget-description {
    font-size: 15px;
    margin-bottom: 24px;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .search-container {
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    .search-container {
      font-size: 13px;
      gap: 10px;
    }
  }
  
  @media (max-width: 360px) {
    .search-container {
      font-size: 12px;
      gap: 8px;
    }
  }
  
  .search-box {
    display: none;
  }
  
  .search-btn:not(.search-btn-mobile) {
    display: none;
  }
  
  .search-filter-mobile {
    display: block;
    width: 100%;
    border: 2px solid #102A8A;
    border-radius: 8px;
    padding: 12px 16px;
    padding-right: 32px;
    font-size: 15px;
    line-height: 1.5;
    box-sizing: border-box;
    min-height: 44px;
    color: #102A8A;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23102A8A' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-color: #F7F9FF;
    background-size: 12px;
  }
  
  .search-filter-mobile option:first-child {
    color: #102A8A;
  }
  
  .search-filter-mobile option:not(:first-child) {
    color: #24334E;
  }
  
  .search-input-mobile {
    display: block;
    flex: 1;
    padding: 10px 12px;
    border: 2px solid #102A8A;
    border-radius: 8px;
    font-size: 1em;
    background: var(--white);
    color: var(--text-dark);
    box-sizing: border-box;
    min-height: 40px;
    height: 40px;
    line-height: 1.5;
    width: 0;
  }
  
  .search-input-mobile:focus {
    outline: none;
    border-color: #102A8A;
  }
  
  .search-input-mobile::placeholder {
    color: var(--text-light);
    font-size: 1em;
  }
  
  .search-input-group {
    display: flex;
    width: 100%;
    gap: 8px;
    align-items: stretch;
    box-sizing: border-box;
  }
  
  .search-btn-mobile {
    display: flex;
    width: 40px;
    min-width: 40px;
    min-height: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: 8px;
    box-sizing: border-box;
  }
  
  .search-btn-mobile svg {
    width: 18px;
    height: 18px;
  }
  
  @media (max-width: 480px) {
    .search-filter-mobile,
    .search-input-mobile {
      min-height: 42px;
      padding: 10px 14px;
      font-size: 14px;
    }
    
    .search-filter-mobile {
      padding-right: 28px;
      background-size: 11px;
      background-position: right 10px center;
    }
    
    .search-btn-mobile {
      width: 42px;
      min-width: 42px;
      min-height: 42px;
    }
    
    .search-btn-mobile svg {
      width: 16px;
      height: 16px;
    }
  }
  
  @media (max-width: 360px) {
    .search-filter-mobile,
    .search-input-mobile {
      min-height: 40px;
      padding: 8px 12px;
      font-size: 13px;
    }
    
    .search-filter-mobile {
      padding-right: 26px;
      background-size: 10px;
      background-position: right 8px center;
    }
    
    .search-btn-mobile {
      width: 40px;
      min-width: 40px;
      min-height: 40px;
    }
    
    .search-btn-mobile svg {
      width: 15px;
      height: 15px;
    }
    
    .search-input-group {
      gap: 6px;
    }
  }
}
</style>

