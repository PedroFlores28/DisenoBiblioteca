<template>
  <section class="sitios-section">
    <div class="container">
      <h2 class="section-title">Sitios recomendados para tus estudios</h2>
      <p class="section-subtitle">
        Accede a libros, revistas, normas y otras fuentes externas disponibles de uso público.
      </p>
      <div class="sites-carousel">
        <div class="carousel-wrapper" ref="carouselWrapper">
          <div class="carousel-container" :style="windowWidth > 768 && totalPages > 0 ? { transform: `translateX(-${carouselTransform}%)` } : {}">
            <!-- Desktop: cards individuales -->
            <template v-if="windowWidth > 768">
            <div 
              v-for="site in sites" 
              :key="site.id"
              class="site-card"
            >
              <SiteIcon :icon-type="site.iconType" />
              <div class="site-content">
                <h3 class="site-title site-title-portal" v-if="site.name === 'Portal de Revistas Académicas Chilenas'">
                  Portal de Revistas<br>Académicas<br>Chilenas
                </h3>
                <h3 class="site-title" v-else>{{ site.name }}</h3>
                <a :href="site.url" target="_blank" class="btn btn-secondary">
                  Ir al sitio
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.4509 9.13788L12.7891 3.22831C12.5038 2.93546 12.0382 2.92045 11.7454 3.20579C11.4525 3.49113 11.4375 3.95669 11.7228 4.24954L16.9866 9.7461H1.7509C1.3379 9.7461 1 10.084 1 10.497C1 10.91 1.3379 11.2479 1.7509 11.2479H16.9866L11.7228 16.7445C11.4375 17.0373 11.4525 17.5104 11.7454 17.7882C11.888 17.9234 12.0757 17.991 12.256 17.991C12.4512 17.991 12.6464 17.9159 12.7891 17.7657L18.4734 11.8336C19.1792 11.0301 19.1792 9.95636 18.4509 9.13788Z" fill="#024588"/>
                  </svg>
                </a>
              </div>
            </div>
            </template>
            <!-- Mobile: cards individuales cuando Libros por sede está activo -->
            <template v-if="windowWidth <= 768 && isLibrosPorSede">
              <div 
                v-for="site in sites" 
                :key="`mobile-single-${site.id}`"
                class="site-card mobile-single-card"
              >
                <SiteIcon :icon-type="site.iconType" />
                <div class="site-content">
                  <h3 class="site-title site-title-portal" v-if="site.name === 'Portal de Revistas Académicas Chilenas'">
                    Portal de Revistas<br>Académicas<br>Chilenas
                  </h3>
                  <h3 class="site-title" v-else>{{ site.name }}</h3>
                  <a :href="site.url" target="_blank" class="btn btn-secondary">
                    Ir al sitio
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18.4509 9.13788L12.7891 3.22831C12.5038 2.93546 12.0382 2.92045 11.7454 3.20579C11.4525 3.49113 11.4375 3.95669 11.7228 4.24954L16.9866 9.7461H1.7509C1.3379 9.7461 1 10.084 1 10.497C1 10.91 1.3379 11.2479 1.7509 11.2479H16.9866L11.7228 16.7445C11.4375 17.0373 11.4525 17.5104 11.7454 17.7882C11.888 17.9234 12.0757 17.991 12.256 17.991C12.4512 17.991 12.6464 17.9159 12.7891 17.7657L18.4734 11.8336C19.1792 11.0301 19.1792 9.95636 18.4509 9.13788Z" fill="#024588"/>
                    </svg>
                  </a>
                </div>
              </div>
            </template>
            <!-- Mobile: cards agrupadas de 2 en 2 cuando Libros digitales está activo o ninguna opción está activa -->
            <template v-else-if="windowWidth <= 768">
              <div 
                v-for="(pair, pairIndex) in pairedSites" 
                :key="`pair-${pairIndex}`"
                class="mobile-card-pair"
              >
                <div 
                  v-for="site in pair" 
                  :key="site.id"
                  class="site-card mobile-card"
                >
                  <SiteIcon :icon-type="site.iconType" />
                  <div class="site-content">
                    <h3 class="site-title site-title-portal" v-if="site.name === 'Portal de Revistas Académicas Chilenas'">
                      Portal de Revistas<br>Académicas<br>Chilenas
                    </h3>
                    <h3 class="site-title" v-else>{{ site.name }}</h3>
                    <a :href="site.url" target="_blank" class="btn btn-secondary">
                      Ir al sitio
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.4509 9.13788L12.7891 3.22831C12.5038 2.93546 12.0382 2.92045 11.7454 3.20579C11.4525 3.49113 11.4375 3.95669 11.7228 4.24954L16.9866 9.7461H1.7509C1.3379 9.7461 1 10.084 1 10.497C1 10.91 1.3379 11.2479 1.7509 11.2479H16.9866L11.7228 16.7445C11.4375 17.0373 11.4525 17.5104 11.7454 17.7882C11.888 17.9234 12.0757 17.991 12.256 17.991C12.4512 17.991 12.6464 17.9159 12.7891 17.7657L18.4734 11.8336C19.1792 11.0301 19.1792 9.95636 18.4509 9.13788Z" fill="#024588"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="carousel-controls" :class="{ 'hide-on-libros-por-sede': isLibrosPorSede }" v-if="sites.length > 0">
        <button 
          class="carousel-btn"
          :disabled="windowWidth <= 768 ? isAtStart : currentIndex === 0"
          @click="previousSlide"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div class="carousel-dots" v-if="totalPages > 0 && windowWidth > 768">
          <span 
            v-for="(page, index) in totalPages"
            :key="index"
            :class="['dot', { active: index === currentIndex }]"
            @click="goToSlide(index)"
          ></span>
        </div>
        <button 
          class="carousel-btn"
          :disabled="windowWidth <= 768 ? isAtEnd : currentIndex >= totalPages - 1"
          @click="nextSlide"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import strapiService from '../../services/strapi'
