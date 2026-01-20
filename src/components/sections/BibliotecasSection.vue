<template>
  <section id="bibliotecas" class="bibliotecas-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Encuentra tu Biblioteca</h2>
        <p class="section-subtitle">
          Selecciona tu región y ubica tu biblioteca AIEP más cercana
        </p>
      </div>
      <div class="filters-wrapper">
        <div class="filters-container">
          <div class="region-tabs">
            <button 
              v-for="region in regions"
              :key="region.id"
              :class="['region-tab', { active: selectedRegion === region.id, 'region-metropolitana': region.id === 'metropolitana', 'libros-digitales-active': isLibrosDigitales && region.id === 'metropolitana' && selectedRegion === region.id }]"
              @click="selectRegion(region.id)"
            >
              {{ region.name }}
            </button>
          </div>
          <div class="search-container" :class="{ 'hide-on-libros-digitales-desktop': isLibrosDigitales }">
            <input 
              type="text"
              v-model="searchQuery"
              class="library-search"
              placeholder="Busca una biblioteca (ej. Concepción)"
              @input="handleSearch"
              @focus="showSuggestions = true"
              @blur="handleBlur"
            />
            <svg class="search-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.51308 8.95965C2.51308 5.40353 5.40307 2.51324 8.95881 2.51324C12.5146 2.51324 15.4045 5.40353 15.4045 8.95965C15.4045 12.5158 12.5146 15.4061 8.95881 15.4061C5.40307 15.4061 2.51308 12.5158 2.51308 8.95965ZM18.7711 17.7062L15.0868 14.0214C16.2216 12.6444 16.9101 10.8815 16.9101 8.95965C16.9101 4.57125 13.3392 1 8.95125 1C4.56331 1 1 4.57125 1 8.95965C1 13.348 4.57087 16.9193 8.95881 16.9193C10.8804 16.9193 12.6432 16.2308 14.0201 15.0958L17.7044 18.7806C17.8557 18.9319 18.0449 19 18.2416 19C18.4383 19 18.6274 18.9243 18.7787 18.7806C19.0738 18.4855 19.0738 18.0088 18.7787 17.7137H18.7711V17.7062Z" fill="#102A8A"/>
            </svg>
            <div v-if="showSuggestions && searchSuggestions.length > 0" class="search-suggestions">
              <div 
                v-for="library in searchSuggestions"
                :key="library.id"
                class="suggestion-item"
                @mousedown="selectLibrary(library)"
              >
                {{ library.name }}
              </div>
            </div>
          </div>
        </div>
        <div class="region-select-container">
          <select 
            v-model="selectedRegion" 
            class="region-select"
            @change="selectRegion(selectedRegion)"
          >
            <option 
              v-for="region in regions"
              :key="region.id"
              :value="region.id"
            >
              {{ region.name }}
            </option>
          </select>
        </div>
      </div>
      <div class="libraries-carousel">
        <div class="carousel-wrapper" ref="carouselWrapper" :class="{ 'is-last-slide': currentIndex >= totalCarouselPages - 1, 'libros-digitales': isLibrosDigitales }">
          <div class="carousel-container" :style="windowWidth > 768 ? { transform: `translateX(-${carouselTransform}%)` } : {}">
            <div 
              v-for="library in filteredLibraries" 
              :key="library.id"
              :class="['library-card', { highlighted: selectedLibraryId === library.id, 'libros-por-sede': isLibrosPorSede }]"
            >
              <div class="library-image">
                <img 
                  v-if="library.imageUrl || library.id" 
                  :src="getLibraryImage(library)" 
                  :alt="library.name"
                  class="library-image-img"
                  @error="handleImageError"
                />
                <div v-else class="image-placeholder" :class="{ 'split-image': isLibrosPorSede }">
                  <div v-if="isLibrosPorSede" class="image-top"></div>
                </div>
              </div>
              <h3 class="library-name">{{ library.name }}</h3>
              <div class="library-info">
                <p class="info-item">
                  <span class="icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.9996 12.0077C10.732 12.0077 9.70106 10.9662 9.70106 9.68567C9.70106 8.40509 10.732 7.36366 11.9996 7.36366C13.2672 7.36366 14.2982 8.40509 14.2982 9.68567C14.2982 10.9662 13.2672 12.0077 11.9996 12.0077ZM11.9996 5.82081C9.89197 5.82081 8.17379 7.55652 8.17379 9.68567C8.17379 11.8148 9.89197 13.5505 11.9996 13.5505C14.1072 13.5505 15.8254 11.8148 15.8254 9.68567C15.8254 7.55652 14.1072 5.82081 11.9996 5.82081ZM17.9254 13.9517C17.116 15.5871 15.0618 19.1357 13.0687 20.8328C12.7632 21.0951 12.3814 21.2417 11.9996 21.2571C11.6178 21.2571 11.2436 21.0951 10.9305 20.8328C8.93743 19.1357 6.88325 15.5871 6.07379 13.9517C5.40943 12.6017 5.12688 11.3288 5.12688 9.68567C5.12688 5.85938 8.21197 2.74281 11.9996 2.74281C15.7872 2.74281 18.8723 5.85938 18.8723 9.68567C18.8723 11.3288 18.5898 12.6094 17.9254 13.9517ZM11.9996 1.19995C7.36434 1.19995 3.59961 5.00309 3.59961 9.68567C3.59961 11.5834 3.92797 13.0645 4.70688 14.6382C5.62325 16.5051 7.76143 20.154 9.94543 22.0131C10.5258 22.5068 11.2512 22.7845 11.9843 22.7999H12.0149C12.748 22.7845 13.4734 22.5068 14.0538 22.0131C16.2378 20.154 18.376 16.5051 19.2923 14.6382C20.0712 13.0645 20.3996 11.5834 20.3996 9.68567C20.3996 5.00309 16.6349 1.19995 11.9996 1.19995Z" fill="#024588"/>
                    </svg>
                  </span>
                  {{ library.address }}
                </p>
                <p class="info-item">
                  <span class="icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20.8485 16.7583C20.6479 17.8692 19.6913 18.6715 18.5651 18.6715H5.43534C4.30905 18.6715 3.35248 17.8692 3.15191 16.7583C2.8742 15.2309 2.74305 13.8346 2.74305 12.5001C2.74305 11.6438 2.80477 10.7643 2.91277 9.84635L9.96362 14.2281C10.5885 14.6215 11.2982 14.8143 12.0002 14.8143C12.7022 14.8143 13.4119 14.6215 14.0368 14.2281L21.0876 9.84635C21.1956 10.7643 21.2573 11.6438 21.2573 12.5001C21.2573 13.8346 21.1262 15.2309 20.8485 16.7583ZM5.43534 6.32862H18.5651C19.6682 6.32862 20.6093 7.10777 20.8331 8.18777L13.2191 12.9166C12.4631 13.3795 11.5296 13.3872 10.7736 12.9166L3.15962 8.18777C3.38334 7.10777 4.32448 6.32862 5.42762 6.32862H5.43534ZM22.3682 7.96406C22.0365 6.12035 20.4396 4.78577 18.5651 4.78577H5.43534C3.56848 4.78577 1.96391 6.12806 1.6322 7.96406C1.36991 9.41435 1.2002 10.9186 1.2002 12.5001C1.2002 14.0815 1.36991 15.5858 1.6322 17.0361C1.96391 18.8798 3.56077 20.2143 5.43534 20.2143H18.5651C20.4319 20.2143 22.0365 18.8721 22.3682 17.0361C22.6305 15.5858 22.8002 14.0815 22.8002 12.5001C22.8002 10.9186 22.6305 9.41435 22.3682 7.96406Z" fill="#024588"/>
                    </svg>
                  </span>
                  {{ library.email }}
                </p>
                <p class="info-item">
                  <span class="icon" :class="{ 'icon-hidden': !library.phone }">
                    <svg v-if="library.phone" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M5.14604 2.9749C2.32066 5.89027 2.25767 10.6502 5.06506 13.8085C5.15504 13.9075 5.26301 14.0425 5.38899 14.1955C5.97386 14.9153 6.60372 15.6262 7.26058 16.301L7.71948 16.7689C8.37634 17.3988 9.08718 18.0376 9.81602 18.6225C9.96899 18.7485 10.104 18.8564 10.2029 18.9464C13.3702 21.7628 18.1302 21.6908 21.0366 18.8025L18.5531 16.31C18.2742 16.0311 17.7343 16.0221 17.4374 16.31L15.8987 17.7767C15.4038 18.2716 14.7559 18.5055 14.0901 18.3976C13.5682 18.3166 13.0643 18.0376 12.5874 17.5697C11.5346 16.7239 10.5179 15.8061 9.56408 14.8343C9.53708 14.8073 9.51909 14.7893 9.50109 14.7623C8.5293 13.8085 7.6115 12.7918 6.76569 11.739C5.61394 10.5513 6.01885 9.39951 6.41476 8.63468C6.43276 8.60768 6.45076 8.58069 6.46875 8.5537L7.71048 6.71809C7.71048 6.71809 7.78247 6.62811 7.81846 6.58312C8.13339 6.26819 8.13339 5.94426 7.81846 5.62933L5.15504 2.96591H5.14604V2.9749ZM15.6018 22.8246C13.2623 22.8246 10.9048 21.9878 9.0062 20.3051C8.92522 20.2332 8.80824 20.1342 8.67327 20.0262C7.90844 19.3963 7.1616 18.7305 6.45076 18.0466L5.97386 17.5607C5.27201 16.8409 4.61516 16.0941 3.99429 15.3292C3.88632 15.1942 3.78734 15.0863 3.71535 14.9963C0.278102 11.1271 0.37708 5.2874 3.93131 1.69718C4.26423 1.36425 4.70514 1.17529 5.17303 1.17529C5.64093 1.17529 6.08184 1.35526 6.40577 1.68819L9.06019 4.34261C10.05 5.33239 10.068 6.76308 9.12317 7.77086L7.95343 9.49848C7.65649 10.0654 7.74647 10.2003 8.03441 10.4973C8.06141 10.5243 8.0794 10.5423 8.0974 10.5692C8.90722 11.586 9.78903 12.5578 10.7248 13.4666C10.7518 13.4936 10.7788 13.5206 10.7968 13.5476C10.7968 13.5476 10.7968 13.5566 10.8148 13.5656C11.7236 14.4924 12.7044 15.3832 13.7212 16.193C13.7482 16.211 13.7752 16.238 13.7932 16.256C14.0811 16.544 14.2701 16.5979 14.342 16.6159C14.387 16.6159 14.459 16.6339 14.612 16.481L16.1506 15.0143C17.0954 14.0695 18.8231 14.0515 19.8038 15.0323L22.2963 17.5877C22.6202 17.9117 22.8002 18.3526 22.8002 18.8204C22.8002 19.2883 22.6112 19.7293 22.2873 20.0532C20.4517 21.8798 18.0312 22.7886 15.5748 22.7886L15.6018 22.8246Z" fill="#024588"/>
                    </svg>
                  </span>
                  <span v-if="library.phone">{{ library.phone }}</span>
                  <span v-else class="phone-placeholder">&nbsp;</span>
                </p>
                <div class="hours">
                  <strong>Horario de atención:</strong>
                  <p>{{ library.hours.weekdays }}</p>
                  <p>{{ library.hours.saturday }}</p>
                </div>
                <div class="map-link-container">
                  <a :href="library.mapUrl || '#'" :target="library.mapUrl ? '_blank' : '_self'" :rel="library.mapUrl ? 'noopener noreferrer' : ''" class="map-link">
                    Ver ubicación en el mapa
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.1412 10.8663L15.3471 3.77483C15.0047 3.42341 14.446 3.40539 14.0946 3.7478C13.7432 4.09021 13.7252 4.64888 14.0676 5.0003L20.3841 11.5962H2.10127C1.60568 11.5962 1.2002 12.0017 1.2002 12.4973C1.2002 12.9928 1.60568 13.3983 2.10127 13.3983H20.3841L14.0676 19.9942C13.7252 20.3457 13.7432 20.9133 14.0946 21.2467C14.2658 21.4089 14.4911 21.49 14.7074 21.49C14.9416 21.49 15.1759 21.3999 15.3471 21.2197L22.1683 14.1012C23.0153 13.137 23.0153 11.8485 22.1412 10.8663Z" fill="currentColor"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-controls">
        <button 
          class="carousel-btn"
          :disabled="windowWidth <= 768 ? isAtStart : currentIndex === 0"
          @click="previousSlide"
        >
          <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.11127 18.0301C7.87646 18.0301 7.64164 17.9398 7.47005 17.7592L0.660453 10.6516C-0.215582 9.65812 -0.215582 8.36664 0.63336 7.40932L7.47005 0.2746C7.81324 -0.0776207 8.37318 -0.0956822 8.7254 0.247507C9.07762 0.590696 9.09568 1.15064 8.75249 1.50286L1.9429 8.61048C1.70808 8.88142 1.70808 9.15236 1.96999 9.45039L8.75249 16.5309C9.09568 16.8832 9.07762 17.4521 8.7254 17.7863C8.55381 17.9488 8.32802 18.0301 8.11127 18.0301Z" fill="currentColor"/>
          </svg>
        </button>
        <div class="carousel-dots">
          <span 
            v-for="(page, index) in totalCarouselPages"
            :key="index"
            :class="['dot', { active: index === currentIndex }]"
            @click="goToSlide(index)"
          ></span>
        </div>
        <button 
          class="carousel-btn"
          :disabled="windowWidth <= 768 ? isAtEnd : currentIndex >= totalCarouselPages - 1"
          @click="nextSlide"
        >
          <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.888728 18.0301C0.662946 18.0301 0.446195 17.9488 0.2746 17.7863C-0.07762 17.4431 -0.0956828 16.8832 0.247506 16.5309L7.0571 9.4233C7.29192 9.15236 7.29192 8.88142 7.03001 8.58339L0.247506 1.50286C-0.0956828 1.15064 -0.07762 0.581664 0.2746 0.247506C0.626821 -0.0956827 1.19579 -0.0776201 1.52995 0.2746L8.33955 7.38223C9.21558 8.36664 9.21558 9.66715 8.36664 10.6245L1.52995 17.7592C1.35836 17.9398 1.12354 18.0301 0.888728 18.0301Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
