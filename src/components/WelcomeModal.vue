<template>
  <div v-if="showModal && isMobile" class="welcome-modal-overlay" @click.self="closeModal">
    <div class="welcome-modal">
      <div class="modal-image-container">
        <img 
          :src="modalImage" 
          alt="Estudiantes en biblioteca"
          class="modal-image"
        />
        <div class="modal-image-overlay">
          <svg width="190" height="134" viewBox="0 0 190 134" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M189.66 0V55.1621L110.619 134H109.519L188.88 54.8428V0.77832H134.673L1.09961 134H0L134.354 0H189.66Z" fill="white"/>
          </svg>
        </div>
      </div>
      
      <div class="modal-content">
        <h2 class="modal-title">¡Te damos la bienvenida a Bibliotecas AIEP! 👋</h2>
        <p class="modal-question">¿Quieres ver cómo funciona el sitio?</p>
        
        <div class="modal-buttons">
          <button class="btn-guide" @click="showGuide">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_40002161_2825)">
                <path d="M8 14.8571C4.21714 14.8571 1.14286 11.7829 1.14286 8C1.14286 4.21714 4.21714 1.14286 8 1.14286C11.7829 1.14286 14.8571 4.21714 14.8571 8C14.8571 11.7829 11.7829 14.8571 8 14.8571ZM8 0C3.58857 0 0 3.58857 0 8C0 12.4114 3.58857 16 8 16C12.4114 16 16 12.4114 16 8C16 3.58857 12.4114 0 8 0ZM10.9143 8.46858C10.5257 8.80572 7.10857 10.6743 6.56 10.8457C6.09714 11 5.90857 10.7371 5.84 10.6286C5.76 10.4686 5.72 10.2971 5.72 10.12V5.88C5.72 5.70857 5.76571 5.53143 5.84 5.37143C5.90857 5.25714 6.09714 5.00571 6.56 5.14857C7.10857 5.32571 10.5257 7.18857 10.9143 7.52571C11.0743 7.66286 11.1486 7.81143 11.1486 7.99429C11.1486 8.17715 11.0743 8.32571 10.9143 8.46286V8.46858ZM6.90857 4.06286C6.06857 3.79429 5.27429 4.08 4.84 4.81143C4.84 4.81143 4.84 4.82286 4.84 4.82857L4.82857 4.84C4.66286 5.16 4.57714 5.52 4.57714 5.88V10.12C4.57714 10.48 4.66286 10.84 4.82857 11.16C4.82857 11.1657 4.83429 11.1714 4.84 11.1771V11.1886C4.84 11.1886 4.88 11.24 4.89714 11.2686C4.89714 11.28 4.90857 11.2857 4.92 11.2971C5.24571 11.7714 5.73714 12.04 6.29143 12.04C6.49143 12.04 6.69714 12.0057 6.90286 11.9429C7.52571 11.7429 11.1086 9.81714 11.6571 9.33714C12.0686 8.98286 12.28 8.52 12.28 8.00571C12.28 7.49143 12.0629 7.02857 11.6571 6.67428C11.1086 6.19428 7.52571 4.26857 6.90286 4.06857H6.91429L6.90857 4.06286Z" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="clip0_40002161_2825">
                  <rect width="16" height="16" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            Sí, ver una guía rápida
          </button>
          <button class="btn-skip" @click="skipToSite">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.0373 0H8.99305V1.2H11.0373V0ZM13.9449 2.268C13.6272 0.917999 12.3982 0 11.0373 0V1.2C11.8706 1.2 12.596 1.758 12.7819 2.544L13.9509 2.268H13.9449ZM14.3945 7.2C14.3945 5.514 14.2926 3.714 13.9449 2.268L12.7759 2.544C13.0876 3.852 13.1895 5.538 13.1895 7.2H14.3885H14.3945ZM8.99305 0C8.66333 0 8.39355 0.27 8.39355 0.6C8.39355 0.93 8.66333 1.2 8.99305 1.2V0ZM13.1955 7.2C13.1955 7.53 13.4653 7.8 13.795 7.8C14.1247 7.8 14.3945 7.53 14.3945 7.2H13.1955Z" fill="currentColor"/>
              <path d="M11.0373 13.2H8.99305V14.4H11.0373V13.2ZM12.7819 11.856C12.596 12.642 11.8706 13.2 11.0373 13.2V14.4C12.3982 14.4 13.6272 13.482 13.9449 12.132L12.7759 11.856H12.7819ZM13.1955 7.20004C13.1955 8.86204 13.0936 10.542 12.7819 11.856L13.9509 12.132C14.2986 10.68 14.4005 8.88604 14.4005 7.20004H13.2015H13.1955ZM8.99305 13.2C8.66333 13.2 8.39355 13.47 8.39355 13.8C8.39355 14.13 8.66333 14.4 8.99305 14.4V13.2ZM14.3945 7.20004C14.3945 6.87004 14.1247 6.60004 13.795 6.60004C13.4653 6.60004 13.1955 6.87004 13.1955 7.20004H14.3945Z" fill="currentColor"/>
              <path d="M9.4843 6.34805L6.60072 3.44405L5.74944 4.29005L8.63302 7.19405L9.4843 6.34805ZM9.50229 8.00405C9.70611 7.78205 9.83201 7.50005 9.83201 7.18205C9.83201 6.86405 9.70012 6.58205 9.50229 6.36005L8.61503 7.16405L8.63901 7.19405C8.63901 7.19405 8.63901 7.18805 8.63901 7.18205V7.17005C8.63901 7.17005 8.63901 7.18205 8.61503 7.20005L9.50229 8.00405ZM6.6247 10.9441L9.4903 8.02205L8.63302 7.18205L5.76742 10.1041L6.6247 10.9441ZM6.60072 3.44405C6.36692 3.21005 5.98923 3.21005 5.75543 3.44405C5.52163 3.67805 5.52163 4.05605 5.75543 4.29005L6.60672 3.44405H6.60072ZM9.05866 6.76805L9.50229 6.36605L9.4903 6.35405L9.47831 6.34205L9.05266 6.76805H9.05866ZM9.05866 7.60205L9.4843 8.02205H9.4903L9.49629 8.00405L9.05266 7.60205H9.05866ZM5.76742 10.1041C5.53362 10.3381 5.53961 10.7221 5.77342 10.9501C6.00722 11.1841 6.3909 11.1781 6.61871 10.9441L5.76143 10.1041H5.76742Z" fill="currentColor"/>
              <path d="M9.23225 6.61206H0.599497V7.81206H9.23225V6.61206ZM0.599497 6.61206C0.269774 6.61206 0 6.88206 0 7.21206C0 7.54206 0.269774 7.81206 0.599497 7.81206V6.61206ZM9.23225 7.81206C9.56197 7.81206 9.83175 7.54206 9.83175 7.21206C9.83175 6.88206 9.56197 6.61206 9.23225 6.61206V7.81206Z" fill="currentColor"/>
            </svg>
            No, ir directo al sitio
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let modalImage = null

