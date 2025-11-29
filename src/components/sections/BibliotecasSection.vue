<template>
  <section id="bibliotecas" class="bibliotecas-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Encuentra tu Biblioteca</h2>
        <p class="section-subtitle">
          Selecciona tu región y ubica tu biblioteca AIEP más cercana
        </p>
      </div>
      <div class="region-tabs">
        <button 
          v-for="region in regions"
          :key="region.id"
          :class="['region-tab', { active: selectedRegion === region.id }]"
          @click="selectRegion(region.id)"
        >
          {{ region.name }}
        </button>
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
      <div class="libraries-carousel">
        <div class="carousel-wrapper" :class="{ 'is-last-slide': currentIndex >= totalCarouselPages - 1 }">
          <div class="carousel-container" :style="{ transform: `translateX(-${carouselTransform}%)` }">
            <div 
              v-for="library in filteredLibraries" 
              :key="library.id"
              class="library-card"
            >
              <div class="library-image">
                <div class="image-placeholder"></div>
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
                  <a href="#" class="map-link">Ver ubicación en el mapa →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="carousel-controls">
        <button 
          class="carousel-btn"
          :disabled="currentIndex === 0"
          @click="previousSlide"
        >
          ←
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
          :disabled="currentIndex >= totalCarouselPages - 1"
          @click="nextSlide"
        >
          →
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import strapiService from '../../services/strapi'