// Contexto para las imágenes de la nueva carpeta "Encuentra tu Biblioteca"
const libraryImages = require.context('@/assets/images/Encuentra tu Biblioteca', false, /\.png$/);

export default {
  name: 'BibliotecasSection',
  data() {
    return {
      selectedRegion: 'metropolitana',
      currentIndex: 0,
      libraries: [],
      searchQuery: '',
      regions: [
        { id: 'norte', name: 'Zona Norte' },
        { id: 'centro-costa', name: 'Zona Centro' },
        { id: 'metropolitana', name: 'Región Metropolitana' },
        { id: 'sur', name: 'Zona Sur' }
      ],
      windowWidth: window.innerWidth,
      isAtStart: true,
      isAtEnd: false,
      showSuggestions: false,
      selectedLibraryId: null,
      isLibrosPorSede: true,
      isLibrosDigitales: false
    }
  },
  computed: {
    searchSuggestions() {
      if (!this.searchQuery.trim()) {
        return []
      }
      
      const query = this.searchQuery.toLowerCase().trim()
      const startsWithMatches = []
      const containsMatches = []
      
      // Buscar en todas las bibliotecas
      this.libraries.forEach(lib => {
        const libName = lib.name.toLowerCase()
        // Extraer solo la parte del nombre después de "Biblioteca " si existe
        const nameWithoutPrefix = libName.replace(/^biblioteca\s+/, '')
        
        // Extraer ciudad de la dirección si no existe el campo city
        let cityName = ''
        if (lib.city) {
          cityName = lib.city.toLowerCase()
        } else if (lib.address) {
          // Intentar extraer la ciudad de la dirección (última parte después de la coma)
          const addressParts = lib.address.split(',')
          if (addressParts.length > 1) {
            cityName = addressParts[addressParts.length - 1].trim().toLowerCase()
          }
        }
        
        // Verificar si el nombre (sin prefijo "Biblioteca ") comienza con la búsqueda (prioridad máxima)
        const nameStartsWith = nameWithoutPrefix.startsWith(query)
        // Verificar si la ciudad comienza con la búsqueda
        const cityStartsWith = cityName && cityName.startsWith(query)
        
        // Solo incluir si el nombre (sin prefijo) o la ciudad empiezan con la búsqueda
        if (nameStartsWith || cityStartsWith) {
          startsWithMatches.push(lib)
        }
      })
      
      // Combinar: primero las que empiezan, luego las que contienen
      const allSuggestions = [...startsWithMatches, ...containsMatches]
      
      // Limitar a 5 sugerencias
      return allSuggestions.slice(0, 5)
    },
    filteredLibraries() {
      let filtered = this.libraries
      
      // Si hay búsqueda, buscar en todas las regiones
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase().trim()
        
        // Mapeo de términos de búsqueda a IDs de región
        const regionMap = {
          'norte': 'norte',
          'zona norte': 'norte',
          'centro': 'centro-costa',
          'zona centro': 'centro-costa',
          'centro costa': 'centro-costa',
          'zona centro costa': 'centro-costa',
          'metropolitana': 'metropolitana',
          'región metropolitana': 'metropolitana',
          'region metropolitana': 'metropolitana',
          'zona región metropolitana': 'metropolitana',
          'zona region metropolitana': 'metropolitana',
          'sur': 'sur',
          'zona sur': 'sur'
        }
        
        // Verificar si la búsqueda coincide con una región
        const matchedRegion = regionMap[query]
        
        if (matchedRegion) {
          // Si la búsqueda es una región, filtrar por esa región
          filtered = filtered.filter(lib => lib.region === matchedRegion)
        } else {
          // Si no es una región, buscar en nombre, dirección, ciudad o región
          filtered = filtered.filter(lib => {
            const regionName = this.getRegionName(lib.region)
            return (
              lib.name.toLowerCase().includes(query) ||
              lib.address.toLowerCase().includes(query) ||
              (lib.city && lib.city.toLowerCase().includes(query)) ||
              regionName.toLowerCase().includes(query)
            )
          })
        }
      } else {
        // Si no hay búsqueda, filtrar solo por región seleccionada
        filtered = filtered.filter(lib => lib.region === this.selectedRegion)
      }
      
      return filtered
    },
    totalCarouselPages() {
      if (this.windowWidth <= 768) {
        // Mobile: muestra 1.2 elementos por vista, pero avanza de 1 en 1
        // El último slide debe mostrar el último elemento completo
        const totalItems = this.filteredLibraries.length
        
        if (totalItems <= 1) {
          return 1
        }
        
        // Si hay más de 1 elemento, calculamos cuántos slides necesitamos
        // Cada slide muestra 1 elemento completo + parte del siguiente (0.2)
        // El último slide muestra solo el último elemento completo
        return totalItems
      } else {
        // Desktop: siempre muestra 4 cards completas por vista
        // Pero avanza de 1 en 1
        const itemsPerView = 4
        const itemsPerSlide = 1 // Avanzar de 1 en 1 en desktop
        const totalItems = this.filteredLibraries.length
        
        if (totalItems <= itemsPerView) {
          return 1
        }
        
        // Calcular cuántos slides necesitamos avanzando de 1 en 1
        const remainingAfterFirst = totalItems - itemsPerView
        return Math.ceil(remainingAfterFirst / itemsPerSlide) + 1
      }
    },
    carouselTransform() {
      if (this.filteredLibraries.length === 0) return 0
      
      const isMobile = this.windowWidth <= 768
      const itemsPerView = isMobile ? 1.2 : 4
      const totalItems = this.filteredLibraries.length
      
      // Para slides normales y último slide
      if (isMobile) {
        // En mobile: cada slide avanza el ancho de 1 card (92%)
        const slideMove = 92
        const isLastSlide = this.currentIndex >= this.totalCarouselPages - 1
        
        // Si estamos en el último slide, ajustar para que el último elemento quede completo
        if (isLastSlide && totalItems > 1) {
          // En el último slide, calcular el desplazamiento para mostrar el último elemento completo
          // sin desplazarlo demasiado a la izquierda
          const itemsBeforeLast = totalItems - 1
          
          // Desplazarnos por los elementos anteriores, pero ajustado para que
          // el último elemento quede completamente visible sin cortarse
          return (itemsBeforeLast - 0.1) * slideMove
        }
        
        // Para slides normales, usar el desplazamiento estándar
        return this.currentIndex * slideMove
      } else {
        // En desktop: avanzar de 1 en 1 elemento
        const containerWidth = this.$refs.carouselWrapper ? this.$refs.carouselWrapper.clientWidth : this.windowWidth
        if (containerWidth > 0) {
          // Calcular el ancho de una card incluyendo el gap
          const gapSize = 12
          const totalGaps = (itemsPerView - 1) * gapSize // Gaps entre las cards visibles
          const cardWidth = (containerWidth - totalGaps) / itemsPerView
          // Avanzar 1 card + 1 gap
          const slideMove = cardWidth + gapSize
          return (this.currentIndex * slideMove / containerWidth) * 100
        }
        // Fallback si no hay ancho disponible
        const cardWidthPercent = 100 / itemsPerView
        const gapSize = 12
        const gapPercent = (gapSize / this.windowWidth) * 100
        // Avanzar 1 elemento: 1 card + 1 gap (solo si no es el primero)
        const slideMove = cardWidthPercent + gapPercent
        return this.currentIndex * slideMove
      }
    }
  },
  async mounted() {
    await this.loadLibraries()
    window.addEventListener('resize', this.handleResize)
    window.addEventListener('region-selected', this.handleRegionSelected)
    this.checkLibrosPorSede()
    // Escuchar cambios en el botón de HeroSection
    setInterval(() => {
      this.checkLibrosPorSede()
    }, 100)
    
    // Verificar si hay una región seleccionada desde sessionStorage
    const selectedRegion = sessionStorage.getItem('selectedRegion')
    if (selectedRegion) {
      // Esperar un poco para que el componente esté completamente renderizado
      setTimeout(() => {
        this.selectRegion(selectedRegion)
        sessionStorage.removeItem('selectedRegion')
      }, 300)
    }
    
    this.$nextTick(() => {
      if (this.$refs.carouselWrapper && this.windowWidth <= 768) {
        this.$refs.carouselWrapper.addEventListener('scroll', this.handleScroll)
        this.updateScrollButtons()
      }
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('region-selected', this.handleRegionSelected)
    if (this.$refs.carouselWrapper) {
      this.$refs.carouselWrapper.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    handleImageError(event) {
      // Si la imagen falla al cargar, mostrar placeholder
      event.target.style.display = 'none'
      const placeholder = event.target.parentElement.querySelector('.image-placeholder')
      if (placeholder) {
        placeholder.style.display = 'block'
      } else {
        const placeholderDiv = document.createElement('div')
        placeholderDiv.className = 'image-placeholder'
        event.target.parentElement.appendChild(placeholderDiv)
      }
    },
    getLibraryImage(library) {
      if (!library || !library.id) return '';
      
      try {
        const keys = libraryImages.keys();
        // Buscar la imagen que comienza con el ID de la biblioteca (ej: "1_", "10_")
        // Usamos una expresión regular para asegurar que el ID vaya seguido de un guión bajo
        const imageKey = keys.find(key => key.startsWith(`./${library.id}_`));
        
        if (imageKey) {
          return libraryImages(imageKey);
        }
        
        // Si no se encuentra la imagen, retornar string vacío (se mostrará placeholder)
        return '';
      } catch (e) {
        // Si hay error, retornar string vacío (se mostrará placeholder)
        return '';
      }
    },
    checkLibrosPorSede() {
      const tabButton = document.querySelector('.tab.active')
      if (tabButton) {
        const buttonText = tabButton.textContent.trim()
        this.isLibrosPorSede = buttonText === 'Libros por sede'
        this.isLibrosDigitales = buttonText === 'Libros digitales'
      } else {
        this.isLibrosPorSede = false
        this.isLibrosDigitales = false
      }
    },
    async loadLibraries() {
      // Endpoint 'bibliotecas' no existe en Strapi, usar datos locales
      // try {
      //   const response = await strapiService.getCollection('bibliotecas', {
      //     populate: '*'
      //   })
      //   this.libraries = response.data || []
      // } catch (error) {
      //   // Datos de ejemplo
      // }
      // Usar datos locales directamente
      this.libraries = [
          // Región Metropolitana
          {
            id: 8,
            name: 'Barrio Universitario Biblioteca Grajales',
            address: 'Grajales 2550, Santiago',
            email: 'dae.bus@aiep.cl',
            phone: '',
            region: 'metropolitana', 
            mapUrl: 'https://maps.app.goo.gl/AXF2cbcf1cw6bU3Q8',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 9,
            name: 'Barrio Universitario Biblioteca Ejército',
            address: 'Ejército 49, Santiago Centro',
            email: 'dae.bus@aiep.cl',
            phone: '',
            region: 'metropolitana', 
            mapUrl: 'https://maps.app.goo.gl/qfznj2WaMduGuQqJ8',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 10,
            name: 'Biblioteca Bellavista',
            address: 'Bellavista 0121, Providencia',
            email: 'dae.bellavista@aiep.cl',
            phone: '',
            region: 'metropolitana', 
            mapUrl: 'https://maps.app.goo.gl/BmkwVnb9eo8wdgni9',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 09:00 a 21:30 horas',
              saturday: 'Sábados de 08:30 a 18:30 horas'
            }
          },
          {
            id: 11,
            name: 'Biblioteca Maipú',
            address: 'Chacabuco 40, 5to Piso, Maipú, Región Metropolitana',
            email: 'dae.maipu@aiep.cl',
            phone: '',
            region: 'metropolitana', 
            mapUrl: 'https://maps.app.goo.gl/2yugBRqhuwo1ondx7',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:30 a 18:00 horas'
            }
          },
          {
            id: 12,
            name: 'Biblioteca San Joaquín',
            address: 'Vicuña Mackenna 4685, Macul, Región Metropolitana',
            email: 'dae.sanjoaquin@aiep.cl',
            phone: '2 32014507',
            region: 'metropolitana', 
            mapUrl: 'https://maps.app.goo.gl/peYUhQW1zk4eK9iW7',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 13,
            name: 'Biblioteca Santiago Norte',
            address: 'Av. Vespucio Norte #1796, Huechuraba, Santiago',
            email: 'daesantiagonorte@aiep.cl',
            phone: '',
            region: 'metropolitana', 
            mapUrl: 'https://maps.app.goo.gl/i63oG3kZ6mLS6twK8',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:30 a 18:00 horas'
            }
          },
          {
            id: 14,
            name: 'Biblioteca San Bernardo',
            address: 'Av. San José 672, San Bernardo',
            email: 'dae.sanbernardo@aiep.cl',
            phone: '55 2572303, 55 2572301',
            region: 'metropolitana', 
            mapUrl: 'https://maps.app.goo.gl/U8PArLeKe2hnkNit8',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          // Zona Norte
          {
            id: 1,
            name: 'Biblioteca Calama',
            address: 'Balmaceda 3242, Calama',
            email: 'biblioteca.calama@aiep.cl',
            phone: '55-2572400',
            region: 'norte', 
            mapUrl: 'https://maps.app.goo.gl/LESfNhBNZY3zLXob9',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 09:00 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 3,
            name: 'Biblioteca La Serena',
            address: 'Huanhuali 105, La Serena',
            email: 'dae.laserena@aiep.cl',
            phone: '51-2541553- 51-2541542',
            region: 'norte', 
            mapUrl: 'https://maps.app.goo.gl/Xxhd9sVsqowCJyQM9',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 09:00 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 2,
            name: 'Biblioteca Antofagasta',
            address: 'San Martín 2341, Antofagasta',
            email: 'dae.antofagasta@aiep.cl',
            phone: '55 2572303, 55 2572301',
            region: 'norte', 
            mapUrl: 'https://maps.app.goo.gl/VuYZuzaHB5FfUp8w6',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 09:00 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          // Centro Costa
          {
            id: 4,
            name: 'Biblioteca San Felipe',
            address: 'Yungay 1580, San Felipe',
            email: 'dae.sanfelipe@aiep.cl',
            phone: '34 2352808',
            region: 'centro-costa', 
            mapUrl: 'https://maps.app.goo.gl/nb9kZV7oVC1oHdgZ6',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 09:00 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 5,
            name: 'Biblioteca Álvarez (Viña del Mar)',
            address: 'Álvarez 860, Viña del Mar',
            email: 'dae.vinadelmar@aiep.cl',
            phone: '',
            region: 'centro-costa', 
            mapUrl: 'https://maps.app.goo.gl/ibXZbaHmB3TfrKnZ9',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 09:00 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 6,
            name: 'Biblioteca Valparaíso',
            address: 'Errázuriz 641, Valparaíso',
            email: 'dae.valparaiso@aiep.cl',
            phone: '',
            region: 'centro-costa', 
            mapUrl: 'https://maps.app.goo.gl/6XaGrRMSWsKXSR2HA',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 09:00 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 7,
            name: 'Biblioteca San Antonio',
            address: 'General Ibañez 1760, San Antonio',
            email: 'dae.sanantonio@aiep.cl',
            phone: '',
            region: 'centro-costa', 
            mapUrl: 'https://maps.app.goo.gl/pouJ5Yo1R9ZcdM1V8',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:30 a 18:00 horas'
            }
          },
          // Zona Sur
          {
            id: 15,
            name: 'Biblioteca Rancagua',
            address: 'German Riesco N° 63 - 1° piso Edificio D',
            email: 'dae.rancagua@aiep.cl',
            phone: '',
            region: 'sur', 
            mapUrl: 'https://maps.app.goo.gl/Wo2s9Raftc4aNb5m9',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:30 a 18:00 horas'
            }
          },
          {
            id: 16,
            name: 'Biblioteca San Fernando',
            address: 'Carampagne 1058, San Fernando',
            email: 'dae.sanfernando@aiep.cl',
            phone: '',
            region: 'sur', 
            mapUrl: 'https://maps.app.goo.gl/URpmqncDuke8bTDa6',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:30 a 18:00 horas'
            }
          },
          // Zona Sur
          {
            id: 19,
            name: 'Biblioteca Barros, Concepción',
            address: 'Barros Arana 302, Concepción',
            email: 'dae.concepcion@aiep.cl',
            phone: '',
            region: 'sur', 
            mapUrl: 'https://maps.app.goo.gl/WVSzdRQZchfDoHy97',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 20,
            name: 'Biblioteca Prat, Concepción',
            address: 'Avda. Prat 288, Concepción',
            email: 'dae.concepcion@aiep.cl',
            phone: '',
            region: 'sur', 
            mapUrl: 'https://maps.app.goo.gl/co8pQh7MCpndqr639',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 08:30 a 18:30 horas'
            }
          },
          {
            id: 22,
            name: 'Biblioteca Temuco',
            address: 'Avda. Alemania 035, Temuco',
            email: 'dae.temuco@aiep.cl',
            phone: '',
            region: 'sur', 
            mapUrl: 'https://maps.app.goo.gl/MNULu63JjZRKgskV8',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 17,
            name: 'Biblioteca Curicó',
            address: 'Avenida Libertador Bernardo O\'Higgins 201, Curicó, Maule',
            email: 'dae.Curicó@aiep.cl',
            phone: '075-2574513 - 075-2574506',
            region: 'sur', 
            mapUrl: 'https://maps.app.goo.gl/CD7L7PLQikVJ5bng9',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:30 a 18:00 horas'
            }
          },
          {
            id: 18,
            name: 'Biblioteca Talca',
            address: '6 Oriente 1380, Talca',
            email: 'dae.talca@aiep.cl',
            phone: '',
            region: 'sur', 
            mapUrl: 'https://maps.app.goo.gl/DdDUUxzNQLQBH7r17',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:30 a 18:00 horas'
            }
          },
          {
            id: 23,
            name: 'Biblioteca Osorno',
            address: 'Patricio Lynch 1462, Osorno',
            email: 'dae.osorno@aiep.cl',
            phone: '',
            region: 'sur', 
            mapUrl: 'https://maps.app.goo.gl/eQSYCHmoko9f3dpo9',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'S8:30 a 18:30 horas'
            }
          },
          {
            id: 24,
            name: 'Biblioteca Ejército, Puerto Montt',
            address: 'Ejército 200, Puerto Montt',
            email: 'dae.puertomontt@aiep.cl',
            phone: '',
            region: 'sur', 
            mapUrl: 'https://maps.app.goo.gl/VAj7wy4eYFrRiHot5',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 25,
            name: 'Biblioteca Benavente, Puerto Montt',
            address: 'Benavente 720, Puerto Montt',
            email: 'dae.puertomontt@aiep.cl',
            phone: '',
            region: 'sur', 
            mapUrl: 'https://maps.app.goo.gl/QZV28EjhUqZJzA1G7',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 26,
            name: 'Biblioteca Castro',
            address: 'O\'Higgins 801',
            email: 'dae.castro@aiep.cl',
            phone: '65 2386894 - 65 2386877',
            region: 'sur', 
            mapUrl: 'https://maps.app.goo.gl/QZV28EjhUqZJzA1G7',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:30 a 18:00 horas'
            }
          },
          {
            id: 21,
            name: 'Biblioteca Los Ángeles',
            address: 'Mendoza 438, Los Ángeles',
            email: 'dae.losangeles@aiep.cl',
            phone: '',
            region: 'sur', 
            mapUrl: 'https://maps.app.goo.gl/oj4A1fk4Z38dS62VA',
            imageUrl: '', 
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 08:30 a 18:30 horas'
            }
          }
        ]
    },
    selectRegion(regionId) {
      // Si se hace clic en una zona, limpiar la búsqueda para mostrar todas las bibliotecas de esa zona
      this.searchQuery = ''
      this.selectedRegion = regionId
      this.currentIndex = 0
      this.selectedLibraryId = null
      
      this.$nextTick(() => {
        this.updateScrollButtons()
      })
    },
    handleRegionSelected(event) {
      // Manejar el evento cuando se selecciona una región desde el header
      if (event && event.detail && event.detail.regionId) {
        const regionId = event.detail.regionId
        // Verificar que la región existe
        const regionExists = this.regions.some(r => r.id === regionId)
        if (regionExists) {
          this.selectRegion(regionId)
        }
      }
    },
    handleSearch() {
      // Mapeo de términos de búsqueda a IDs de región
      const regionMap = {
        'norte': 'norte',
        'zona norte': 'norte',
        'centro costa': 'centro-costa',
        'zona centro costa': 'centro-costa',
        'metropolitana': 'metropolitana',
        'región metropolitana': 'metropolitana',
        'region metropolitana': 'metropolitana',
        'zona región metropolitana': 'metropolitana',
        'zona region metropolitana': 'metropolitana',
        'sur': 'sur',
        'zona sur': 'sur'
      }
      
      const query = this.searchQuery.toLowerCase().trim()
      const matchedRegion = regionMap[query]
      
      // Si la búsqueda coincide con una región, cambiar la región seleccionada
      if (matchedRegion) {
        this.selectedRegion = matchedRegion
      }
      
      this.currentIndex = 0
      this.showSuggestions = true
      this.$nextTick(() => {
        this.updateScrollButtons()
      })
    },
    handleBlur() {
      // Esperar un poco antes de ocultar para permitir el click en las sugerencias
      setTimeout(() => {
        this.showSuggestions = false
      }, 200)
    },
    selectLibrary(library) {
      this.searchQuery = library.name
      this.selectedRegion = library.region
      this.selectedLibraryId = library.id
      this.showSuggestions = false
      this.currentIndex = 0
      
      this.$nextTick(() => {
        // Hacer scroll a la sección de bibliotecas
        const bibliotecasSection = document.getElementById('bibliotecas')
        if (bibliotecasSection) {
          bibliotecasSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
        
        // Esperar un poco y luego resaltar la card
        setTimeout(() => {
          this.highlightLibraryCard(library.id)
        }, 500)
        
        this.updateScrollButtons()
      })
    },
    highlightLibraryCard(libraryId) {
      this.$nextTick(() => {
        // Remover resaltado anterior
        const previousHighlighted = document.querySelector('.library-card.highlighted')
        if (previousHighlighted) {
          previousHighlighted.classList.remove('highlighted')
        }
        
        // Resaltar la nueva card
        const cards = document.querySelectorAll('.library-card')
        cards.forEach(card => {
          const nameElement = card.querySelector('.library-name')
          if (nameElement) {
            const cardLibrary = this.filteredLibraries.find(lib => lib.name === nameElement.textContent.trim())
            if (cardLibrary && cardLibrary.id === libraryId) {
              card.classList.add('highlighted')
              
              // Hacer scroll a la card
              if (this.windowWidth > 768) {
                // En desktop, hacer scroll al contenedor del carrusel
                const carouselContainer = card.closest('.carousel-container')
                if (carouselContainer) {
                  card.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' })
                }
              } else {
                // En mobile, hacer scroll nativo
                card.scrollIntoView({ behavior: 'smooth', block: 'center' })
              }
              
              // Remover el resaltado después de 3 segundos
              setTimeout(() => {
                card.classList.remove('highlighted')
                this.selectedLibraryId = null
              }, 3000)
            }
          }
        })
      })
    },
    getRegionName(regionId) {
      const region = this.regions.find(r => r.id === regionId)
      return region ? region.name : ''
    },
    previousSlide() {
      if (this.windowWidth <= 768) {
        // En mobile, usar scroll nativo
        this.scrollLeft()
      } else {
        // En desktop, usar el sistema de índices
      if (this.currentIndex > 0) {
        this.currentIndex--
        }
      }
    },
    nextSlide() {
      if (this.windowWidth <= 768) {
        // En mobile, usar scroll nativo
        this.scrollRight()
      } else {
        // En desktop, usar el sistema de índices
      if (this.currentIndex < this.totalCarouselPages - 1) {
        this.currentIndex++
        }
      }
    },
    goToSlide(index) {
      this.currentIndex = index
    },
    scrollLeft() {
      if (this.$refs.carouselWrapper) {
        const card = this.$refs.carouselWrapper.querySelector('.library-card')
        if (card) {
          const cardWidth = card.offsetWidth
          const gap = 16
          const scrollAmount = cardWidth + gap
          this.$refs.carouselWrapper.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
          })
        }
      }
    },
    scrollRight() {
      if (this.$refs.carouselWrapper) {
        const card = this.$refs.carouselWrapper.querySelector('.library-card')
        if (card) {
          const cardWidth = card.offsetWidth
          const gap = 16
          const scrollAmount = cardWidth + gap
          this.$refs.carouselWrapper.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          })
        }
      }
    },
    handleScroll() {
      this.updateScrollButtons()
    },
    updateScrollButtons() {
      if (this.$refs.carouselWrapper && this.windowWidth <= 768) {
        const container = this.$refs.carouselWrapper
        const scrollLeft = container.scrollLeft
        const scrollWidth = container.scrollWidth
        const clientWidth = container.clientWidth
        
        this.isAtStart = scrollLeft <= 0
        this.isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1
      }
    },
    handleResize() {
      this.windowWidth = window.innerWidth
      this.$nextTick(() => {
        if (this.$refs.carouselWrapper && this.windowWidth <= 768) {
          this.$refs.carouselWrapper.addEventListener('scroll', this.handleScroll)
          this.updateScrollButtons()
        }
      })
    }
  }
}
</script>

