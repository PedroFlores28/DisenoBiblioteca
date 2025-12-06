<template>
  <section id="bibliografia" class="bibliografia-section">
    <div class="container">
      <div class="section-header">
        <div class="title-bar"></div>
        <h2 class="section-title">Bibliografía por<br>escuela</h2>
      </div>
      <p class="section-description">
        Selecciona tu escuela y luego busca tu carrera para conocer la Bibliografía Básica de cada una.
      </p>
      <div class="schools-grid-wrapper" v-if="schools.length > 0">
        <div class="schools-grid" ref="schoolsGrid">
          <!-- Desktop: cards individuales -->
          <div 
            v-for="school in schools" 
            :key="school.id"
            class="school-card desktop-card"
          >
            <div :class="['card-accent', `accent-${school.color}`]"></div>
            <h3 class="card-title">{{ school.name }}</h3>
            <a href="#" class="card-link">
              Ver más
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.5019 10.0015L13.5177 3.75535C13.2161 3.44583 12.724 3.42995 12.4145 3.73155C12.1049 4.03314 12.0891 4.52521 12.3907 4.83474L17.9542 10.6444H1.85079C1.41428 10.6444 1.05713 11.0015 1.05713 11.438C1.05713 11.8745 1.41428 12.2317 1.85079 12.2317H17.9542L12.3907 18.0413C12.0891 18.3508 12.1049 18.8509 12.4145 19.1445C12.5653 19.2874 12.7637 19.3588 12.9542 19.3588C13.1605 19.3588 13.3669 19.2794 13.5177 19.1207L19.5257 12.8507C20.2717 12.0015 20.2717 10.8666 19.5019 10.0015Z" fill="#0065DC"/>
              </svg>
            </a>
          </div>
          <!-- Mobile: cards individuales cuando Libros por sede o Libros digitales está activo -->
          <template v-if="isLibrosPorSede || isLibrosDigitales">
            <div 
              v-for="school in schools" 
              :key="`mobile-single-${school.id}`"
              class="school-card mobile-single-card"
            >
              <div :class="['card-accent', `accent-${school.color}`]"></div>
              <h3 class="card-title">{{ school.name }}</h3>
              <a href="#" class="card-link">
                Ver más
                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19.5019 10.0015L13.5177 3.75535C13.2161 3.44583 12.724 3.42995 12.4145 3.73155C12.1049 4.03314 12.0891 4.52521 12.3907 4.83474L17.9542 10.6444H1.85079C1.41428 10.6444 1.05713 11.0015 1.05713 11.438C1.05713 11.8745 1.41428 12.2317 1.85079 12.2317H17.9542L12.3907 18.0413C12.0891 18.3508 12.1049 18.8509 12.4145 19.1445C12.5653 19.2874 12.7637 19.3588 12.9542 19.3588C13.1605 19.3588 13.3669 19.2794 13.5177 19.1207L19.5257 12.8507C20.2717 12.0015 20.2717 10.8666 19.5019 10.0015Z" fill="#0065DC"/>
                </svg>
              </a>
            </div>
          </template>
          <!-- Mobile: cards agrupadas en pares cuando ninguna opción está activa -->
          <template v-else>
            <template v-for="(school, index) in schools" :key="`mobile-${school.id}`">
              <div 
                v-if="index % 2 === 0"
                class="card-pair mobile-pair"
              >
                <div class="school-card">
                  <div :class="['card-accent', `accent-${school.color}`]"></div>
                  <h3 class="card-title">{{ school.name }}</h3>
                  <a href="#" class="card-link">
                    Ver más
                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19.5019 10.0015L13.5177 3.75535C13.2161 3.44583 12.724 3.42995 12.4145 3.73155C12.1049 4.03314 12.0891 4.52521 12.3907 4.83474L17.9542 10.6444H1.85079C1.41428 10.6444 1.05713 11.0015 1.05713 11.438C1.05713 11.8745 1.41428 12.2317 1.85079 12.2317H17.9542L12.3907 18.0413C12.0891 18.3508 12.1049 18.8509 12.4145 19.1445C12.5653 19.2874 12.7637 19.3588 12.9542 19.3588C13.1605 19.3588 13.3669 19.2794 13.5177 19.1207L19.5257 12.8507C20.2717 12.0015 20.2717 10.8666 19.5019 10.0015Z" fill="#0065DC"/>
                    </svg>
                  </a>
                </div>
                <div 
                  v-if="schools[index + 1]"
                  class="school-card"
                >
                  <div :class="['card-accent', `accent-${schools[index + 1].color}`]"></div>
                  <h3 class="card-title">{{ schools[index + 1].name }}</h3>
                  <a href="#" class="card-link">Ver más →</a>
                </div>
              </div>
            </template>
          </template>
        </div>
      </div>
      <!-- Paginación para desktop -->
      <div class="pagination" v-if="totalPages > 0 && windowWidth > 768">
        <button 
          class="pagination-arrow"
          :disabled="currentPage === 1"
          @click="previousPage"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div class="pagination-dots">
          <span 
            v-for="page in totalPages" 
            :key="page"
            :class="['dot', { active: page === currentPage }]"
            @click="goToPage(page)"
          ></span>
        </div>
        <button 
          class="pagination-arrow"
          :disabled="currentPage === totalPages"
          @click="nextPage"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
      <!-- Navegación con flechas para móvil -->
      <div class="mobile-navigation" v-if="windowWidth <= 768 && schools.length > 1">
        <button 
          class="pagination-arrow"
          :disabled="isAtStart"
          @click="scrollLeft"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <button 
          class="pagination-arrow"
          :disabled="isAtEnd"
          @click="scrollRight"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
      <!-- Botón "Ver todas las escuelas" solo en mobile -->
      <div class="view-all-button-wrapper" v-if="windowWidth <= 768">
        <button class="view-all-button">Ver todas las escuelas</button>
      </div>
    </div>
  </section>
