<template>
  <section class="novedades-section">
    <div class="container">
      <h2 class="section-title">Novedades literarias</h2>
      <div class="books-carousel">
        <div class="carousel-wrapper" :class="{ 'is-last-slide': currentIndex >= totalPages - 1 }">
          <div class="carousel-container" :style="{ transform: `translateX(-${carouselTransform}%)` }">
            <div 
              v-for="book in books" 
              :key="book.id"
              class="book-card"
            >
            <div class="book-cover">
              <div class="cover-placeholder"></div>
            </div>
            <div class="book-info">
              <p class="book-author">{{ book.author }}</p>
              <h3 class="book-title">{{ book.title }}</h3>
              <p class="book-isbn">ISBN {{ book.isbn }}</p>
              <p class="book-description">{{ book.description }}</p>
              <button class="btn btn-secondary">
                Reservar libro →
              </button>
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
            v-for="(page, index) in totalPages"
            :key="index"
            :class="['dot', { active: index === currentIndex }]"
            @click="goToSlide(index)"
          ></span>
        </div>
        <button 
          class="carousel-btn"
          :disabled="currentIndex >= totalPages - 1"
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
  name: 'NovedadesSection',
  data() {
    return {
      books: [],
      currentIndex: 0,
      itemsPerSlide: 3,
      windowWidth: window.innerWidth
    }
  },
  computed: {
    totalPages() {
      if (this.windowWidth <= 768) {
        // Mobile: avanza de 1 en 1
        return Math.max(1, this.books.length)
      } else {
        // Desktop: avanza de 3 en 3, pero muestra 3.5 por vista
        const itemsPerView = 3.5
        const itemsPerSlide = 3
        const totalItems = this.books.length
        
        if (totalItems <= itemsPerView) {
          return 1
        }
        
        // Calcular cuántos slides necesitamos si avanzamos de 3 en 3
        const remainingAfterFirst = totalItems - itemsPerView
        return Math.ceil(remainingAfterFirst / itemsPerSlide) + 1
      }
    },
    carouselTransform() {
      if (this.books.length === 0) return 0
      
      const isMobile = this.windowWidth <= 768
      const itemsPerView = isMobile ? 1 : 3.5
      const itemsPerSlide = isMobile ? 1 : 3
      const totalItems = this.books.length
      
      // Si estamos en el último slide, calcular el desplazamiento para mostrar el último elemento completo
      const isLastSlide = this.currentIndex >= this.totalPages - 1
      
      if (isLastSlide && totalItems > itemsPerView) {
        // Calcular el ancho total de todos los elementos
        const gapSize = isMobile ? 0 : 24
        const totalGaps = gapSize * (totalItems - 1)
        // Calcular el ancho de cada card como porcentaje
        const cardWidthPercent = isMobile ? 100 : (100 / itemsPerView)
        // Aproximación del ancho total en porcentaje considerando gaps
        const gapPercent = gapSize > 0 ? (totalGaps / this.windowWidth) * 100 : 0
        const totalWidthPercent = (totalItems * cardWidthPercent) + gapPercent
        
        // El desplazamiento máximo es: ancho total - 100% (ancho visible)
        const maxTransform = Math.max(0, totalWidthPercent - 100)
        return maxTransform
      }
      
      // Para slides normales
      if (isMobile) {
        return this.currentIndex * 100
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
    await this.loadBooks()
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
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
      if (this.currentIndex > 0) {
        this.currentIndex--
      }
    },
    nextSlide() {
      if (this.currentIndex < this.totalPages - 1) {
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
.novedades-section {
  padding: 60px 0;
  background: var(--background-light);
}

.section-title {
  text-align: center;
  font-size: 36px;
  color: var(--primary-blue);
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

.carousel-wrapper::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 135px;
  height: 100%;
  background: #ffffff7d;
  pointer-events: none;
  z-index: 10;
}

.carousel-wrapper.is-last-slide::after {
  display: none;
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
  background: var(--white);
  border-radius: 8px;
  border: 2px solid var(--border-gray);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  overflow: hidden;
  transition: transform 0.3s;
}

.book-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.book-cover {
  width: 100%;
  height: 250px;
  background: linear-gradient(135deg, #8B4513 0%, #654321 100%);
  position: relative;
}

.cover-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(139,69,19,0.3) 0%, rgba(101,67,33,0.3) 100%);
}

.book-info {
  padding: 20px;
}

.book-author {
  font-size: 14px;
  color: var(--text-light);
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
  font-size: 14px;
  color: var(--text-dark);
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
  .book-card {
    min-width: calc(50% - 12px);
  }
}

@media (max-width: 768px) {
  .section-title {
    font-size: 30px;
    text-align: left;
  }
  
  .book-card {
    width: 100%;
    min-width: 100%;
  }
  
  .carousel-container {
    gap: 0;
  }
  
  .carousel-wrapper::after {
    display: none;
  }
  
  .carousel-dots {
    display: none;
  }
}
</style>

