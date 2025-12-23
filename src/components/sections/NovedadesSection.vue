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
          <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.11127 18.0301C7.87646 18.0301 7.64164 17.9398 7.47005 17.7592L0.660453 10.6516C-0.215582 9.65812 -0.215582 8.36664 0.63336 7.40932L7.47005 0.2746C7.81324 -0.0776207 8.37318 -0.0956822 8.7254 0.247507C9.07762 0.590696 9.09568 1.15064 8.75249 1.50286L1.9429 8.61048C1.70808 8.88142 1.70808 9.15236 1.96999 9.45039L8.75249 16.5309C9.09568 16.8832 9.07762 17.4521 8.7254 17.7863C8.55381 17.9488 8.32802 18.0301 8.11127 18.0301Z" fill="#8B93A1"/>
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
          <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.888728 18.0301C0.662946 18.0301 0.446195 17.9488 0.2746 17.7863C-0.07762 17.4431 -0.0956828 16.8832 0.247506 16.5309L7.0571 9.4233C7.29192 9.15236 7.29192 8.88142 7.03001 8.58339L0.247506 1.50286C-0.0956828 1.15064 -0.07762 0.581664 0.2746 0.247506C0.626821 -0.0956827 1.19579 -0.0776201 1.52995 0.2746L8.33955 7.38223C9.21558 8.36664 9.21558 9.66715 8.36664 10.6245L1.52995 17.7592C1.35836 17.9398 1.12354 18.0301 0.888728 18.0301Z" fill="#D1D4DA"/>
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
          name: 'Bibliografia básica digital',
          url: 'https://bibliografiadigital.aiep.cl/?_gl=1*8rbnmu*_gcl_au*OTUzMjQzNjY5LjE3NjU0NjcxNzM.*_ga*MTc5NjU2OTU3MS4xNzY1NDY3MTcy*_ga_LXQ40Q3QZJ*czE3NjU5ODY1MDIkbzckZzEkdDE3NjU5ODcwMjckajYwJGwwJGgxMDI4OTA1Mw..'
        },
        {
          id: 2,
          name: 'Bibliotecario en línea',
          url: 'http://biblioteayuda.aiep.cl/referencia/index.php?_gl=1*8rbnmu*_gcl_au*OTUzMjQzNjY5LjE3NjU0NjcxNzM.*_ga*MTc5NjU2OTU3MS4xNzY1NDY3MTcy*_ga_LXQ40Q3QZJ*czE3NjU5ODY1MDIkbzckZzEkdDE3NjU5ODcwMjckajYwJGwwJGgxMDI4OTA1Mw..'
        },
        {
          id: 3,
          name: 'Taller de biblioteca para docentes',
          url: 'https://forms.office.com/Pages/ResponsePage.aspx?id=jfEJ3MNq8E6gHmZSXtmk0IQ7mA6rH_1GodIbSTop2-1UMFRXSkFEVDdMVE04QTM5MFlBT0E3VkVCQy4u'
        },
        {
          id: 4,
          name: 'Taller de biblioteca para estudiantes',
          url: 'https://forms.office.com/Pages/ResponsePage.aspx?id=jfEJ3MNq8E6gHmZSXtmk0IQ7mA6rH_1GodIbSTop2-1UMktRVEtTSVlLSTA3TkZTRjBMTUFRQUM5My4u'
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
        // Desktop: muestra 4 o 3.5 cards por vista, pero avanza de 1 en 1
        const itemsPerView = this.isLibrosPorSede ? 4 : 3.5
        const itemsPerSlide = 1 // Avanzar de 1 en 1 en desktop
        const totalItems = this.books.length
        
        if (totalItems <= itemsPerView) {
          return 1
        }
        
        // Calcular cuántos slides necesitamos avanzando de 1 en 1
        const remainingAfterFirst = totalItems - itemsPerView
        return Math.ceil(remainingAfterFirst / itemsPerSlide) + 1
      }
    },
    carouselTransform() {
      if (this.books.length === 0) return 0
      
      const isMobile = this.windowWidth <= 768
      const itemsPerView = isMobile ? 1 : (this.isLibrosPorSede ? 4 : 3.5)
      
      // Para slides normales y último slide
      if (isMobile) {
        return this.currentIndex * 100
      } else {
        // En desktop: avanzar de 1 en 1 elemento
        const containerWidth = this.$refs.carouselWrapper ? this.$refs.carouselWrapper.clientWidth : this.windowWidth
        if (containerWidth > 0) {
          // Calcular el ancho de una card incluyendo el gap
          const gapSize = 24
          const totalGaps = (itemsPerView - 1) * gapSize // Gaps entre las cards visibles
          const cardWidth = (containerWidth - totalGaps) / itemsPerView
          // Avanzar 1 card + 1 gap
          const slideMove = cardWidth + gapSize
          return (this.currentIndex * slideMove / containerWidth) * 100
        }
        // Fallback si no hay ancho disponible
        const cardWidthPercent = 100 / itemsPerView
        const gapSize = 24
        const gapPercent = (gapSize / this.windowWidth) * 100
        // Avanzar 1 elemento: 1 card + 1 gap
        const slideMove = cardWidthPercent + gapPercent
        return this.currentIndex * slideMove
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
    // Mover servicios-content inicialmente
    this.$nextTick(() => {
      this.moveServiciosContent()
    })
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
            title: 'BIM handbook : a guide to building information modeling for owners, managers, designers, engineers and contractors',
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
        this.moveServiciosContent()
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
      
      // Mover servicios-content debajo del grid de escuelas en desktop cuando Libros por sede está activo
      this.$nextTick(() => {
        this.moveServiciosContent()
      })
    },
    moveServiciosContent() {
      // Solo mover en desktop (windowWidth > 768) y cuando Libros por sede está activo
      const isDesktop = this.windowWidth > 768
      
      const serviciosContent = this.$el?.querySelector('.servicios-content')
      if (!serviciosContent) return
      
      const bibliografiaSection = document.querySelector('.bibliografia-section')
      const bibliografiaContainer = bibliografiaSection?.querySelector('.container')
      const schoolsGridWrapper = bibliografiaSection?.querySelector('.schools-grid-wrapper')
      const novedadesContainer = this.$el?.querySelector('.container')
      
      // Verificar si ya existe un servicios-content en bibliografia (evitar duplicados)
      const existingServiciosInBibliografia = bibliografiaContainer?.querySelector('.servicios-content')
      if (existingServiciosInBibliografia && existingServiciosInBibliografia !== serviciosContent) {
        existingServiciosInBibliografia.remove()
      }
      
      // Solo en desktop Y cuando Libros por sede está activo
      if (isDesktop && this.isLibrosPorSede && schoolsGridWrapper && bibliografiaContainer) {
        // Mover el contenido de servicios después del grid de escuelas
        if (serviciosContent.parentNode !== bibliografiaContainer) {
          bibliografiaContainer.appendChild(serviciosContent)
        }
      } else {
        // Regresar el contenido de servicios a su posición original
        // (cuando no es desktop, o cuando Libros por sede no está activo)
        if (novedadesContainer && serviciosContent.parentNode !== novedadesContainer) {
          novedadesContainer.appendChild(serviciosContent)
        }
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
      // Abrir el link del servicio en una nueva pestaña
      if (service && service.url) {
        window.open(service.url, '_blank')
      }
    }
  }
}
</script>

