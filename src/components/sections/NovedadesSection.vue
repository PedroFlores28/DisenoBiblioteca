<template>
  <section class="novedades-section">
    <div class="container">
      <h2 class="section-title">Novedades literarias</h2>
      <div class="books-carousel">
        <div class="carousel-wrapper" ref="carouselWrapper" :class="{ 'is-last-slide': currentIndex >= totalPages - 1 }">
          <div class="carousel-container" :style="windowWidth > 768 ? { transform: `translateX(-${carouselTransform}%)` } : {}">
            <div 
              v-for="book in books" 
              :key="book.id"
              :class="['book-card', { 'libros-por-sede': isLibrosPorSede || isLibrosDigitales }]"
            >
            <div class="book-cover" :class="{ 'libros-por-sede': isLibrosPorSede || isLibrosDigitales }">
              <div class="cover-placeholder"></div>
            </div>
            <div class="book-info" :class="{ 'libros-por-sede': isLibrosPorSede || isLibrosDigitales }">
              <p class="book-author">{{ book.author }}</p>
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-isbn">ISBN {{ book.isbn }}</p>
              <p class="book-description">{{ book.description }}</p>
              <button class="btn btn-secondary">
                Reservar libro
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.4509 9.13788L12.7891 3.22831C12.5038 2.93546 12.0382 2.92045 11.7454 3.20579C11.4525 3.49113 11.4375 3.95669 11.7228 4.24954L16.9866 9.7461H1.7509C1.3379 9.7461 1 10.084 1 10.497C1 10.91 1.3379 11.2479 1.7509 11.2479H16.9866L11.7228 16.7445C11.4375 17.0373 11.4525 17.5104 11.7454 17.7882C11.888 17.9234 12.0757 17.991 12.256 17.991C12.4512 17.991 12.6464 17.9159 12.7891 17.7657L18.4734 11.8336C19.1792 11.0301 19.1792 9.95636 18.4509 9.13788Z" fill="#024588"/>
                </svg>
              </button>
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
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        <div class="carousel-dots">
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
      
      <!-- Sección de Servicios -->
      <div class="servicios-content" :class="{ 'hide-on-libros-por-sede-mobile': isLibrosPorSede, 'hide-on-libros-digitales-desktop': isLibrosDigitales }">
        <div class="servicios-text">
          <div class="title-bar"></div>
          <h2 class="servicios-title">
            <span class="title-line-1">Los servicios de</span>
            <span class="title-line-2">Bibliotecas AIEP</span>
          </h2>
          <p class="servicios-subtitle">
            Conoce todo lo que la biblioteca ofrece para apoyarte en tus estudios
          </p>
        </div>
        <div class="services-grid">
          <button 
            v-for="service in services"
            :key="service.id"
            class="service-button"
            @click="handleServiceClick(service)"
          >
            {{ service.name }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import strapiService from '../../services/strapi'

export default {
  name: 'NovedadesSection',
  data() {
    return {
      books: [],
      currentIndex: 0,
      windowWidth: window.innerWidth,
      isAtStart: true,
      isAtEnd: false,
      isLibrosPorSede: false,
      isLibrosDigitales: false,
      services: [
        {
          id: 1,
          name: 'Bibliografia básica digital'
        },
        {
          id: 2,
          name: 'Bibliotecario en línea'
        },
        {
          id: 3,
          name: 'Taller de biblioteca para docentes'
        },
        {
          id: 4,
          name: 'Taller de biblioteca para estudiantes'
        }
      ]
    }
  },
  computed: {
    totalPages() {
      if (this.windowWidth <= 768) {
        // Mobile: avanza de 1 en 1
        return Math.max(1, this.books.length)
      } else {
        // Desktop: si "Libros por sede" está activo, muestra 4 cards completas
        const itemsPerView = this.isLibrosPorSede ? 4 : 3.5
        const itemsPerSlide = this.isLibrosPorSede ? 4 : 3
        const totalItems = this.books.length
        
        if (totalItems <= itemsPerView) {
          return 1
        }
        
        // Calcular cuántos slides necesitamos
        const remainingAfterFirst = totalItems - itemsPerView
        return Math.ceil(remainingAfterFirst / itemsPerSlide) + 1
      }
    },
    carouselTransform() {
      if (this.books.length === 0) return 0
      
      const isMobile = this.windowWidth <= 768
      const itemsPerView = isMobile ? 1 : (this.isLibrosPorSede ? 4 : 3.5)
      const itemsPerSlide = isMobile ? 1 : (this.isLibrosPorSede ? 4 : 3)
      const totalItems = this.books.length
      
      // Para slides normales y último slide
      if (isMobile) {
        return this.currentIndex * 100
      } else {
        // En desktop: cada slide avanza según itemsPerSlide
        if (this.isLibrosPorSede) {
          // Para "Libros por sede": 4 cards completas por slide
          // Necesitamos calcular el ancho real de cada card incluyendo el gap
          // El contenedor tiene gap: 24px, y hay 4 cards, entonces hay 3 gaps entre las 4 cards
          // Cada card ocupa: calc((100% - 72px) / 4)
          // Para avanzar 4 cards, necesitamos: 4 * ancho_card + 3 * gap
          const containerWidth = this.$refs.carouselWrapper ? this.$refs.carouselWrapper.clientWidth : this.windowWidth
          if (containerWidth > 0) {
            const totalGaps = 3 * 24 // 3 gaps entre 4 cards
            const cardWidth = (containerWidth - totalGaps) / 4
            const slideMove = (cardWidth + 24) * 4 // 4 cards + 3 gaps
            
            // Si estamos en el último slide, calcular el desplazamiento para mostrar las últimas cards completas
            const isLastSlide = this.currentIndex >= this.totalPages - 1
            if (isLastSlide && totalItems > itemsPerView) {
              // Calcular el ancho total de todas las cards
              const totalCardsWidth = (cardWidth * totalItems) + (24 * (totalItems - 1))
              // El desplazamiento máximo es: ancho total - ancho visible
              const maxTransform = Math.max(0, totalCardsWidth - containerWidth)
              return (maxTransform / containerWidth) * 100
            }
            
            return (this.currentIndex * slideMove / containerWidth) * 100
          }
          // Fallback si no hay ancho disponible
          const cardWidthPercent = 100 / itemsPerView
          const gapSize = 24
          const gapPercent = (gapSize / this.windowWidth) * 100
          const slideMove = (cardWidthPercent * itemsPerSlide) + (gapPercent * (itemsPerSlide - 1))
          return this.currentIndex * slideMove
        } else {
          // Para "Libros digitales": 3 cards por slide
          const cardWidthPercent = 100 / itemsPerView
          const gapSize = 24
          const gapPercent = (gapSize / this.windowWidth) * 100
          // Avanzar según itemsPerSlide: X cards + (X-1) gaps
          const slideMove = (cardWidthPercent * itemsPerSlide) + (gapPercent * (itemsPerSlide - 1))
          
          // Si estamos en el último slide, calcular el desplazamiento para mostrar el último elemento completo
          const isLastSlide = this.currentIndex >= this.totalPages - 1
          if (isLastSlide && totalItems > itemsPerView) {
            // Calcular el ancho total de todos los elementos
            const totalGaps = gapSize * (totalItems - 1)
            // Aproximación del ancho total en porcentaje considerando gaps
            const gapPercentTotal = (totalGaps / this.windowWidth) * 100
            const totalWidthPercent = (totalItems * cardWidthPercent) + gapPercentTotal
            
            // El desplazamiento máximo es: ancho total - 100% (ancho visible)
            const maxTransform = Math.max(0, totalWidthPercent - 100)
            return maxTransform
          }
          
          return this.currentIndex * slideMove
        }
      }
    }
  },
  async mounted() {
    await this.loadBooks()
    this.checkLibrosPorSede()
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
    async loadBooks() {
      try {
        const response = await strapiService.getCollection('libros', {
          populate: '*',
          'filters[novedad][$eq]': true,
          sort: 'createdAt:desc'
        })
        this.books = response.data || []
      } catch (error) {
        console.error('Error loading books:', error)
        // Datos de ejemplo
        this.books = [
          {
            id: 1,
            author: 'Eastman, Charles M.',
            title: 'BIM handbook: a guide to building information...',
            isbn: '9780470541371',
            description: 'The BIM Handbook presents the technology and processes behind BIM and how architects, engineers, contractors...'
          },
          {
            id: 2,
            author: 'Fowler, Georgina',
            title: 'Peluquería: una guía completa con resultados profesionales',
            isbn: '9788428331876',
            description: '"Peluquería: una guía completa con resultados profesionales" de Georgina Fowler es una obra ilustrada a todo color...'
          },
          {
            id: 3,
            author: 'Van Horne, James C.',
            title: 'Fundamentos de administración financiera',
            isbn: '9780470541371',
            description: 'The BIM Handbook presents the technology and processes behind BIM and how architects, engineers, contractors...'
          },
          {
            id: 4,
            author: 'Horngren, Charles T.',
            title: 'Contabilidad con enfoque gerencial',
            isbn: '9786073244567',
            description: 'Este libro presenta los conceptos fundamentales de contabilidad desde una perspectiva gerencial y práctica...'
          },
          {
            id: 5,
            author: 'Kotler, Philip',
            title: 'Marketing Management',
            isbn: '9780133856460',
            description: 'La obra más completa sobre marketing estratégico y gestión de marca en el mercado actual...'
          },
          {
            id: 6,
            author: 'Robbins, Stephen P.',
            title: 'Comportamiento Organizacional',
            isbn: '9786074818321',
            description: 'Análisis profundo del comportamiento humano en las organizaciones y su impacto en el rendimiento...'
          },
          {
            id: 7,
            author: 'Sánchez, María Elena',
            title: 'Diseño Gráfico Digital',
            isbn: '9788428331890',
            description: 'Guía completa sobre técnicas de diseño gráfico aplicadas al entorno digital y multimedia...'
          },
          {
            id: 8,
            author: 'García, Juan Carlos',
            title: 'Programación Web Moderna',
            isbn: '9788428331907',
            description: 'Introducción a las tecnologías web modernas: HTML5, CSS3, JavaScript y frameworks actuales...'
          },
          {
            id: 9,
            author: 'Martínez, Ana Isabel',
            title: 'Psicología del Aprendizaje',
            isbn: '9788428331914',
            description: 'Fundamentos teóricos y prácticos de la psicología educativa y los procesos de aprendizaje...'
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
        const card = this.$refs.carouselWrapper.querySelector('.book-card')
        if (card) {
          const cardWidth = card.offsetWidth
          const gap = 8
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
        const card = this.$refs.carouselWrapper.querySelector('.book-card')
        if (card) {
          const cardWidth = card.offsetWidth
          const gap = 8
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
    },
    handleServiceClick(service) {
      // Aquí puedes agregar la lógica de navegación o acción
      console.log('Service clicked:', service.name)
    }
  }
}
</script>

<style scoped>
.novedades-section {
  padding: 60px 0;
  background: var(--background-light);
}

.section-title {
  text-align: center;
  font-size: 36px;
  color: #024588;
  margin-bottom: 40px;
}

.books-carousel {
  overflow: visible;
  margin-bottom: 30px;
  position: relative;
}

.carousel-wrapper {
  overflow: hidden;
  width: 100%;
  padding-right: 0;
  position: relative;
}


.carousel-container {
  display: flex;
  transition: transform 0.5s ease;
  gap: 24px;
}

.book-card {
  width: calc((100% - 48px) / 3.5);
  min-width: calc((100% - 48px) / 3.5);
  flex-shrink: 0;
  background: #f5f5f5;
  border-radius: 8px;
  border: 2px solid #f5f5f5;
  box-shadow: none;
  overflow: hidden;
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
}

@media (min-width: 769px) {
  .book-card.libros-por-sede {
    width: calc((100% - 72px) / 4);
    min-width: calc((100% - 72px) / 4);
  }
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  border-color: #e0e0e0;
}

.book-cover {
  width: 100%;
  height: 250px;
  background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
}

@media (min-width: 769px) {
  .book-cover.libros-por-sede {
    width: 188px;
    height: 226px;
    margin: 0 auto;
  }
  
  .book-info.libros-por-sede {
    width: 288px;
    height: 256px;
    margin: 0 auto;
  }
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(180deg, #8B4513 0%, #654321 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  border-radius: 8px;
  border: 1px solid #FFFFFF;
}

.book-info {
  padding: 20px;
  overflow: hidden;
}

@media (min-width: 769px) {
  .book-info.libros-por-sede {
    width: 288px;
    height: 256px;
    margin: 0 auto;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .book-info.libros-por-sede .book-author {
    font-size: 14px;
    margin-bottom: 6px;
    flex-shrink: 0;
    line-height: 1.4;
    color: #182844;
  }
  
  .book-info.libros-por-sede .book-title {
    font-size: 18px;
    margin-bottom: 6px;
    line-height: 1.3;
    flex-shrink: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .book-info.libros-por-sede .book-isbn {
    font-size: 11px;
    margin-bottom: 8px;
    flex-shrink: 0;
  }
  
  .book-info.libros-por-sede .book-description {
    font-size: 12px;
    line-height: 1.5;
    margin-bottom: 12px;
    -webkit-line-clamp: 2;
    flex: 1;
    min-height: 0;
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
  }
  
  .book-info.libros-por-sede .btn {
    margin-top: auto;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
    background-color: #D0DCE8;
    color: #024588;
    width: auto;
    align-self: flex-start;
  }
  
  .book-info.libros-por-sede .btn svg {
    transition: transform 0.3s ease;
  }
  
  .book-info.libros-por-sede .btn:hover {
    background-color: #182844;
    color: var(--white);
  }
  
  .book-info.libros-por-sede .btn:hover svg {
    transform: translateX(4px);
  }
  
  .book-info.libros-por-sede .btn:hover svg path {
    fill: var(--white);
  }
}

.book-author {
  font-size: 14px;
  color: #182844;
  margin-bottom: 8px;
}

.book-title {
  font-size: 18px;
  color: var(--accent-red);
  font-weight: 600;
  margin-bottom: 8px;
  line-height: 1.4;
}

.book-isbn {
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: 12px;
}

.book-description {
  font-size: 12px;
  color: #182844;
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
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

@media (min-width: 769px) {
  .novedades-section .container {
    max-width: 1216px;
  }
}

@media (max-width: 968px) {
  .book-card {
    min-width: calc(50% - 12px);
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 30px;
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
  
  .book-card {
    width: calc(100% - 8px);
    min-width: calc(100% - 8px);
    scroll-snap-align: start;
  }
  
  .book-cover.libros-por-sede {
    width: 188px;
    height: 254px;
    margin: 0 auto;
  }
  
  .cover-placeholder {
    width: 188px;
    height: 254px;
  }
  
  .book-info.libros-por-sede .btn {
    margin-top: auto;
    padding: 8px 16px;
    font-size: 13px;
    font-weight: 700;
    flex-shrink: 0;
    background-color: #D0DCE8;
    color: #024588;
    width: auto;
    align-self: flex-start;
  }
  
  .book-info.libros-por-sede .btn svg {
    transition: transform 0.3s ease;
  }
  
  .book-info.libros-por-sede .btn:hover {
    background-color: #182844;
    color: var(--white);
  }
  
  .book-info.libros-por-sede .btn:hover svg {
    transform: translateX(4px);
  }
  
  .book-info.libros-por-sede .btn:hover svg path {
    fill: var(--white);
  }
  
  .carousel-wrapper::after {
    display: none;
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

/* Estilos para la sección de servicios */
.servicios-content {
  display: flex;
  align-items: flex-start;
  gap: 48px;
  justify-content: space-between;
  margin-top: 80px;
  padding: 40px;
  background: var(--white);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Ocultar servicios-content en desktop cuando Libros digitales está activo */

.servicios-text {
  flex: 1;
  max-width: 500px;
}

.title-bar {
  width: 500px;
  height: 8px;
  background: #102A8A;
  margin-bottom: 24px;
}

.servicios-title {
  font-size: 31px;
  font-weight: 700;
  color: #024588;
  margin-bottom: 16px;
  line-height: 1.2;
}

/* Desktop: título en una sola línea */
.title-line-1,
.title-line-2 {
  display: inline;
}

.title-line-1::after {
  content: ' ';
}

.servicios-subtitle {
  font-size: 15px;
  color: #024588;
  line-height: 1.6;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  flex: 1;
  max-width: 600px;
}

.service-button {
  width: 100%;
  max-width: 100%;
  height: 36px;
  padding: 0;
  background: #AA0000;
  color: var(--white);
  border: none;
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-button:hover {
  background: #AA0000;
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(170, 0, 0, 0.3);
}

.service-button:active {
  transform: translateY(0);
}

@media (max-width: 968px) {
  .servicios-content {
    flex-direction: column;
    gap: 32px;
  }

  .servicios-text {
    max-width: 100%;
  }

  .services-grid {
    max-width: 100%;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .servicios-content {
    margin-top: 60px;
    padding: 24px;
    background: var(--white);
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .servicios-content.hide-on-libros-por-sede-mobile {
    display: none;
  }

  .title-bar {
    width: 50%;
    max-width: 50%;
  }

  .servicios-title {
    font-size: 28px;
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }
  
  .title-line-1 {
    display: block;
  }
  
  .title-line-2 {
    display: block;
  }

  .servicios-subtitle {
    font-size: 16px;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 16px;
    width: 100%;
    max-width: 100%;
  }

  .service-button {
    width: 100%;
    padding: 16px 24px;
    font-size: 16px;
    min-height: 50px;
  }
}

/* Ocultar servicios-content en desktop cuando Libros digitales está activo */
@media (min-width: 769px) {
  .novedades-section .servicios-content.hide-on-libros-digitales-desktop {
    display: none;
  }
}
</style>