<style scoped>
.bibliotecas-section {
  padding: 60px 0;
  background: #F8F8F8;
}

.section-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  margin-bottom: 40px;
  text-align: center;
}

.section-title {
  font-size: 36px;
  color: #024588;
  margin: 0;
  white-space: nowrap;
  text-align: center;
}

.section-subtitle {
  color: #39475F;
  font-size: 18px;
  font-family: Verdana, sans-serif;
  margin: 0;
  text-align: center;
}

.filters-wrapper {
  margin-bottom: 40px;
}

.filters-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.region-tabs {
  display: flex;
  justify-content: flex-start;
  gap: 8px;
  flex-wrap: wrap;
  flex: 1;
}

.region-tab {
  padding: 12px 24px;
  border: none;
  background: #F8F8F8;
  color: #024588;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 16px;
  font-family: 'Ubuntu', sans-serif;
  flex: 1;
  min-width: 0;
  text-align: center;
  white-space: nowrap;
}

.region-tab.active {
  background: #024588;
  color: var(--white);
}

.region-tab.region-metropolitana {
  text-align: left;
  padding-left: 16px;
}

/* Centrar Región Metropolitana siempre en desktop */
@media (min-width: 769px) {
  .region-tab.region-metropolitana {
    text-align: center;
    padding: 12px 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    flex: 0 0 auto;
  }
  
  .region-tab.region-metropolitana.active {
    text-align: center;
    padding: 12px 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    flex: 0 0 auto;
  }
  
  .region-tab.region-metropolitana.libros-digitales-active {
    text-align: center;
    padding: 12px 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 200px;
    flex: 0 0 auto;
  }
}

