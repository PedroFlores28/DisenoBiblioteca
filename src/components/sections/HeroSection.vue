<template>
  <section class="hero">
    <div 
      class="hero-background" 
      :class="{ 'has-image': backgroundImage }"
      :style="backgroundImage ? { 
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      } : {}"
    ></div>
    <div class="hero-container">
      <div class="hero-content">
        <div class="hero-text">
          <p class="hero-subtitle">Servicios y recursos al servicio de tu aprendizaje</p>
          <h2 class="hero-title">¡Bienvenido/a a Bibliotecas AIEP!</h2>
          <button class="btn btn-secondary">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_40002132_2958)">
                <path d="M12 22.2857C6.32571 22.2857 1.71429 17.6743 1.71429 12C1.71429 6.32571 6.32571 1.71429 12 1.71429C17.6743 1.71429 22.2857 6.32571 22.2857 12C22.2857 17.6743 17.6743 22.2857 12 22.2857ZM12 0C5.38286 0 0 5.38286 0 12C0 18.6171 5.38286 24 12 24C18.6171 24 24 18.6171 24 12C24 5.38286 18.6171 0 12 0ZM16.3714 12.7029C15.7886 13.2086 10.6629 16.0114 9.84 16.2686C9.14571 16.5 8.86286 16.1057 8.76 15.9429C8.64 15.7029 8.58 15.4457 8.58 15.18V8.81999C8.58 8.56285 8.64857 8.29714 8.76 8.05714C8.86286 7.88571 9.14571 7.50857 9.84 7.72285C10.6629 7.98857 15.7886 10.7829 16.3714 11.2886C16.6114 11.4943 16.7229 11.7171 16.7229 11.9914C16.7229 12.2657 16.6114 12.4886 16.3714 12.6943V12.7029ZM10.3629 6.09429C9.10286 5.69143 7.91143 6.12 7.26 7.21714C7.26 7.21714 7.26 7.23428 7.26 7.24285L7.24286 7.26C6.99429 7.74 6.86571 8.27999 6.86571 8.81999V15.18C6.86571 15.72 6.99429 16.26 7.24286 16.74C7.24286 16.7486 7.25143 16.7571 7.26 16.7657V16.7829C7.26 16.7829 7.32 16.86 7.34571 16.9029C7.34571 16.92 7.36286 16.9286 7.38 16.9457C7.86857 17.6571 8.60571 18.06 9.43714 18.06C9.73714 18.06 10.0457 18.0086 10.3543 17.9143C11.2886 17.6143 16.6629 14.7257 17.4857 14.0057C18.1029 13.4743 18.42 12.78 18.42 12.0086C18.42 11.2371 18.0943 10.5429 17.4857 10.0114C16.6629 9.29142 11.2886 6.40285 10.3543 6.10285H10.3714L10.3629 6.09429Z" fill="#024588"/>
              </g>
              <defs>
                <clipPath id="clip0_40002132_2958">
                  <rect width="24" height="24" fill="white"/>
                </clipPath>
              </defs>
            </svg>
            Ver guía rápida de uso
          </button>
        </div>
        <div class="hero-widget">
          <div class="widget-tabs-wrapper">
            <div class="widget-tabs">
              <button 
                :class="['tab', { active: activeTab === 'fisicos' }]"
                @click="activeTab = 'fisicos'"
              >
                Libros por sede
              </button>
              <button 
                :class="['tab', { active: activeTab === 'digitales' }]"
                @click="activeTab = 'digitales'"
              >
                Libros digitales
              </button>
            </div>
          </div>
          <div class="widget-divider"></div>
          <h3 class="widget-title">
            {{ activeTab === 'fisicos' ? 'Libros disponibles en tu sede' : 'Accede a libros y recursos digitales' }}
          </h3>
          <p class="widget-description">
            {{ activeTab === 'fisicos' ? 'Accede al catálogo de libros físicos disponibles para préstamo.' : 'Descubre lecturas y materiales digitales que facilitan tu estudio' }}
          </p>
          <div class="search-container">
            <div class="search-box">
              <select class="search-filter">
                <option>Filtra resultados</option>
                <option>Asignatura</option>
                <option>Autor</option>
                <option>Carrera</option>
                <option>ISBN</option>
                <option>Título</option>
              </select>
              <input 
                v-model="searchQuery"
                type="text" 
                class="search-input" 
                placeholder="La teoría del color por Joseff Albers"
                @keyup.enter="handleSearch"
              />
            </div>
            <button class="search-btn" @click="handleSearch">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </button>
            <select class="search-filter search-filter-mobile">
              <option>Filtra resultados</option>
              <option>Asignatura</option>
              <option>Autor</option>
              <option>Carrera</option>
              <option>ISBN</option>
              <option>Título</option>
            </select>
            <div class="search-input-group">
              <input 
                v-model="searchQuery"
                type="text" 
                class="search-input search-input-mobile" 
                placeholder="La teoría del color por Joseff Albers"
                @keyup.enter="handleSearch"
              />
              <button class="search-btn search-btn-mobile" @click="handleSearch">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="floating-btn">
      <span>🎓</span>
      <span class="floating-btn-text">
        <span>Revisa la bibliografía</span>
        <span>de tu carrera</span>
      </span>
    </button>
  </section>