<style scoped>
.novedades-section {
  padding: 60px 0;

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
  background: #FFFFFF;
  border-radius: 8px;
  border: 2px solid #FFFFFF;
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
    margin: 16px auto 0;
    padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .book-info.libros-por-sede .book-author {
    font-size: 16px;
    margin-bottom: 6px;
    flex-shrink: 0;
    line-height: 1.4;
    color: #182844;
  }
  
  .book-info.libros-por-sede .book-title {
    font-size: 20px;
    font-family: 'Ubuntu', sans-serif;
    font-weight: 500;
    margin-bottom: 6px;
    line-height: 1.3;
    flex-shrink: 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .book-info.libros-por-sede .book-isbn {
    font-size: 12px;
    margin-bottom: 12px;
    flex-shrink: 0;
  }
  
  .book-info.libros-por-sede .book-description {
    font-size: 13px;
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
    padding: 8px 20px;
    font-size: 13px;
    font-weight: bold;
    font-family: 'Ubuntu', sans-serif;
    border-radius: 8px;
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
  font-size: 16px;
  color: #182844;
  margin-bottom: 8px;
  font-family: Verdana, sans-serif;
}

.book-title {
  font-size: 20px;
  color: var(--accent-red);
  font-weight: 500;
  font-family: 'Ubuntu', sans-serif;
  margin-bottom: 8px;
  line-height: 1.4;
}

.book-isbn {
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: 12px;
  font-family: Verdana, sans-serif;
}

.book-description {
  font-size: 13px;
  color: #182844;
  line-height: 1.6;
  margin-bottom: 16px;
  font-family: Verdana, sans-serif;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.book-info .btn.btn-secondary {
  font-family: 'Ubuntu', sans-serif;
  font-weight: bold;
  border-radius: 8px;
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
    max-width: 1200px;
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
    color: #024588;
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
  
  .book-card.libros-por-sede {
    display: flex;
    flex-direction: column;
  }
  
  .book-cover.libros-por-sede {
    width: 188px;
    height: 254px;
    margin: 0 auto;
    flex-shrink: 0;
  }
  
  .cover-placeholder {
    width: 188px;
    height: 254px;
  }
  
  .book-info.libros-por-sede {
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
  }
  
  .book-info.libros-por-sede .book-author {
    flex-shrink: 0;
  }
  
  .book-info.libros-por-sede .book-title {
    flex-shrink: 0;
  }
  
  .book-info.libros-por-sede .book-isbn {
    flex-shrink: 0;
  }
  
  .book-info.libros-por-sede .book-description {
    flex: 1;
    min-height: 0;
    margin-bottom: 12px;
  }
  
  .book-info.libros-por-sede .btn {
    margin-top: auto;
    padding: 8px 20px;
    font-size: 13px;
    font-weight: bold;
    font-family: 'Ubuntu', sans-serif;
    border-radius: 8px;
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
    justify-content: flex-end;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
  }
  
  .carousel-controls .carousel-btn {
    width: 48px;
    height: 48px;
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
  background: #024588;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #FFFFFF;
}

/* Ocultar servicios-content en desktop cuando Libros digitales está activo */

.servicios-text {
  flex: 1;
  max-width: 500px;
}

.title-bar {
  width: 500px;
  height: 8px;
  background: #BB3333;
  margin-bottom: 24px;
  margin-top: -40px;
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
  color: #FFFFFF;
}

.title-line-1::after {
  content: ' ';
}

.servicios-subtitle {
  font-size: 15px;
  color: #FFFFFF;
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
  background: #D7E5F4;
  color: #024588;
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
  background: #D7E5F4;
  opacity: 0.9;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(215, 229, 244, 0.3);
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
    background: #024588;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .servicios-content.hide-on-libros-por-sede-mobile {
    display: none;
  }

  .title-bar {
    width: 50%;
    max-width: 50%;
    background: #BB3333;
    margin-top: -24px;
  }

  .servicios-title {
    font-size: 28px;
    display: flex;
    flex-direction: column;
    line-height: 1.2;
  }
  
  .title-line-1 {
    display: block;
    color: #FFFFFF;
  }
  
  .title-line-2 {
    display: block;
    color: #FFFFFF;
  }

  .servicios-subtitle {
    font-size: 16px;
    color: #FFFFFF;
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
  
  .servicios-title {
    margin-top: 40px;
  }
}
</style>

