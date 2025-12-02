<template>
  <section class="faq-section">
    <div class="container">
      <h2 class="section-title">Preguntas Frecuentes</h2>
      <div class="faq-grid">
        <div class="faq-column">
          <div 
            v-for="faq in leftColumnFaqs" 
            :key="faq.id"
            class="faq-item"
          >
            <button 
              :class="['faq-question', { 'is-open': faq.isOpen }]"
              @click="toggleFaq(faq.id)"
            >
              <span>{{ faq.question }}</span>
              <span class="faq-icon">{{ faq.isOpen ? '▲' : '▼' }}</span>
            </button>
            <div v-if="faq.isOpen" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
        <div class="faq-column">
          <div 
            v-for="faq in rightColumnFaqs" 
            :key="faq.id"
            class="faq-item"
          >
            <button 
              :class="['faq-question', { 'is-open': faq.isOpen }]"
              @click="toggleFaq(faq.id)"
            >
              <span>{{ faq.question }}</span>
              <span class="faq-icon">{{ faq.isOpen ? '▲' : '▼' }}</span>
            </button>
            <div v-if="faq.isOpen" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="faq-footer">
        <a href="#" class="faq-link">
          <span class="link-text">Ir al Centro de Respuestas</span> <span class="arrow">→</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script>
import strapiService from '../../services/strapi'

export default {
  name: 'PreguntasFrecuentesSection',
  data() {
    return {
      faqs: []
    }
  },
  computed: {
    leftColumnFaqs() {
      return this.faqs.filter((_, index) => index % 2 === 0)
    },
    rightColumnFaqs() {
      return this.faqs.filter((_, index) => index % 2 === 1)
    }
  },
  async mounted() {
    await this.loadFaqs()
  },
  methods: {
    async loadFaqs() {
      try {
        const response = await strapiService.getCollection('preguntas-frecuentes', {
          populate: '*',
          sort: 'orden:asc'
        })
        this.faqs = (response.data || []).map(faq => ({
          ...faq,
          isOpen: false
        }))
      } catch (error) {
        console.error('Error loading FAQs:', error)
        // Datos de ejemplo
        this.faqs = [
          {
            id: 1,
            question: '¿Cómo puedo ver la bibliografía de mi carrera?',
            answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
            isOpen: false
          },
          {
            id: 2,
            question: '¿Cómo entro a mi cuenta de biblioteca?',
            answer: 'Para acceder a tu cuenta de biblioteca, debes utilizar tus credenciales institucionales en el portal de estudiantes.',
            isOpen: false
          },
          {
            id: 3,
            question: '¿Dónde puedo aprender a usar la biblioteca digital?',
            answer: 'Puedes acceder a los tutoriales y guías disponibles en la sección de ayuda del sitio web.',
            isOpen: false
          },
          {
            id: 4,
            question: '¿Qué puedo hacer dentro del sitio de Bibliotecas AIEP?',
            answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
            isOpen: false
          },
          {
            id: 5,
            question: '¿Qué diferencia hay entre libros físicos y digitales?',
            answer: 'Los libros físicos están disponibles para préstamo en las sedes, mientras que los digitales pueden ser consultados en línea.',
            isOpen: false
          },
          {
            id: 6,
            question: '¿Cómo sé si un libro está disponible en mi sede?',
            answer: 'Puedes consultar la disponibilidad de libros en la sección de búsqueda, filtrando por tu sede.',
            isOpen: false
          }
        ]
      }
    },
    toggleFaq(id) {
      const faq = this.faqs.find(f => f.id === id)
      if (faq) {
        faq.isOpen = !faq.isOpen
      }
    }
  }
}
</script>

<style scoped>
.faq-section {
  padding: 60px 0;
  background: var(--white);
}

.section-title {
  text-align: left;
  font-size: 36px;
  color: var(--primary-blue);
  margin-bottom: 40px;
}

.faq-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 40px;
}

.faq-column {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.faq-item {
  border-bottom: 1px solid var(--accent-red);
  margin: 0;
}

.faq-question {
  width: 100%;
  padding: 20px;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  font-weight: 600;
  color: var(--primary-blue);
  transition: background-color 0.3s;
}

.faq-question:hover {
  background-color: var(--background-light);
}

.faq-question.is-open {
  background-color: var(--background-light);
}

.faq-icon {
  font-size: 12px;
  color: var(--primary-blue);
}

.faq-answer {
  padding: 20px;
  color: var(--text-dark);
  line-height: 1.6;
  background-color: var(--background-light);
}

.faq-footer {
  text-align: right;
  margin-top: 40px;
}

.faq-link {
  color: var(--primary-blue);
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 18px;
}

.faq-link .link-text {
  text-decoration: underline;
}

.faq-link .arrow {
  text-decoration: none;
}

@media (max-width: 768px) {
  .section-title {
    font-size: 30px;
    text-align: center;
    margin-bottom: 24px;
  }
  
  .faq-grid {
    grid-template-columns: 1fr;
    margin-bottom: 24px;
    gap: 0;
  }
  
  .faq-column {
    gap: 0;
  }
  
  .faq-item {
    margin: 0;
    padding: 0;
    border-bottom: 1px solid var(--accent-red);
  }
  
  .faq-grid .faq-column:last-child .faq-item:last-child {
    border-bottom: none;
  }
  
  .faq-question {
    padding: 16px 20px;
    margin: 0;
  }
  
  .faq-answer {
    margin: 0;
    padding: 0 20px 20px 20px;
  }
}
</style>