try {
  modalImage = require('@/assets/images/imagen3.jpg')
} catch (e) {
  console.log('Imagen del modal no encontrada')
}

export default {
  name: 'WelcomeModal',
  data() {
    return {
      showModal: false,
      isMobile: false,
      modalImage: modalImage
    }
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
    
    // Mostrar el modal siempre en móvil al cargar/refrescar la página
    if (this.isMobile) {
      // Pequeño delay para asegurar que el modal aparezca después de que todo cargue
      setTimeout(() => {
        this.showModal = true
        // Bloquear scroll del body cuando el modal está abierto
        document.body.style.overflow = 'hidden'
        // Ajustar posición del modal para que coincida con hero-widget
        this.$nextTick(() => {
          this.adjustModalPosition()
        })
      }, 500)
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
    // Restaurar scroll del body
    document.body.style.overflow = ''
  },
  watch: {
    showModal(newVal) {
      // Bloquear/desbloquear scroll del body según el estado del modal
      if (newVal) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = ''
      }
    }
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768
      // Si cambia a desktop, ocultar el modal
      if (!this.isMobile) {
        this.showModal = false
        document.body.style.overflow = ''
      }
    },
    closeModal() {
      this.showModal = false
      document.body.style.overflow = ''
    },
    showGuide() {
      // Aquí puedes implementar la lógica para mostrar la guía
      this.closeModal()
      // Por ahora, simplemente cierra el modal
      // Puedes agregar lógica adicional aquí
    },
    skipToSite() {
      this.closeModal()
    },
    adjustModalPosition() {
      // Obtener la posición del hero-widget
      const heroWidget = document.querySelector('.hero-widget')
      if (heroWidget) {
        const rect = heroWidget.getBoundingClientRect()
        const modalOverlay = document.querySelector('.welcome-modal-overlay')
        if (modalOverlay) {
          // Calcular la posición exacta del hero-widget desde el top de la ventana
          const topPosition = rect.top
          modalOverlay.style.paddingTop = `${topPosition}px`
          modalOverlay.style.alignItems = 'flex-start'
        }
      }
    }
  }
}
</script>

<style scoped>
.welcome-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 10000;
  padding: 0 20px;
}

.welcome-modal {
  background: var(--white);
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  animation: slideUp 0.3s ease-out;
  margin: 0 auto;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-image-container {
  position: relative;
  width: calc(100% - 24px);
  height: 150px;
  overflow: hidden;
  background-color: #182844A6;
  margin: 12px;
  border-radius: 8px;
  border: 2px solid var(--white);
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  mix-blend-mode: overlay;
}

.modal-image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  overflow: hidden;
  padding: 20px;
  padding-bottom: 0px;
  padding-right: 60px;
}

.modal-image-overlay svg {
  width: auto;
  height: 100%;
  max-width: 100%;
  opacity: 1;
}

.modal-content {
  padding: 8px 24px 24px 24px;
}

.modal-title {
  font-size: 20px;
  font-weight: bold;
  color: var(--primary-blue);
  margin-bottom: 12px;
  line-height: 1.3;
  text-align: center;
}

.modal-question {
  font-size: 16px;
  color: var(--text-light);
  margin-bottom: 24px;
  text-align: center;
}

.modal-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-guide {
  width: 100%;
  padding: 14px 20px;
  background: var(--light-blue);
  color: var(--primary-blue);
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-guide:hover {
  background: var(--secondary-blue);
  color: var(--white);
}

.btn-guide svg {
  flex-shrink: 0;
}

.btn-skip {
  width: 100%;
  padding: 14px 20px;
  background: var(--white);
  color: var(--primary-blue);
  border: 2px solid var(--primary-blue);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
}

.btn-skip:hover {
  background: var(--primary-blue);
  color: var(--white);
}

.btn-skip svg {
  flex-shrink: 0;
}

/* Solo mostrar en móvil */
@media (min-width: 769px) {
  .welcome-modal-overlay {
    display: none;
  }
}

@media (max-width: 480px) {
  .welcome-modal-overlay {
    padding: 0 20px;
    padding-top: 80px;
  }
  
  .welcome-modal {
    width: 90%;
    max-width: 400px;
    border-radius: 8px;
  }
  
  .modal-content {
    padding: 24px;
  }
  
  .modal-title {
    font-size: 20px;
  }
  
  .modal-image-container {
    height: 150px;
  }
  
  .modal-content {
    padding: 0px 24px 24px 24px;
  }
}
</style>
