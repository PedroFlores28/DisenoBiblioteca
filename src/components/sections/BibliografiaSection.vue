<template>
  <section id="bibliografia" class="bibliografia-section">
    <div class="container">
      <div class="section-header">
        <div class="title-bar"></div>
        <h2 class="section-title">Bibliografía por escuela</h2>
      </div>
      <p class="section-description">
        Selecciona tu escuela y luego busca tu carrera para conocer la Bibliografía Básica de cada una.
      </p>
      <div class="schools-grid" v-if="schools.length > 0">
        <div 
          v-for="school in displayedSchools" 
          :key="school.id"
          class="school-card"
        >
          <div :class="['card-accent', `accent-${school.color}`]"></div>
          <h3 class="card-title">{{ school.name }}</h3>
          <a href="#" class="card-link">Ver más →</a>
        </div>
      </div>
      <div class="pagination" v-if="totalPages > 1">
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
    </div>
  </section>
</template>

<script>
import strapiService from '../../services/strapi'

export default {
  name: 'BibliografiaSection',
  data() {
    // Datos de ejemplo precargados
    const exampleSchools = [
      { id: 1, name: 'Administración y Gestión Empresarial', color: 'green' },
      { id: 2, name: 'Artes e Industrias Creativas', color: 'purple' },
      { id: 3, name: 'Desarrollo Social y Educación', color: 'purple' },
      { id: 4, name: 'Estética Integral', color: 'purple' },
      { id: 5, name: 'Ingeniería y Tecnología', color: 'blue' },
      { id: 6, name: 'Salud y Ciencias Médicas', color: 'red-accent' },
      { id: 7, name: 'Derecho y Ciencias Jurídicas', color: 'orange-accent' },
      { id: 8, name: 'Comunicación y Periodismo', color: 'purple' },
      { id: 9, name: 'Psicología y Ciencias del Comportamiento', color: 'purple' },
      { id: 10, name: 'Gastronomía y Hotelería', color: 'orange-accent' },
      { id: 11, name: 'Diseño Gráfico y Multimedia', color: 'blue' },
      { id: 12, name: 'Enfermería y Técnicas de Salud', color: 'red-accent' },
      { id: 13, name: 'Contabilidad y Auditoría', color: 'green' },
      { id: 14, name: 'Marketing y Publicidad', color: 'purple' },
      { id: 15, name: 'Trabajo Social', color: 'blue' },
      { id: 16, name: 'Pedagogía en Educación Básica', color: 'purple' },
      { id: 17, name: 'Técnico en Informática', color: 'blue' },
      { id: 18, name: 'Fisioterapia y Kinesiología', color: 'red-accent' },
      { id: 19, name: 'Turismo y Gestión de Eventos', color: 'orange-accent' },
      { id: 20, name: 'Fotografía Profesional', color: 'purple' },
      { id: 21, name: 'Nutrición y Dietética', color: 'green' },
      { id: 22, name: 'Técnico en Construcción', color: 'blue' },
      { id: 23, name: 'Administración Pública', color: 'green' },
      { id: 24, name: 'Técnico en Prevención de Riesgos', color: 'orange-accent' }
    ]

    return {
      schools: exampleSchools, // Cargar datos de ejemplo inmediatamente
      currentPage: 1,
      itemsPerPage: 4,
      windowWidth: window.innerWidth,
      isLoading: false
    }
  },
  computed: {
    displayedSchools() {
      const itemsPerPage = this.windowWidth <= 768 ? 1 : 4
      const start = (this.currentPage - 1) * itemsPerPage
      const end = start + itemsPerPage
      return this.schools.slice(start, end)
    },
    totalPages() {
      const itemsPerPage = this.windowWidth <= 768 ? 1 : 4
      return Math.ceil(this.schools.length / itemsPerPage)
    }
  },
  async mounted() {
    await this.loadSchools()
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
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
        }
      } catch (error) {
        // Si falla, mantener los datos de ejemplo que ya están cargados
        console.log('Strapi no disponible, usando datos de ejemplo')
      }
    },
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    goToPage(page) {
      this.currentPage = page
    },
    handleResize() {
      this.windowWidth = window.innerWidth
      // Resetear a la primera página cuando cambia el tamaño
      const itemsPerPage = window.innerWidth <= 768 ? 1 : 4
      const maxPages = Math.ceil(this.schools.length / itemsPerPage)
      if (this.currentPage > maxPages) {
        this.currentPage = 1
      }
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
  width: 4px;
  height: 60px;
  background-color: var(--accent-red);
}

.section-title {
  font-size: 36px;
  color: var(--primary-blue);
  margin: 0;
}

.section-description {
  color: var(--text-light);
  margin-bottom: 40px;
  font-size: 16px;
}

.schools-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 40px;
}

.school-card {
  background: var(--white);
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  position: relative;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.school-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  border-radius: 8px 8px 0 0;
}

.accent-green {
  background-color: #4caf50;
}

.accent-purple {
  background-color: #9c27b0;
}

.accent-blue {
  background-color: #2196f3;
}

.accent-red-accent {
  background-color: #f44336;
}

.accent-orange-accent {
  background-color: #ff9800;
}

.card-title {
  font-size: 18px;
  color: var(--primary-blue);
  margin-bottom: 16px;
  font-weight: 600;
}

.card-link {
  color: var(--secondary-blue);
  text-decoration: none;
  font-weight: 500;
  display: inline-block;
  margin-top: auto;
  align-self: flex-end;
}

.card-link:hover {
  text-decoration: underline;
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

.loading {
  text-align: center;
  padding: 40px;
  color: var(--text-light);
}

@media (max-width: 1200px) {
  .schools-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .schools-grid {
    grid-template-columns: 1fr;
  }
  
  .school-card {
    height: 160px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
  
  .pagination-dots {
    display: none;
  }
}
</style>