.region-tab:hover:not(.active) {
  background: var(--light-blue);
  color: var(--primary-blue);
}

.search-container {
  position: relative;
  flex-shrink: 0;
  min-width: 350px;
  width: 350px;
}

@media (min-width: 769px) {
  .search-container {
    min-width: 340px;
    width: 340px;
  }
}

/* Ocultar buscador en desktop cuando Libros digitales está activo */
@media (min-width: 769px) {
  .search-container.hide-on-libros-digitales-desktop {
    display: none;
  }
}

.library-search {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: 1px solid #024588;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Ubuntu', sans-serif;
  color: var(--text-dark);
  background: var(--white);
  transition: all 0.3s;
}

.library-search:focus {
  outline: none;
  border-color: #024588;
  box-shadow: 0 0 0 3px rgba(2, 69, 136, 0.1);
}

.library-search::placeholder {
  color: var(--text-light);
  font-family: 'Ubuntu', sans-serif;
  font-weight: 400;
}

.search-icon {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 1;
}

.search-suggestions {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: var(--white);
  border: 1px solid var(--border-gray);
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
  margin-top: -1px;
}

.suggestion-item {
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
  color: var(--text-dark);
  font-size: 14px;
}

.suggestion-item:hover {
  background-color: var(--light-blue);
  color: var(--primary-blue);
}