</template>

<script>
let backgroundImageDesktop = null
let backgroundImageMobile = null

try {
  backgroundImageDesktop = require('@/assets/images/hero-background.jpg')
} catch (e) {
  // Imagen de fondo desktop no encontrada
}

try {
  backgroundImageMobile = require('@/assets/images/b1b818e26d255f001e62b637fce22a3221cf95c6.jpg')
} catch (e) {
  // Imagen de fondo mobile no encontrada
}

export default {
  name: 'HeroSection',
  data() {
    return {
      activeTab: 'fisicos',
      searchQuery: '',
      backgroundImageDesktop: backgroundImageDesktop,
      backgroundImageMobile: backgroundImageMobile,
      isMobile: false
    }
  },
  computed: {
    backgroundImage() {
      return this.isMobile ? this.backgroundImageMobile : this.backgroundImageDesktop
    }
  },
  mounted() {
    this.checkMobile()
    window.addEventListener('resize', this.checkMobile)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile)
  },
  methods: {
    checkMobile() {
      this.isMobile = window.innerWidth <= 768
    },
    handleSearch() {
      // Emitir evento o llamar a servicio de búsqueda
    }
  }
}
</script>

<style scoped>
.hero {
  position: relative;
  min-height: 500px;
  padding: 100px 20px 60px;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--primary-blue) 0%, var(--secondary-blue) 100%);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
}

.hero-background.has-image {
  background: none;
}

.hero-background::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0, 51, 102, 0.75) 0%, rgba(0, 102, 204, 0.7) 100%);
  z-index: 1;
}

.hero-background.has-image::after {
  background: #182844A6;
}

@media (max-width: 768px) {
  .hero-background::after {
    background: linear-gradient(135deg, rgba(0, 51, 102, 0.75) 0%, rgba(0, 102, 204, 0.65) 100%);
  }
}

.hero-container {
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 40px;
  align-items: center;
}

.hero-text {
  color: var(--white);
}

.hero-text .btn {
  margin-top: 16px;
}

.hero-subtitle {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  opacity: 1;
}

.hero-title {
  font-size: 48px;
  font-weight: bold;
  margin-bottom: 24px;
  line-height: 1.2;
}

.hero-widget {
  background: #F8F8F8;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.widget-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 0;
  background: #F8F8F8;
  border-radius: 8px 8px 0 0;
  padding: 8px;
}

.widget-divider {
  width: 100%;
  height: 1px;
  background: var(--border-gray);
  margin: 16px 0;
}