import SiteIcon from '../common/SiteIcon.vue'

export default {
  name: 'SitiosRecomendadosSection',
  components: {
    SiteIcon
  },
  data() {
    return {
      sites: [],
      currentIndex: 0,
      windowWidth: window.innerWidth,
      isAtStart: true,
      isAtEnd: false,
      isLibrosPorSede: false,
      isLibrosDigitales: false
    }
  },
  computed: {
    pairedSites() {
      // Agrupar sites de 2 en 2 para mobile
      const pairs = []
      for (let i = 0; i < this.sites.length; i += 2) {
        pairs.push(this.sites.slice(i, i + 2))
      }
      return pairs
    },
    totalPages() {
      if (this.windowWidth <= 768) {
        return this.sites.length
      } else {
        // En desktop, si hay 8 o menos cards, no mostrar paginación
        if (this.sites.length <= 8) {
          return 0
        }
        // Desktop: avanza de 3 en 3, pero muestra 3.5 por vista
        const itemsPerView = 3.5
        const itemsPerSlide = 3
        const totalItems = this.sites.length
        
        if (totalItems <= itemsPerView) {
          return 1
        }
        
        // Calcular cuántos slides necesitamos si avanzamos de 3 en 3
        const remainingAfterFirst = totalItems - itemsPerView
        return Math.ceil(remainingAfterFirst / itemsPerSlide) + 1
      }
    },
    carouselTransform() {
      if (this.sites.length === 0) return 0
      
      const isMobile = this.windowWidth <= 768
      const itemsPerView = isMobile ? 1.087 : 3.5 // 1/0.92 ≈ 1.087 para mostrar solo un pequeño pedazo
      const itemsPerSlide = isMobile ? 1 : 3
      const totalItems = this.sites.length
      
      // Si estamos en el último slide, calcular el desplazamiento para mostrar el último elemento completo
      const isLastSlide = this.currentIndex >= this.totalPages - 1
      
      if (isLastSlide && totalItems > itemsPerView) {
        // Calcular el ancho total de todos los elementos
        const gapSize = isMobile ? 12 : 24
        if (isMobile) {
          // En móvil, calcular para que el último card se muestre completo
          const cardWidthPercent = 92
          const gapPercent = (gapSize / this.windowWidth) * 100
          // Calcular cuánto necesitamos desplazar para mostrar el último card completo
          const cardsBeforeLast = totalItems - 1
          const transformForLastCard = (cardWidthPercent * cardsBeforeLast) + (gapPercent * cardsBeforeLast)
          // Ajustar para que el último card se muestre completo (no demasiado a la izquierda)
          return Math.max(0, transformForLastCard - 2)
        } else {
          // En desktop, calcular para que el último card se muestre completo
          const cardWidthPercent = 100 / itemsPerView
          const gapPercent = (gapSize / this.windowWidth) * 100
          // Ajustar para que el último card se muestre completo, considerando que mostramos 3.5 cards
          // Si hay menos de 3.5 cards, no necesitamos desplazar
          if (totalItems <= itemsPerView) {
            return 0
          }
          // Calcular el ancho total del contenido
          const totalContentWidthPercent = (cardWidthPercent * totalItems) + (gapPercent * (totalItems - 1))
          // El transform máximo es el ancho total menos 100% (el viewport)
          const maxTransform = Math.max(0, totalContentWidthPercent - 100)
          return maxTransform
        }
      }
      
      // Para slides normales
      if (isMobile) {
        // En mobile: cada slide avanza el ancho de 1 card (92%) más el gap (12px)
        const cardWidthPercent = 92
        const gapSize = 12
        const gapPercent = (gapSize / this.windowWidth) * 100
        const slideMove = cardWidthPercent + gapPercent
        return this.currentIndex * slideMove
      } else {
        // En desktop: cada slide avanza de 3 elementos completos
        // Cada card ocupa aproximadamente: (100% - 48px) / 3.5
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
    await this.loadSites()
    this.checkLibrosPorSede()
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    this.$nextTick(() => {
      if (this.$refs.carouselWrapper && this.windowWidth <= 768) {
        this.$refs.carouselWrapper.addEventListener('scroll', this.handleScroll)
        this.updateScrollButtons()
      }
    })
    // Observar cambios en el HeroSection
    this.observeHeroSection()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    if (this.$refs.carouselWrapper) {
      this.$refs.carouselWrapper.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    async loadSites() {
      try {
        const response = await strapiService.getCollection('sitios-recomendados', {
          populate: '*',
          sort: 'orden:asc'
        })
        this.sites = response.data || []
      } catch (error) {
        console.error('Error loading sites:', error)
        // Datos de ejemplo - 8 sitios principales
        this.sites = [
          {
            id: 1,
            name: 'Revistas Académicas (Proquest)',
            url: 'https://www.proquest.com',
            iconType: 'book'
          },
          {
            id: 2,
            name: 'Portal de Revistas Académicas Chilenas',
            url: '#',
            iconType: 'document'
          },
          {
            id: 3,
            name: 'Biblioteca del Congreso',
            url: '#',
            iconType: 'people'
          },
          {
            id: 4,
            name: 'Normas Chilenas',
            url: '#',
            iconType: 'normas'
          },
          {
            id: 5,
            name: 'Diario Oficial de la República',
            url: '#',
            iconType: 'diario-oficial'
          },
          {
            id: 6,
            name: 'Biblioteca Thomson-Reuters',
            url: '#',
            iconType: 'thomson-reuters'
          },
          {
            id: 7,
            name: 'Biblioteca ENI',
            url: '#',
            iconType: 'eni'
          },
          {
            id: 8,
            name: 'Enciclopedia OIT',
            url: '#',
            iconType: 'oit'
          }
        ]
      }
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
      if (this.currentIndex < this.totalPages - 1) {
        this.currentIndex++
        }
      }
    },
    goToSlide(index) {
      this.currentIndex = index
    },
      scrollLeft() {
        if (this.$refs.carouselWrapper) {
          if (this.isLibrosPorSede) {
            // Cuando Libros por sede está activo, scroll por card individual
            const card = this.$refs.carouselWrapper.querySelector('.mobile-single-card')
            if (card) {
              const cardWidth = card.offsetWidth
              const gap = 8
              const scrollAmount = cardWidth + gap
              this.$refs.carouselWrapper.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
              })
            }
          } else {
            // Cuando Libros digitales está activo o ninguna opción está activa, scroll por card-pair
            const pair = this.$refs.carouselWrapper.querySelector('.mobile-card-pair')
            if (pair) {
              const pairWidth = pair.offsetWidth
              const gap = 16
              const scrollAmount = pairWidth + gap
              this.$refs.carouselWrapper.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
              })
            }
          }
        }
      },
      scrollRight() {
        if (this.$refs.carouselWrapper) {
          if (this.isLibrosPorSede) {
            // Cuando Libros por sede está activo, scroll por card individual
            const card = this.$refs.carouselWrapper.querySelector('.mobile-single-card')
            if (card) {
              const cardWidth = card.offsetWidth
              const gap = 8
              const scrollAmount = cardWidth + gap
              this.$refs.carouselWrapper.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
              })
            }
          } else {
            // Cuando Libros digitales está activo o ninguna opción está activa, scroll por card-pair
            const pair = this.$refs.carouselWrapper.querySelector('.mobile-card-pair')
            if (pair) {
              const pairWidth = pair.offsetWidth
              const gap = 16
              const scrollAmount = pairWidth + gap
              this.$refs.carouselWrapper.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
              })
            }
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
      const newWidth = window.innerWidth
      const wasMobile = this.windowWidth <= 768
      const isMobile = newWidth <= 768
      
      this.windowWidth = newWidth
      
      this.$nextTick(() => {
        if (this.$refs.carouselWrapper) {
          if (isMobile && !wasMobile) {
            // Cambió de desktop a mobile, agregar listener
            this.$refs.carouselWrapper.addEventListener('scroll', this.handleScroll)
          } else if (!isMobile && wasMobile) {
            // Cambió de mobile a desktop, remover listener
            this.$refs.carouselWrapper.removeEventListener('scroll', this.handleScroll)
          }
          
          if (isMobile) {
            this.updateScrollButtons()
          }
        }
      })
    },
    checkLibrosPorSede() {
      const activeButton = document.querySelector('.hero .tab.active')
      if (activeButton) {
        const buttonText = activeButton.textContent.trim()
        this.isLibrosPorSede = buttonText === 'Libros por sede'
        this.isLibrosDigitales = buttonText === 'Libros digitales'
      } else {
        this.isLibrosPorSede = false
        this.isLibrosDigitales = false
      }
    },
    observeHeroSection() {
      // Observar cambios en los tabs del HeroSection
      const observer = new MutationObserver(() => {
        this.checkLibrosPorSede()
      })
      
      const heroSection = document.querySelector('.hero .widget-tabs')
      if (heroSection) {
        observer.observe(heroSection, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['class']
        })
      }
      
      // También escuchar clicks en los tabs
      const tabs = document.querySelectorAll('.hero .tab')
      tabs.forEach(tab => {
        tab.addEventListener('click', () => {
          setTimeout(() => {
            this.checkLibrosPorSede()
          }, 100)
        })
      })
    }
  }
}
</script>