.library-card.highlighted {
  border: 3px solid var(--primary-blue);
  box-shadow: 0 0 0 4px rgba(0, 51, 102, 0.2);
}

.region-select-container {
  display: none;
  justify-content: center;
  margin-bottom: 40px;
}

.region-select {
  padding: 12px 40px 12px 16px;
  border: 2px solid #102A8A;
  background: var(--white);
  color: #102A8A;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 16px;
  font-weight: 600;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23003366' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  min-width: 250px;
  width: 100%;
  max-width: 100%;
}

.region-select:hover {
  border-color: var(--secondary-blue);
}

.region-select:focus {
  outline: none;
  border-color: var(--secondary-blue);
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.libraries-carousel {
  overflow: visible;
  margin-bottom: 30px;
  position: relative;
}

.carousel-wrapper {
  overflow: hidden;
  width: 100%;
  padding-right: 0;
  padding-left: 0;
  position: relative;
}

.carousel-wrapper.is-last-slide {
  padding-right: 0;
}

/* Faded effect para Libros digitales en desktop */
@media (min-width: 769px) {
  .carousel-wrapper.libros-digitales::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 65px;
    background: #ffffff94;
    pointer-events: none;
    z-index: 10;
  }
}

.carousel-container {
  display: flex;
  transition: transform 0.5s ease;
  gap: 24px;
}

