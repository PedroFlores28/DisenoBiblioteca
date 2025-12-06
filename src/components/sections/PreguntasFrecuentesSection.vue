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
              <svg class="faq-icon" :class="{ rotated: faq.isOpen }" width="20" height="10" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5874 12.5748C11.8049 12.5748 11.0225 12.2845 10.3536 11.6913L0.38372 2.13792C-0.108465 1.65835 -0.133705 0.875904 0.34586 0.383719C0.825425 -0.108465 1.60787 -0.133704 2.10006 0.345861L12.0321 9.86142C12.3981 10.1895 12.7893 10.1895 13.2058 9.82357L23.0999 0.345861C23.5921 -0.133704 24.3872 -0.108465 24.8541 0.383719C25.3337 0.875904 25.3085 1.67097 24.8163 2.13792L14.8842 11.6535C14.1901 12.2719 13.3824 12.5748 12.5874 12.5748Z" fill="#AA0000"/>
              </svg>
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
              <svg class="faq-icon" :class="{ rotated: faq.isOpen }" width="20" height="10" viewBox="0 0 26 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5874 12.5748C11.8049 12.5748 11.0225 12.2845 10.3536 11.6913L0.38372 2.13792C-0.108465 1.65835 -0.133705 0.875904 0.34586 0.383719C0.825425 -0.108465 1.60787 -0.133704 2.10006 0.345861L12.0321 9.86142C12.3981 10.1895 12.7893 10.1895 13.2058 9.82357L23.0999 0.345861C23.5921 -0.133704 24.3872 -0.108465 24.8541 0.383719C25.3337 0.875904 25.3085 1.67097 24.8163 2.13792L14.8842 11.6535C14.1901 12.2719 13.3824 12.5748 12.5874 12.5748Z" fill="#AA0000"/>
              </svg>
            </button>
            <div v-if="faq.isOpen" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="faq-footer">
        <a href="#" class="faq-link">
          <span class="link-text">Ir al Centro de Respuestas</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.1412 10.8664L15.3471 3.77495C15.0047 3.42353 14.446 3.40551 14.0946 3.74792C13.7432 4.09033 13.7252 4.649 14.0676 5.00042L20.3841 11.5963H2.10127C1.60568 11.5963 1.2002 12.0018 1.2002 12.4974C1.2002 12.993 1.60568 13.3985 2.10127 13.3985H20.3841L14.0676 19.9944C13.7252 20.3458 13.7432 20.9135 14.0946 21.2469C14.2658 21.409 14.4911 21.4901 14.7074 21.4901C14.9416 21.4901 15.1759 21.4 15.3471 21.2198L22.1683 14.1013C23.0153 13.1371 23.0153 11.8486 22.1412 10.8664Z" fill="#024588"/>
          </svg>
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
  color: #024588;
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
  font-weight: 400;
  color: var(--primary-blue);
  transition: background-color 0.3s;
}

@media (min-width: 769px) {
  .faq-question {
    font-size: 20px;
    color: #024588;
  }
}

.faq-question:hover {
  background-color: var(--background-light);
}

.faq-question.is-open {
  background-color: var(--background-light);
  color: #102A8A;
}

.faq-icon {
  width: 20px;
  height: 10px;
  flex-shrink: 0;
  transition: transform 0.3s ease;
}

.faq-icon.rotated {
  transform: rotate(180deg);
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

.faq-link svg {
  transition: transform 0.3s ease;
}

.faq-link:hover svg {
  transform: translateX(4px);
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
    font-size: 18x;
  }
  
  .faq-answer {
    margin: 0;
    padding: 0 20px 20px 20px;
  }
}
</style>