@media (min-width: 769px) {
  .widget-divider {
    height: 1px;
    background: #E0E0E0;
    margin: 0;
  }
}

@media (min-width: 769px) {
  .hero-container {
    max-width: 1329px;
  }
  
  .hero-widget {
    width: 753px;
    height: 289px;
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .widget-tabs-wrapper {
    width: auto;
    background: #F8F8F8;
    border-radius: 8px 8px 0 0;
  }
  
  .widget-tabs {
    background: #F8F8F8;
    border-radius: 8px 8px 0 0;
    padding: 16px 8px 8px 8px;
    margin-bottom: 0;
    flex-shrink: 0;
  }
  
  .widget-title {
    padding: 16px 24px 8px 24px;
    margin: 0;
    font-size: 28px;
  }
  
  .widget-description {
    padding: 0 24px 20px 24px;
    margin: 0;
    font-size: 16px;
  }
  
  .search-container {
    padding: 0 24px 24px 24px;
    margin-top: -8px;
  }
}

.tab {
  padding: 10px 20px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: var(--secondary-blue);
  border-radius: 4px;
  transition: all 0.3s;
  font-size: 16px;
}

.tab.active {
  background: #024588;
  color: var(--white);
  font-weight: 500;
}

.widget-title {
  font-size: 28px;
  color: #024588;
  margin-bottom: 8px;
}

.widget-description {
  color: var(--text-light);
  font-size: 16px;
  margin-bottom: 20px;
}

.search-container {
  display: flex;
  gap: 8px;
  align-items: center;
}

.search-box {
  display: flex;
  gap: 0;
  border: 2px solid #102A8A;
  border-radius: 8px;
  overflow: hidden;
  flex: 1;
}

.search-filter {
  padding: 12px 16px;
  padding-right: 32px;
  border: none;
  border-radius: 0;
  background: #F4F7FFB5;
  color: #102A8A;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  border-right: 2px solid #102A8A;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23102A8A' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-color: #F4F7FFB5;
}

.search-filter option:first-child {
  color: #102A8A;
}

.search-filter option:not(:first-child) {
  color: #24334E;
}

.search-filter:focus {
  outline: none;
}

.search-input {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 0;
  font-size: 16px;
  background: var(--white);
  color: var(--text-dark);
}

.search-filter-mobile {
  display: none;
}

.search-input-mobile {
  display: none;
}

.search-input-group {
  display: none;
}

.search-btn-mobile {
  display: none;
}

.search-input:focus {
  outline: none;
}

.search-btn {
  width: 48px;
  height: 48px;
  padding: 0;
  background: var(--accent-red);
  color: var(--white);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.search-btn:hover {
  background: #880000;
}

.floating-btn {
  position: absolute;
  top: 20px;
  right: 0;
  padding: 12px 20px;
  background: var(--accent-red);
  color: var(--white);
  border: none;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  z-index: 10;
}

.floating-btn-text {
  display: flex;
  flex-direction: column;
  line-height: 1.3;
  text-align: left;
}

.floating-btn-text span {
  display: block;
}

.floating-btn:hover {
  background: #880000;
}

@media (max-width: 968px) {
  .hero-content {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: 36px;
  }
}

@media (max-width: 768px) {
  .hero {
    padding: 80px 20px 40px;
    min-height: auto;
  }
  
  .hero-text {
    display: none;
  }
  
  .hero-widget {
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .hero-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  
  .floating-btn {
    position: absolute;
    top: 20px;
    right: 0;
    padding: 8px 12px;
    font-size: 13px;
    border-radius: 4px 0 0 4px;
  }
  
  .floating-btn span:first-child {
    font-size: 13px;
  }
  
  .floating-btn-text {
    font-size: 13px;
    line-height: 1.3;
  }
  
  .widget-tabs-wrapper {
    width: 100%;
    overflow: hidden;
  }
  
  .widget-tabs {
    margin-bottom: 0px;
    display: flex;
    gap: 0;
    width: 100%;
    flex-wrap: nowrap;
    min-width: 0;
    padding: 4px;
  }
  
  .tab {
    flex: 1;
    padding: 8px 4px;
    flex-basis: 50%;
    padding: 12px 8px;
    font-size: 14px;
    white-space: nowrap;
    line-height: 1.3;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
    width: 50%;
    box-sizing: border-box;
  }
  
  .tab.active {
    border-radius: 4px 4px 0 0;
  }
  
  .tab:not(.active) {
    background: transparent;
    color: var(--secondary-blue);
    border: none;
  }
  
  .widget-title {
    font-size: 28px;
    margin-bottom: 4px;
    line-height: 1.2;
  }
  
  .widget-description {
    font-size: 13px;
    margin-bottom: 24px;
  }
  
  .search-container {
    flex-direction: column;
    gap: 12px;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    font-size: 14px;
  }
  
  @media (max-width: 480px) {
    .search-container {
      font-size: 13px;
      gap: 10px;
    }
  }
  
  @media (max-width: 360px) {
    .search-container {
      font-size: 12px;
      gap: 8px;
    }
  }
  
  .search-box {
    display: none;
  }
  
  .search-btn:not(.search-btn-mobile) {
    display: none;
  }
  
  .search-filter-mobile {
    display: block;
    width: 100%;
    border: 2px solid #102A8A;
    border-radius: 8px;
    padding: 12px 16px;
    padding-right: 32px;
    font-size: 1em;
    line-height: 1.5;
    box-sizing: border-box;
    min-height: 44px;
    color: #102A8A;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23102A8A' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 12px center;
    background-color: #F7F9FF;
    background-size: 12px;
  }
  
  .search-filter-mobile option:first-child {
    color: #102A8A;
  }
  
  .search-filter-mobile option:not(:first-child) {
    color: #24334E;
  }
  
  .search-input-mobile {
    display: block;
    flex: 1;
    padding: 10px 12px;
    border: 2px solid #102A8A;
    border-radius: 8px;
    font-size: 1em;
    background: var(--white);
    color: var(--text-dark);
    box-sizing: border-box;
    min-height: 40px;
    height: 40px;
    line-height: 1.5;
    width: 0;
  }
  
  .search-input-mobile:focus {
    outline: none;
    border-color: #102A8A;
  }
  
  .search-input-mobile::placeholder {
    color: var(--text-light);
    font-size: 1em;
  }
  
  .search-input-group {
    display: flex;
    width: 100%;
    gap: 8px;
    align-items: stretch;
    box-sizing: border-box;
  }
  
  .search-btn-mobile {
    display: flex;
    width: 40px;
    min-width: 40px;
    min-height: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border-radius: 8px;
    box-sizing: border-box;
  }
  
  .search-btn-mobile svg {
    width: 18px;
    height: 18px;
  }
  
  @media (max-width: 480px) {
    .search-filter-mobile,
    .search-input-mobile {
      min-height: 42px;
      padding: 10px 14px;
      font-size: 0.93em;
    }
    
    .search-filter-mobile {
      padding-right: 28px;
      background-size: 11px;
      background-position: right 10px center;
    }
    
    .search-btn-mobile {
      width: 42px;
      min-width: 42px;
      min-height: 42px;
    }
    
    .search-btn-mobile svg {
      width: 16px;
      height: 16px;
    }
  }
  
  @media (max-width: 360px) {
    .search-filter-mobile,
    .search-input-mobile {
      min-height: 40px;
      padding: 8px 12px;
      font-size: 0.86em;
    }
    
    .search-filter-mobile {
      padding-right: 26px;
      background-size: 10px;
      background-position: right 8px center;
    }
    
    .search-btn-mobile {
      width: 40px;
      min-width: 40px;
      min-height: 40px;
    }
    
    .search-btn-mobile svg {
      width: 15px;
      height: 15px;
    }
    
    .search-input-group {
      gap: 6px;
    }
  }
}
</style>