.library-card {
  width: calc((100% - 72px) / 4);
  min-width: calc((100% - 72px) / 4);
  flex-shrink: 0;
  background: var(--white);
  border-radius: 8px;
  border: 2px solid var(--border-gray);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.library-card.libros-por-sede {
  width: calc((100% - 72px) / 4);
  min-width: calc((100% - 72px) / 4);
}

.library-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, var(--secondary-blue) 0%, var(--primary-blue) 100%);
  position: relative;
  overflow: hidden;
}

.library-image-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.library-card.libros-por-sede .library-image {
  height: 149px;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0,102,204,0.3) 0%, rgba(0,51,102,0.3) 100%);
}

.image-placeholder.split-image {
  width: 290px;
  height: 149px;
  background: linear-gradient(135deg, rgba(0,102,204,0.3) 0%, rgba(0,51,102,0.3) 100%);
}

.image-top {
  width: 290px;
  height: 149px;
  background: linear-gradient(135deg, rgba(0,102,204,0.3) 0%, rgba(0,51,102,0.3) 100%);
  flex-shrink: 0;
}

.library-name {
  font-size: 20px;
  color: var(--primary-blue);
  padding: 20px 20px 0;
  margin-bottom: 16px;
}

.library-info {
  padding: 0 20px 8px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: var(--text-dark);
  font-family: Verdana, sans-serif;
  font-size: 12px;
}