<style scoped>
.sitios-section {
  padding: 60px 0;
  background: var(--white);
}

.section-title {
  text-align: center;
  font-size: 36px;
  color: #024588;
  margin-bottom: 16px;
}

.section-subtitle {
  text-align: center;
  color: #39475F;
  font-size: 18px;
  margin-bottom: 40px;
}

.sites-carousel {
  overflow: visible;
  margin-bottom: 30px;
  position: relative;
}

.carousel-wrapper {
  overflow: hidden;
  width: 100%;
}

@media (min-width: 769px) {
  .sitios-section .container {
    max-width: 1216px;
  }
  
  .carousel-wrapper {
    overflow: visible;
  }
}

.carousel-container {
  display: flex;
  transition: transform 0.5s ease;
  gap: 24px;
}

.site-card {
  width: calc((100% - 48px) / 3.5);
  min-width: calc((100% - 48px) / 3.5);
  flex-shrink: 0;
  background: var(--white);
  border-radius: 8px;
  padding: 24px;
  border: 2px solid var(--border-gray);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.3s;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
}

@media (min-width: 769px) {
  .carousel-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
    transition: none;
  }
  
  .site-card {
    width: 100%;
    min-width: 0;
    max-width: 100%;
  }
}

.site-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.site-content {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 16px;
}