export default {
  name: 'BibliotecasSection',
  data() {
    return {
      selectedRegion: 'metropolitana',
      currentIndex: 0,
      libraries: [],
      regions: [
        { id: 'norte', name: 'Zona Norte' },
        { id: 'centro', name: 'Zona Centro' },
        { id: 'metropolitana', name: 'Región Metropolitana' },
        { id: 'sur', name: 'Zona Sur' }
      ],
      itemsPerSlide: 3.2,
      windowWidth: window.innerWidth
    }
  },
  computed: {
    filteredLibraries() {
      return this.libraries.filter(lib => lib.region === this.selectedRegion)
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
        // Desktop: avanza de 3 en 3, pero muestra 3.2 por vista
        const itemsPerView = 3.2
        const itemsPerSlide = 3
        const totalItems = this.filteredLibraries.length
        
        if (totalItems <= itemsPerView) {
          return 1
        }
        
        // Calcular cuántos slides necesitamos si avanzamos de 3 en 3
        const remainingAfterFirst = totalItems - itemsPerView
        return Math.ceil(remainingAfterFirst / itemsPerSlide) + 1
      }
    },
    carouselTransform() {
      if (this.filteredLibraries.length === 0) return 0
      
      const isMobile = this.windowWidth <= 768
      const itemsPerView = isMobile ? 1.2 : 3.2
      const itemsPerSlide = isMobile ? 1 : 3
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
        // En desktop: cada slide avanza de 3 elementos completos
        // Cada card ocupa aproximadamente: (100% - 48px) / 3.2
        // Para avanzar 3 elementos, necesitamos el ancho de 3 cards + 2 gaps (entre las 3 cards)
        const cardWidthPercent = 100 / itemsPerView
        const gapSize = 24
        const gapPercent = (gapSize / this.windowWidth) * 100
        // Avanzar de 3 elementos por slide: 3 cards + 2 gaps
        const slideMove = (cardWidthPercent * itemsPerSlide) + (gapPercent * (itemsPerSlide - 1))
        return this.currentIndex * slideMove
      }
    }
  },
  async mounted() {
    await this.loadLibraries()
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    async loadLibraries() {
      try {
        const response = await strapiService.getCollection('bibliotecas', {
          populate: '*'
        })
        this.libraries = response.data || []
      } catch (error) {
        console.error('Error loading libraries:', error)
        // Datos de ejemplo
        this.libraries = [
          // Región Metropolitana
          {
            id: 1,
            name: 'Biblioteca Grajales',
            address: 'Grajales 2550, Santiago',
            email: 'dae.bus@aiep.cl',
            phone: '',
            region: 'metropolitana',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 2,
            name: 'Biblioteca Ejército',
            address: 'Ejército 49, Santiago Centro',
            email: 'dae.bus@aiep.cl',
            phone: '',
            region: 'metropolitana',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 3,
            name: 'Biblioteca San Joaquín',
            address: 'Vicuña Mackenna 4685, Macul',
            email: 'dae.sanjoaquin@aiep.cl',
            phone: '2 32014507',
            region: 'metropolitana',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          // Zona Norte
          {
            id: 4,
            name: 'Biblioteca Antofagasta',
            address: 'Av. Angamos 601, Antofagasta',
            email: 'dae.antofagasta@aiep.cl',
            phone: '55 2635000',
            region: 'norte',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 5,
            name: 'Biblioteca La Serena',
            address: 'Av. Francisco de Aguirre 470, La Serena',
            email: 'dae.laserena@aiep.cl',
            phone: '51 2485000',
            region: 'norte',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 6,
            name: 'Biblioteca Iquique',
            address: 'Av. Arturo Prat 2120, Iquique',
            email: 'dae.iquique@aiep.cl',
            phone: '57 2425000',
            region: 'norte',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          // Zona Centro
          {
            id: 7,
            name: 'Biblioteca Valparaíso',
            address: 'Av. España 2250, Valparaíso',
            email: 'dae.valparaiso@aiep.cl',
            phone: '32 2505000',
            region: 'centro',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 8,
            name: 'Biblioteca Viña del Mar',
            address: 'Av. Libertad 1340, Viña del Mar',
            email: 'dae.vinadelmar@aiep.cl',
            phone: '32 2485000',
            region: 'centro',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 9,
            name: 'Biblioteca Rancagua',
            address: 'Av. Millán 341, Rancagua',
            email: 'dae.rancagua@aiep.cl',
            phone: '72 2235000',
            region: 'centro',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          // Zona Sur
          {
            id: 10,
            name: 'Biblioteca Concepción',
            address: 'Av. O\'Higgins 630, Concepción',
            email: 'dae.concepcion@aiep.cl',
            phone: '41 2265000',
            region: 'sur',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 11,
            name: 'Biblioteca Temuco',
            address: 'Av. Alemania 0280, Temuco',
            email: 'dae.temuco@aiep.cl',
            phone: '45 2405000',
            region: 'sur',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 12,
            name: 'Biblioteca Valdivia',
            address: 'Av. Ramón Picarte 1160, Valdivia',
            email: 'dae.valdivia@aiep.cl',
            phone: '63 2235000',
            region: 'sur',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          // Más bibliotecas Zona Norte
          {
            id: 13,
            name: 'Biblioteca Arica',
            address: 'Av. General Velásquez 1775, Arica',
            email: 'dae.arica@aiep.cl',
            phone: '58 2235000',
            region: 'norte',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 14,
            name: 'Biblioteca Copiapó',
            address: 'Av. Copayapu 485, Copiapó',
            email: 'dae.copiapo@aiep.cl',
            phone: '52 2215000',
            region: 'norte',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 15,
            name: 'Biblioteca Calama',
            address: 'Av. Granaderos 2901, Calama',
            email: 'dae.calama@aiep.cl',
            phone: '55 2345000',
            region: 'norte',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 16,
            name: 'Biblioteca Coquimbo',
            address: 'Av. Costanera 700, Coquimbo',
            email: 'dae.coquimbo@aiep.cl',
            phone: '51 2315000',
            region: 'norte',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 28,
            name: 'Biblioteca Ovalle',
            address: 'Av. Ariztía 300, Ovalle',
            email: 'dae.ovalle@aiep.cl',
            phone: '53 2255000',
            region: 'norte',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 29,
            name: 'Biblioteca Vallenar',
            address: 'Av. Matta 550, Vallenar',
            email: 'dae.vallenar@aiep.cl',
            phone: '51 2665000',
            region: 'norte',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          // Más bibliotecas Zona Centro
          {
            id: 17,
            name: 'Biblioteca Quillota',
            address: 'Av. Condell 200, Quillota',
            email: 'dae.quillota@aiep.cl',
            phone: '33 2215000',
            region: 'centro',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 18,
            name: 'Biblioteca Los Andes',
            address: 'Av. Santa Teresa 555, Los Andes',
            email: 'dae.losandes@aiep.cl',
            phone: '34 2425000',
            region: 'centro',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 19,
            name: 'Biblioteca San Felipe',
            address: 'Av. Yungay 850, San Felipe',
            email: 'dae.sanfelipe@aiep.cl',
            phone: '34 2515000',
            region: 'centro',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 20,
            name: 'Biblioteca Curicó',
            address: 'Av. O\'Higgins 220, Curicó',
            email: 'dae.curico@aiep.cl',
            phone: '75 2315000',
            region: 'centro',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 30,
            name: 'Biblioteca San Antonio',
            address: 'Av. Barros Luco 1477, San Antonio',
            email: 'dae.sanantonio@aiep.cl',
            phone: '35 2355000',
            region: 'centro',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 31,
            name: 'Biblioteca Linares',
            address: 'Av. Independencia 575, Linares',
            email: 'dae.linares@aiep.cl',
            phone: '73 2155000',
            region: 'centro',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          // Más bibliotecas Región Metropolitana
          {
            id: 21,
            name: 'Biblioteca Maipú',
            address: 'Av. Pajaritos 4555, Maipú',
            email: 'dae.maipu@aiep.cl',
            phone: '2 32514507',
            region: 'metropolitana',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 22,
            name: 'Biblioteca Puente Alto',
            address: 'Av. Concha y Toro 1340, Puente Alto',
            email: 'dae.puentealto@aiep.cl',
            phone: '2 32814507',
            region: 'metropolitana',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 23,
            name: 'Biblioteca La Florida',
            address: 'Av. Vicuña Mackenna 9100, La Florida',
            email: 'dae.laflorida@aiep.cl',
            phone: '2 32914507',
            region: 'metropolitana',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 24,
            name: 'Biblioteca San Bernardo',
            address: 'Av. Freire 1200, San Bernardo',
            email: 'dae.sanbernardo@aiep.cl',
            phone: '2 32714507',
            region: 'metropolitana',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 32,
            name: 'Biblioteca Las Condes',
            address: 'Av. Apoquindo 4700, Las Condes',
            email: 'dae.lascondes@aiep.cl',
            phone: '2 32914507',
            region: 'metropolitana',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 33,
            name: 'Biblioteca Providencia',
            address: 'Av. Providencia 2653, Providencia',
            email: 'dae.providencia@aiep.cl',
            phone: '2 32614507',
            region: 'metropolitana',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          // Más bibliotecas Zona Sur
          {
            id: 25,
            name: 'Biblioteca Osorno',
            address: 'Av. O\'Higgins 1050, Osorno',
            email: 'dae.osorno@aiep.cl',
            phone: '64 2235000',
            region: 'sur',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 26,
            name: 'Biblioteca Puerto Montt',
            address: 'Av. Diego Portales 450, Puerto Montt',
            email: 'dae.puertomontt@aiep.cl',
            phone: '65 2485000',
            region: 'sur',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:00 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          },
          {
            id: 27,
            name: 'Biblioteca Talca',
            address: 'Av. 1 Norte 875, Talca',
            email: 'dae.talca@aiep.cl',
            phone: '71 2235000',
            region: 'sur',
            hours: {
              weekdays: 'Lunes a Viernes 08:30 a 21:30 horas',
              saturday: 'Sábados de 09:00 a 18:00 horas'
            }
          }
        ]
      }
    },
    selectRegion(regionId) {
      this.selectedRegion = regionId
      this.currentIndex = 0
    },
    previousSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    nextSlide() {
      if (this.currentIndex < this.totalCarouselPages - 1) {
        this.currentIndex++
      }
    },
    goToSlide(index) {
      this.currentIndex = index
    },
    handleResize() {
      this.windowWidth = window.innerWidth
    }
  }
}
</script>

<style scoped>
.bibliotecas-section {
  padding: 60px 0;
  background: var(--white);
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
  color: var(--primary-blue);
  margin: 0;
  white-space: nowrap;
  text-align: center;
}

.section-subtitle {
  color: var(--text-light);
  font-size: 18px;
  margin: 0;
  text-align: center;
}

.region-tabs {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.region-tab {
  padding: 12px 24px;
  border: none;
  background: var(--background-light);
  color: var(--text-dark);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 16px;
}

.region-tab.active {
  background: var(--primary-blue);
  color: var(--white);
}

.region-tab:hover:not(.active) {
  background: var(--light-blue);
  color: var(--primary-blue);
}

.region-select-container {
  display: none;
  justify-content: center;
  margin-bottom: 40px;
}

.region-select {
  padding: 12px 40px 12px 16px;
  border: 2px solid var(--primary-blue);
  background: var(--white);
  color: var(--primary-blue);
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

.carousel-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 55px;
  height: 100%;
  background: #ffffff7d
}

.carousel-wrapper.is-last-slide::after {
  display: none;
}

.carousel-container {
  display: flex;
  transition: transform 0.5s ease;
  gap: 24px;
}

.library-card {
  width: calc((100% - 48px) / 3.2);
  min-width: calc((100% - 48px) / 3.2);
  flex-shrink: 0;
  background: var(--white);
  border-radius: 8px;
  border: 2px solid var(--border-gray);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s;
}

.library-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.library-image {
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, var(--secondary-blue) 0%, var(--primary-blue) 100%);
  position: relative;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0,102,204,0.3) 0%, rgba(0,51,102,0.3) 100%);
}

.library-name {
  font-size: 20px;
  color: var(--primary-blue);
  padding: 20px 20px 0;
  margin-bottom: 16px;
}

.library-info {
  padding: 0 20px 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  color: var(--text-dark);
  font-size: 14px;
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
  visibility: hidden;
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
}

.hours p {
  margin: 4px 0;
  font-size: 14px;
  color: var(--text-dark);
  font-weight: 400;
}

.map-link-container {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid var(--border-gray);
  text-align: center;
}

.map-link {
  color: var(--secondary-blue);
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.map-link:hover {
  text-decoration: underline;
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
  border: 1px solid var(--border-gray);
  background: var(--white);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  font-size: 18px;
}

.carousel-btn:hover:not(:disabled),
.carousel-btn:active:not(:disabled) {
  background: var(--primary-blue);
  color: var(--white);
  border-color: var(--primary-blue);
}

.carousel-btn:disabled {
  opacity: 0.5;
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
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .section-subtitle {
    font-size: 16px;
    text-align: left;
  }
  
  .library-card {
    width: calc(92% - 12px);
    min-width: calc(92% - 12px);
  }
  
  .carousel-container {
    gap: 12px;
  }
  
  .carousel-wrapper::after {
    display: none;
  }
  
  .carousel-dots {
    display: none;
  }
  
  .map-link-container {
    text-align: right;
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
  }
}
</style>