.icon {
  font-size: 16px;
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.icon-hidden {
  visibility: hidden;
}

.phone-placeholder {
  opacity: 0;
  min-height: 1em;
  display: inline-block;
}

.icon svg {
  width: 24px;
  height: 24px;
}

.hours {
  margin: 16px 0;
  padding: 0;
  background: transparent;
}

.hours strong {
  display: block;
  margin-bottom: 8px;
  color: var(--text-dark);
  font-weight: 600;
  font-family: Verdana, sans-serif;
  font-size: 12px;
}

.hours p {
  margin: 4px 0;
  font-size: 12px;
  color: var(--text-dark);
  font-weight: 400;
  font-family: Verdana, sans-serif;
}

.map-link-container {
  margin-top: auto;
  padding-top: 15px;
  padding-bottom: 0;
  margin-bottom: 0;
  border-top: 1px solid var(--border-gray);
  text-align: right;
  padding-right: 0;
}

.map-link {
  color: #0065DC;
  text-decoration: none;
  font-weight: bold;
  font-family: 'Ubuntu', sans-serif;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding-right: 4px;
  transition: all 0.3s ease;
}

.map-link:hover {
  color: #A3C5E6;
}

.map-link:focus {
  color: #024588;
  outline: none;
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.carousel-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background: #024588;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  color: #FFFFFF;
  padding: 0;
}

.carousel-btn:hover:not(:disabled),
.carousel-btn:active:not(:disabled) {
  background: #D7E5F4;
  color: #024588;
}

.carousel-btn:disabled {
  background: #D1D4DA;
  color: #8B93A1;
  cursor: not-allowed;
}

.carousel-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--border-gray);
  cursor: pointer;
  transition: all 0.3s;
}