.site-title {
  font-size: 18px;
  color: #024588;
  font-weight: 600;
  margin: 0;
  line-height: 1.4;
}

.site-title-portal {
  font-size: 16px;
}

.site-card .btn {
  background-color: #D0DCE8;
  color: #024588;
  font-weight: 700;
  padding: 8px 16px;
  font-size: 13px;
  width: auto;
  align-self: flex-start;
}

.site-card .btn svg {
  transition: transform 0.3s ease;
}

.site-card .btn:hover {
  background-color: #182844;
  color: var(--white);
}

.site-card .btn:hover svg {
  transform: translateX(4px);
}

.site-card .btn:hover svg path {
  fill: var(--white);
}

.carousel-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

@media (min-width: 769px) {
  .carousel-controls.hide-on-libros-por-sede {
    display: none;
  }
}

@media (min-width: 769px) {
  .carousel-controls.hide-on-libros-por-sede {
    display: none;
  }
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
  color: var(--text-light);
  padding: 0;
}

.carousel-btn:hover:not(:disabled),
.carousel-btn:active:not(:disabled) {
  background: var(--primary-blue);
  color: var(--white);
  border-color: var(--primary-blue);
}

.carousel-btn:disabled {
  opacity: 0.3;
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

@media (max-width: 768px) {
  .section-title {
    font-size: 30px;
    text-align: left;
    line-height: 1.2;
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
    gap: 8px;
    transform: none !important;
  }
  
  /* Cards individuales en mobile cuando Libros por sede está activo */
  .site-card.mobile-single-card {
    min-width: calc(100% - 8px);
    width: calc(100% - 8px);
    flex-shrink: 0;
    scroll-snap-align: start;
    border: 2px solid #FFFFFF;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 24px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    gap: 20px;
    background: var(--white);
    border-radius: 8px;
    min-height: 140px;
    box-sizing: border-box;
    overflow: hidden;
  }
  
  /* Ocultar card-pair cuando Libros por sede está activo */
  .carousel-container:has(.mobile-single-card) .mobile-card-pair {
    display: none;
  }
  
  .mobile-card-pair {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: calc(100% - 8px);
    min-width: calc(100% - 8px);
    scroll-snap-align: start;
    flex-shrink: 0;
  }
  
  .site-card.mobile-card {
    width: 100%;
    min-width: 100%;
    border: 2px solid #FFFFFF;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    padding: 24px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    gap: 20px;
    background: var(--white);
    border-radius: 8px;
    height: 140px;
    box-sizing: border-box;
    overflow: hidden;
  }
  
  .site-card.mobile-card .site-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 12px;
    min-width: 0;
    justify-content: space-between;
    height: 100%;
  }
  
  .site-card.mobile-single-card .site-content {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: 12px;
    min-width: 0;
    justify-content: space-between;
    min-height: 100%;
  }
  
  .site-card.mobile-single-card .site-title {
    flex: 1;
    min-height: 0;
  }
  
  .site-card.mobile-card .site-title {
    font-size: 18px;
    color: #024588;
    font-weight: 600;
    margin: 0;
    line-height: 1.4;
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
  }
  
  .site-card.mobile-card .site-title-portal,
  .site-card.mobile-single-card .site-title-portal {
    font-size: 16px;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  
  .site-card.mobile-card .btn,
  .site-card.mobile-single-card .btn {
    margin-top: auto;
    flex-shrink: 0;
  }
  
  .carousel-dots {
    display: none;
  }
  
  .carousel-controls {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
  }
}
</style>