</template>

<script>
import strapiService from '../../services/strapi'

export default {
  name: 'BibliografiaSection',
  data() {
      // Datos de ejemplo precargados - Solo las 7 cards principales
      const exampleSchools = [
        { id: 1, name: 'Administración y Gestión Empresarial', color: 'green' },
        { id: 2, name: 'Artes e Industrias Creativas', color: 'purple' },
        { id: 3, name: 'Desarrollo Social y Educación', color: 'purple' },
        { id: 4, name: 'Estética Integral', color: 'purple-light' },
        { id: 5, name: 'Gastronomía, Hotelería y Turismo', color: 'orange-accent' },
        { id: 6, name: 'Ingeniería, Energía y Tecnología', color: 'green-dark' },
        { id: 7, name: 'Salud y Deporte', color: 'cyan' },
      ]

    return {
      schools: exampleSchools, // Cargar datos de ejemplo inmediatamente
      currentPage: 1,
      windowWidth: window.innerWidth,
      isAtStart: true,
      isAtEnd: false,
      isLibrosPorSede: false,
      isLibrosDigitales: false
    }
  },
  computed: {
    totalPages() {
      if (this.windowWidth <= 768) {
        return 1
      }
      // En desktop, si hay 7 o menos cards, no mostrar paginación
      if (this.schools.length <= 7) {
        return 0
      }
      const itemsPerPage = this.windowWidth > 1200 ? 4 : 2
      return Math.ceil(this.schools.length / itemsPerPage)
    }
  },
  async mounted() {
    await this.loadSchools()
    this.checkLibrosPorSede()
    window.addEventListener('resize', this.handleResize)
    this.$nextTick(() => {
      if (this.$refs.schoolsGrid) {
        this.$refs.schoolsGrid.addEventListener('scroll', this.handleScroll)
        this.updateScrollButtons()
        this.updateCurrentPage()
      }
    })
    // Observar cambios en el HeroSection
    this.observeHeroSection()
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    if (this.$refs.schoolsGrid) {
      this.$refs.schoolsGrid.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    async loadSchools() {
      // Intentar cargar desde Strapi en segundo plano y actualizar si está disponible
      try {
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 2000)
        )

        const responsePromise = strapiService.getCollection('escuelas', {
          populate: '*'
        })
        
        const response = await Promise.race([responsePromise, timeoutPromise])
        
        if (response && response.data && response.data.length > 0) {
          this.schools = response.data
          this.$nextTick(() => {
            this.updateScrollButtons()
          })
        }
      } catch (error) {
        // Si falla, mantener los datos de ejemplo que ya están cargados
      }
    },
    previousPage() {
      if (this.windowWidth <= 768) {
        this.scrollLeft()
      } else {
        // Desktop: scroll suave al grupo anterior de 4 cards
        if (this.currentPage > 1) {
          this.scrollToPage(this.currentPage - 1)
        }
      }
    },
    nextPage() {
      if (this.windowWidth <= 768) {
        this.scrollRight()
      } else {
        // Desktop: scroll suave al siguiente grupo de 4 cards
        if (this.currentPage < this.totalPages) {
          this.scrollToPage(this.currentPage + 1)
        }
      }
    },
    goToPage(page) {
      if (this.windowWidth <= 768) {
        // En mobile, no hay paginación por dots
        return
      }
      this.scrollToPage(page)
    },
    scrollToPage(page) {
      if (!this.$refs.schoolsGrid) return
      
      const grid = this.$refs.schoolsGrid
      const card = grid.querySelector('.school-card')
      if (!card) return
      
      const cardWidth = card.offsetWidth
      const gap = 24 // gap entre cards
      const cardsPerPage = this.windowWidth > 1200 ? 4 : 2
      const scrollAmount = (cardWidth + gap) * cardsPerPage * (page - 1)
      
      grid.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      })
      
      this.currentPage = page
    },
    updateCurrentPage() {
      if (!this.$refs.schoolsGrid || this.windowWidth <= 768) return
      
      const grid = this.$refs.schoolsGrid
      const card = grid.querySelector('.school-card')
      if (!card) return
      
      const cardWidth = card.offsetWidth
      const gap = 24
      const scrollLeft = grid.scrollLeft
      const cardsPerPage = this.windowWidth > 1200 ? 4 : 2
      const scrollPerPage = (cardWidth + gap) * cardsPerPage
      
      const page = Math.round(scrollLeft / scrollPerPage) + 1
      const maxPage = this.totalPages
      
      if (page >= 1 && page <= maxPage) {
        this.currentPage = page
      }
    },
    handleResize() {
      this.windowWidth = window.innerWidth
      this.$nextTick(() => {
        if (this.$refs.schoolsGrid) {
          this.updateScrollButtons()
          if (this.windowWidth > 768) {
            this.updateCurrentPage()
          }
        }
      })
    },
    scrollLeft() {
      if (this.$refs.schoolsGrid && this.windowWidth <= 768) {
        if (this.isLibrosPorSede || this.isLibrosDigitales) {
          // Cuando Libros por sede o Libros digitales está activo, scroll por card individual
          const card = this.$refs.schoolsGrid.querySelector('.mobile-single-card')
          if (card) {
            const cardWidth = card.offsetWidth
            const gap = 16
            const scrollAmount = cardWidth + gap
            this.$refs.schoolsGrid.scrollBy({
              left: -scrollAmount,
              behavior: 'smooth'
            })
          }
        } else {
          // Cuando ninguna opción está activa, scroll por card-pair
          const cardPair = this.$refs.schoolsGrid.querySelector('.card-pair')
          if (cardPair) {
            const cardPairWidth = cardPair.offsetWidth
            const gap = 16
            const scrollAmount = cardPairWidth + gap
            this.$refs.schoolsGrid.scrollBy({
              left: -scrollAmount,
              behavior: 'smooth'
            })
          }
        }
      }
    },
    scrollRight() {
      if (this.$refs.schoolsGrid && this.windowWidth <= 768) {
        if (this.isLibrosPorSede || this.isLibrosDigitales) {
          // Cuando Libros por sede o Libros digitales está activo, scroll por card individual
          const card = this.$refs.schoolsGrid.querySelector('.mobile-single-card')
          if (card) {
            const cardWidth = card.offsetWidth
            const gap = 16
            const scrollAmount = cardWidth + gap
            this.$refs.schoolsGrid.scrollBy({
              left: scrollAmount,
              behavior: 'smooth'
            })
          }
        } else {
          // Cuando ninguna opción está activa, scroll por card-pair
          const cardPair = this.$refs.schoolsGrid.querySelector('.card-pair')
          if (cardPair) {
            const cardPairWidth = cardPair.offsetWidth
            const gap = 16
            const scrollAmount = cardPairWidth + gap
            this.$refs.schoolsGrid.scrollBy({
              left: scrollAmount,
              behavior: 'smooth'
            })
          }
        }
      }
    },
    handleScroll() {
      this.updateScrollButtons()
      if (this.windowWidth > 768) {
        this.updateCurrentPage()
      }
    },
    updateScrollButtons() {
      if (!this.$refs.schoolsGrid) return
      
      const grid = this.$refs.schoolsGrid
      const scrollLeft = grid.scrollLeft
      const scrollWidth = grid.scrollWidth
      const clientWidth = grid.clientWidth
      
      if (this.windowWidth <= 768) {
        this.isAtStart = scrollLeft <= 0
        this.isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1
      } else {
        // En desktop, actualizar estado de botones basado en currentPage
        this.isAtStart = this.currentPage === 1
        this.isAtEnd = this.currentPage >= this.totalPages
      }
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
.bibliografia-section {
  background-color: var(--background-light);
  padding: 60px 0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}

.title-bar {
  width: 6px;
  height: 80px;
  background-color: var(--accent-red);
}

.section-title {
  font-size: 36px;
  color: #024588;
  margin: 0;
}

.section-description {
  color: #4B4D53;
  margin-bottom: 40px;
  font-size: 18px;
}

.schools-grid-wrapper {
  margin-bottom: 40px;
  overflow: visible;
  padding-top: 4px;
}

.schools-grid {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  overflow-y: hidden;
  scroll-behavior: smooth;
  scroll-snap-type: none;
  -webkit-overflow-scrolling: touch;
  padding-bottom: 8px;
}

.schools-grid::-webkit-scrollbar {
  display: none;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.school-card {
  background: var(--white);
  border-radius: 7px;
  padding: 32px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border: 2px solid #D7E5F4;
  min-height: 180px;
}

.school-card:hover {
  transform: translateY(-4px);
}

.card-accent {
  position: absolute;
  top: 0;
  left: 33.47px;
  width: 151.5px;
  height: 7.05px;
}

.accent-green {
  background-color: #4caf50;
}

.accent-purple {
  background-color: #9c27b0;
}

.accent-purple-light {
  background-color: #ba68c8;
}

.accent-blue {
  background-color: #2196f3;
}

.accent-cyan {
  background-color: #00bcd4;
}

.accent-red-accent {
  background-color: #f44336;
}

.accent-orange-accent {
  background-color: #ff9800;
}

.accent-green-dark {
  background-color: #388e3c;
}

.card-title {
  font-size: 21px;
  color: #182844;
  margin-bottom: 20px;
  margin-top: 0;
  font-weight: 700;
  flex: 1;
  min-height: 60px;
  display: flex;
  align-items: flex-start;
}

.card-link {
  color: #0065DC;
  text-decoration: none;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin-top: auto;
  align-self: flex-end;
  width: 100%;
  padding-right: 20px;
}

.card-link svg {
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.card-link:hover {
  text-decoration: underline;
}

.card-link:hover svg {
  transform: translateX(4px);
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

.pagination-arrow {
  width: 40px;
  height: 40px;
  border: 1px solid var(--border-gray);
  background: var(--white);
  border-radius: 50%;
  cursor: pointer;
  color: var(--text-light);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  padding: 0;
}

.pagination-arrow:hover:not(:disabled),
.pagination-arrow:active:not(:disabled) {
  background: var(--primary-blue);
  color: var(--white);
  border-color: var(--primary-blue);
}

.pagination-arrow:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.pagination-dots {
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
  .bibliografia-section .container {
    max-width: 1216px;
  }
  
  .schools-grid-wrapper {
    position: relative;
    overflow: visible;
    padding-top: 4px;
  }
  
  .schools-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 17px;
    overflow: visible;
    height: auto;
    padding-bottom: 0;
  }
  
  .school-card.desktop-card {
    width: 100%;
    min-width: 0;
    max-width: 100%;
    display: block;
  }
  
  /* Ocultar todas las cards de mobile en desktop */
  .card-pair.mobile-pair {
    display: none;
  }
  
  .school-card.mobile-single-card {
    display: none;
  }
  
  /* Centrar las últimas 3 cards si hay 7 */
  .schools-grid-wrapper:has(.desktop-card:nth-child(7)):not(:has(.desktop-card:nth-child(8))) .schools-grid {
    grid-template-columns: repeat(4, 1fr);
    justify-content: center;
  }
  .schools-grid-wrapper:has(.desktop-card:nth-child(7)):not(:has(.desktop-card:nth-child(8))) .desktop-card:nth-child(5) {
    grid-column: 1 / span 1;
  }
  .schools-grid-wrapper:has(.desktop-card:nth-child(7)):not(:has(.desktop-card:nth-child(8))) .desktop-card:nth-child(6) {
    grid-column: 2 / span 1;
  }
  .schools-grid-wrapper:has(.desktop-card:nth-child(7)):not(:has(.desktop-card:nth-child(8))) .desktop-card:nth-child(7) {
    grid-column: 3 / span 1;
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 30px;
    line-height: 1.2;
  }
  
  .schools-grid {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    gap: 16px;
    padding-bottom: 8px;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    padding-right: 20px;
  }
  
  /* Ocultar cards individuales de desktop en mobile */
  .school-card.desktop-card {
    display: none;
  }
  
  /* Mostrar card-pair en mobile cuando NO está Libros por sede */
  .card-pair.mobile-pair {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: calc(100% - 8px);
    width: calc(100% - 8px);
    flex-shrink: 0;
    scroll-snap-align: start;
  }
  
  .card-pair .school-card {
    width: 100%;
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-shrink: 0;
  }
  
  /* Cards individuales en mobile cuando Libros por sede está activo */
  .school-card.mobile-single-card {
    min-width: calc(100% - 8px);
    width: calc(100% - 8px);
    flex-shrink: 0;
    scroll-snap-align: start;
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  /* Ocultar card-pair cuando Libros por sede está activo */
  .schools-grid:has(.mobile-single-card) .card-pair.mobile-pair {
    display: none;
  }
  
  .card-title {
    flex: 1;
    margin-bottom: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    line-height: 1.4;
  }
  
  .card-link {
    margin-top: auto;
    align-self: flex-end;
  }
  
  .pagination {
    display: none;
  }
  
  .mobile-navigation {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
  }
  
  .view-all-button-wrapper {
    display: flex;
    justify-content: center;
    margin-top: 24px;
    padding: 0 24px;
  }
  
  .view-all-button {
    width: 100%;
    max-width: 100%;
    padding: 14px 24px;
    background: var(--white);
    border: 1px solid var(--primary-blue);
    border-radius: 8px;
    color: var(--primary-blue);
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.3s ease;
    text-align: center;
  }
  
  .view-all-button:hover {
    background: var(--primary-blue);
    color: var(--white);
  }
  
  .view-all-button:active {
    transform: scale(0.98);
  }
}

/* Ocultar botón en desktop */
@media (min-width: 769px) {
  .view-all-button-wrapper {
    display: none;
  }
}
</style>