.dot.active {
  background: var(--primary-blue);
  width: 12px;
  height: 12px;
}

@media (min-width: 769px) {
  .bibliotecas-section .container {
    max-width: 1200px;
  }
  
  .library-name {
    color: #024588;
    font-size: 18px;
    padding: 21px 20px 0;
    margin-bottom: 7px;
    line-height: 1.4;
    min-height: 72px;
    display: flex;
    align-items: flex-start;
  }
  
  .library-card {
    width: calc((100% - 36px) / 4);
    min-width: calc((100% - 36px) / 4);
  }
  
  .library-card.libros-por-sede {
    width: calc((100% - 36px) / 4);
    min-width: calc((100% - 36px) / 4);
  }
  
  .carousel-container {
    gap: 12px;
  }
  
  .library-image {
    height: 160px;
  }
  
  .library-card.libros-por-sede .library-image {
    height: 153px;
  }
  
  .library-card.libros-por-sede .image-placeholder.split-image {
    width: 240px;
    height: 110px;
  }
  
  .library-card.libros-por-sede .image-top {
    width: 240px;
    height: 110px;
  }
  
  .library-info {
    padding: 0 20px 8px;
  }
  
  .info-item {
    margin-bottom: 10px;
    min-width: 0;
    word-wrap: break-word;
    overflow-wrap: break-word;
    line-height: 1.4;
  }
  
  .info-item:first-of-type {
    min-height: 40px;
    display: flex;
    align-items:center;
  }
  
  .info-item:nth-of-type(2) {
    min-height: 32px;
    display: flex;
    align-items: center;
  }
  
  .info-item:nth-of-type(3) {
    min-height: 32px;
    display: flex;
    align-items: center;
    margin-bottom: 0;
  }
  
  .info-item .icon {
    flex-shrink: 0;
  }
  
  .hours {
    margin: 12px 0;
  }
  
  .map-link-container {
    padding-top: 12px;
  }
  
  .map-link {
    font-size: 14px;
    transform: translateY(-4px);
    display: inline-flex;
  }
}

@media (max-width: 968px) {
  .library-card {
    min-width: calc(50% - 12px);
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 30px;
    white-space: nowrap;
  }
  
  .filters-wrapper {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  
  .filters-container {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
    order: 2; /* El buscador va abajo */
    margin-top: 16px;
  }
  
  .region-select-container {
    order: 1; /* El selector de región va arriba */
    margin-bottom: 0;
  }
  
  .region-tabs {
    justify-content: flex-start;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .region-tabs::-webkit-scrollbar {
    display: none;
  }
  
  .search-container {
    min-width: 100%;
    width: 100%;
  }
  
  
  .library-search {
    width: 100%;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .section-subtitle {
    font-size: 16px;
    text-align: left;
  }
  
  .carousel-wrapper {
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    padding-right: 20px;
  }
  
  .carousel-wrapper::-webkit-scrollbar {
    display: none;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  
  .carousel-container {
    gap: 12px;
    transform: none !important;
  }
  
  .library-card {
    width: 85%;
    min-width: 85%;
    scroll-snap-align: start;
  }
  
  /* En mobile, cuando Libros por sede está activo, usar el diseño por defecto (como Libros digitales) */
  .library-card.libros-por-sede {
    width: 85%;
    min-width: 85%;
  }
  
  .library-card.libros-por-sede .library-image {
    height: 200px;
  }
  
  .library-card.libros-por-sede .image-placeholder.split-image {
    width: 100%;
    height: 100%;
  }
  
  .library-card.libros-por-sede .image-top {
    display: none;
  }
  
  .carousel-dots {
    display: none;
  }
  
  .carousel-controls {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
  }
  
  .carousel-controls .carousel-btn {
    width: 48px;
    height: 48px;
  }
  
  .map-link-container {
    text-align: right;
    padding-top: 15px;
  }
  
  .map-link {
    position: relative;
    top: -7px;
  }
  
  .region-tabs {
    display: none;
  }
  
  .region-select-container {
    display: flex;
  }
  
  .region-select {
    width: 100%;
    max-width: 100%;
    min-width: auto;
    color: #102A8A;
    background-color: #F4F7FF;
    background-image: url("data:image/svg+xml,%3Csvg width='13' height='8' viewBox='0 0 13 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M4.87236 6.61146V6.60346L0.408363 2.33146C-0.111637 1.81946 -0.151637 0.963457 0.384363 0.419456C0.896363 -0.100543 1.74436 -0.148544 2.29636 0.387457L6.40836 4.33146L10.5124 0.379457C11.0564 -0.148544 11.9204 -0.116544 12.4324 0.419456C12.6804 0.683456 12.8004 1.02746 12.8004 1.34746C12.8004 1.69146 12.6644 2.05946 12.3844 2.32346L7.96036 6.57146H7.94436C7.03236 7.38746 5.77636 7.40346 4.87236 6.59546V6.61146Z' fill='%23102A8A'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 16px center;
    border-color: #102A8A;
  }
}
</style>

