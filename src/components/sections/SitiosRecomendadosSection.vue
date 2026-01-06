<template>
  <section id="sitios-recomendados" class="sitios-section">
    <div class="container">
      <h2 class="section-title">Recursos de infomación para tus estudios</h2>
      <p class="section-subtitle">
        Accede a libros, revistas, normas y otras fuentes externas disponibles de uso público.
      </p>
      <div class="sites-grid" ref="sitesGrid">
        <template v-if="windowWidth <= 768">
          <div 
            v-for="(pair, index) in sitePairs" 
            :key="`pair-${index}`"
            class="site-pair"
          >
            <div 
              v-for="site in pair" 
              :key="site.id"
              class="site-card"
            >
              <div class="site-header-line"></div>
              <div class="site-icon-wrapper">
                <SiteIcon :icon-type="site.iconType" />
              </div>
              <div class="site-content">
                <h3 class="site-title">{{ site.name }}</h3>
                <p class="site-description">{{ site.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' }}</p>
                <a :href="site.url" target="_blank" class="btn btn-site">
                  Ir al sitio
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18.4509 9.13788L12.7891 3.22831C12.5038 2.93546 12.0382 2.92045 11.7454 3.20579C11.4525 3.49113 11.4375 3.95669 11.7228 4.24954L16.9866 9.7461H1.7509C1.3379 9.7461 1 10.084 1 10.497C1 10.91 1.3379 11.2479 1.7509 11.2479H16.9866L11.7228 16.7445C11.4375 17.0373 11.4525 17.5104 11.7454 17.7882C11.888 17.9234 12.0757 17.991 12.256 17.991C12.4512 17.991 12.6464 17.9159 12.7891 17.7657L18.4734 11.8336C19.1792 11.0301 19.1792 9.95636 18.4509 9.13788Z" fill="#024588"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div 
            v-for="site in sites" 
            :key="site.id"
            class="site-card"
          >
            <div class="site-header-line"></div>
            <div class="site-icon-wrapper">
              <SiteIcon :icon-type="site.iconType" />
            </div>
            <div class="site-content">
              <h3 class="site-title">{{ site.name }}</h3>
              <p class="site-description">{{ site.description || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.' }}</p>
              <a :href="site.url" target="_blank" class="btn btn-site">
                Ir al sitio
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18.4509 9.13788L12.7891 3.22831C12.5038 2.93546 12.0382 2.92045 11.7454 3.20579C11.4525 3.49113 11.4375 3.95669 11.7228 4.24954L16.9866 9.7461H1.7509C1.3379 9.7461 1 10.084 1 10.497C1 10.91 1.3379 11.2479 1.7509 11.2479H16.9866L11.7228 16.7445C11.4375 17.0373 11.4525 17.5104 11.7454 17.7882C11.888 17.9234 12.0757 17.991 12.256 17.991C12.4512 17.991 12.6464 17.9159 12.7891 17.7657L18.4734 11.8336C19.1792 11.0301 19.1792 9.95636 18.4509 9.13788Z" fill="#024588"/>
                </svg>
              </a>
            </div>
          </div>
        </template>
      </div>
      <div class="mobile-navigation" v-if="windowWidth <= 768">
        <button 
          class="nav-btn nav-btn-prev"
          :disabled="isAtStart"
          @click="scrollLeft"
        >
          <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.11127 18.0301C7.87646 18.0301 7.64164 17.9398 7.47005 17.7592L0.660453 10.6516C-0.215582 9.65812 -0.215582 8.36664 0.63336 7.40932L7.47005 0.2746C7.81324 -0.0776207 8.37318 -0.0956822 8.7254 0.247507C9.07762 0.590696 9.09568 1.15064 8.75249 1.50286L1.9429 8.61048C1.70808 8.88142 1.70808 9.15236 1.96999 9.45039L8.75249 16.5309C9.09568 16.8832 9.07762 17.4521 8.7254 17.7863C8.55381 17.9488 8.32802 18.0301 8.11127 18.0301Z" fill="#8B93A1"/>
          </svg>
        </button>
        <button 
          class="nav-btn nav-btn-next"
          :disabled="isAtEnd"
          @click="scrollRight"
        >
          <svg width="9" height="19" viewBox="0 0 9 19" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.888728 18.0301C0.662946 18.0301 0.446195 17.9488 0.2746 17.7863C-0.07762 17.4431 -0.0956828 16.8832 0.247506 16.5309L7.0571 9.4233C7.29192 9.15236 7.29192 8.88142 7.03001 8.58339L0.247506 1.50286C-0.0956828 1.15064 -0.07762 0.581664 0.2746 0.247506C0.626821 -0.0956827 1.19579 -0.0776201 1.52995 0.2746L8.33955 7.38223C9.21558 8.36664 9.21558 9.66715 8.36664 10.6245L1.52995 17.7592C1.35836 17.9398 1.12354 18.0301 0.888728 18.0301Z" fill="white"/>
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
      windowWidth: window.innerWidth,
      isAtStart: true,
      isAtEnd: false
    }
  },
  computed: {
    sitePairs() {
      const pairs = []
      for (let i = 0; i < this.sites.length; i += 2) {
        pairs.push(this.sites.slice(i, i + 2))
      }
      return pairs
    }
  },
  async mounted() {
    await this.loadSites()
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
    this.$nextTick(() => {
      if (this.$refs.sitesGrid && this.windowWidth <= 768) {
        this.$refs.sitesGrid.addEventListener('scroll', this.handleScroll)
        this.updateScrollButtons()
      }
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
    if (this.$refs.sitesGrid) {
      this.$refs.sitesGrid.removeEventListener('scroll', this.handleScroll)
    }
  },
  methods: {
    async loadSites() {
      try {
        const response = await strapiService.getCollection('sitios-recomendados', {
          populate: '*',
          sort: 'orden:asc'
        })
        
        // Procesar respuesta de Strapi
        let sitesData = []
        if (response.data?.data && Array.isArray(response.data.data)) {
          sitesData = response.data.data.map(item => ({
            id: item.id,
            name: item.attributes?.name || item.name,
            url: item.attributes?.url || item.url,
            description: item.attributes?.description || item.description,
            iconType: item.attributes?.iconType || item.iconType
          }))
        } else if (response.data && Array.isArray(response.data)) {
          sitesData = response.data.map(item => ({
            id: item.id,
            name: item.attributes?.name || item.name,
            url: item.attributes?.url || item.url,
            description: item.attributes?.description || item.description,
            iconType: item.attributes?.iconType || item.iconType
          }))
        } else if (Array.isArray(response)) {
          sitesData = response
        }
        
        this.sites = sitesData
      } catch (error) {
        console.error('Error loading sites:', error)
        // Datos de ejemplo - 8 sitios principales
        this.sites = [
          {
            id: 1,
            name: 'Revistas Académicas (Proquest)',
            url: 'https://itmsp.museknowledge.com/MuseSessionID=0910qnxid/MuseProtocol=https/MuseHost=www.proquest.com/MusePath/index?parentSessionId=Qru4aIKBNrLQJ%2FvHVgOHse7XO26dC1QXWOcVe1ik2RQ%3D&accountid=163619',
            description: 'Accede a una amplia colección de revistas académicas y recursos de investigación.',
            iconType: 'book'
          },
          {
            id: 2,
            name: 'Portal de Revistas Académicas Chilenas',
            url: 'https://revistaschilenas.uchile.cl/',
            description: 'Biblioteca digital de revistas académicas publicadas en Chile.',
            iconType: 'document'
          },
          {
            id: 3,
            name: 'Biblioteca del Congreso',
            url: 'https://www.leychile.cl/Consulta/homebasico',
            description: 'Consulta la legislación chilena y documentos oficiales del Congreso.',
            iconType: 'people'
          },
          {
            id: 4,
            name: 'Normas Chilenas',
            url: 'https://www.inncoleccion.cl/colecao.aspx',
            description: 'Accede a las normas técnicas chilenas y estándares nacionales.',
            iconType: 'normas'
          },
          {
            id: 5,
            name: 'Diario Oficial de la República',
            url: 'http://www.diariooficial.interior.gob.cl/',
            description: 'Consulta las publicaciones oficiales y decretos del gobierno.',
            iconType: 'diario-oficial'
          },
          {
            id: 6,
            name: 'Biblioteca Thomson-Reuters',
            url: 'https://09115nxig-y-https-next--proview-thomsonreuters-com.itmsp.museknowledge.com/library',
            description: 'Recursos especializados en derecho y ciencias jurídicas.',
            iconType: 'thomson-reuters'
          },
          {
            id: 7,
            name: 'Biblioteca ENI',
            url: 'https://0910cnxik-y-https-www-eni--training-com.itmsp.museknowledge.com/instant-Connection/Default.aspx',
            description: 'Materiales de formación y capacitación profesional.',
            iconType: 'eni'
          },
          {
            id: 8,
            name: 'Enciclopedia OIT',
            url: 'http://www.insht.es/portal/site/Insht/menuitem.1f1a3bc79ab34c578c2e8884060961ca/?vgnextoid=a981ceffc39a5110VgnVCM100000dc0ca8c0RCRD&vgnextchannel=9f164a7f8a651110VgnVCM100000dc0ca8c0RCRD',
            description: 'Recursos sobre seguridad y salud en el trabajo de la OIT.',
            iconType: 'oit'
          }
        ]
      }
    },
    handleResize() {
      this.windowWidth = window.innerWidth
      this.$nextTick(() => {
        if (this.$refs.sitesGrid) {
          if (this.windowWidth <= 768) {
            this.$refs.sitesGrid.addEventListener('scroll', this.handleScroll)
          } else {
            this.$refs.sitesGrid.removeEventListener('scroll', this.handleScroll)
          }
          this.updateScrollButtons()
        }
      })
    },
    handleScroll() {
      this.updateScrollButtons()
    },
    updateScrollButtons() {
      if (this.$refs.sitesGrid && this.windowWidth <= 768) {
        const container = this.$refs.sitesGrid
        const scrollLeft = container.scrollLeft
        const scrollWidth = container.scrollWidth
        const clientWidth = container.clientWidth
        
        this.isAtStart = scrollLeft <= 0
        this.isAtEnd = scrollLeft + clientWidth >= scrollWidth - 1
      }
    },
    scrollLeft() {
      if (this.$refs.sitesGrid) {
        const pair = this.$refs.sitesGrid.querySelector('.site-pair')
        if (pair) {
          const pairWidth = pair.offsetWidth
          const gap = 16
          const scrollAmount = pairWidth + gap
          this.$refs.sitesGrid.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
          })
        }
      }
    },
    scrollRight() {
      if (this.$refs.sitesGrid) {
        const pair = this.$refs.sitesGrid.querySelector('.site-pair')
        if (pair) {
          const pairWidth = pair.offsetWidth
          const gap = 16
          const scrollAmount = pairWidth + gap
          this.$refs.sitesGrid.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.sitios-section {
  padding: 60px 0;
  background: #F8F8F8;
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
  font-family: Verdana, sans-serif;
}

.sites-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 40px;
  align-items: stretch;
}

.site-card {
  background: var(--white);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
}

.site-header-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: #8B4513;
  border-radius: 8px 8px 0 0;
}

.site-icon-wrapper {
  margin-top: 4px;
  margin-bottom: 12px;
  align-self: flex-start;
}

.site-card :deep(.site-icon) {
  width: 48px;
  height: 48px;
}

.site-card :deep(.site-icon) svg {
  width: 48px;
  height: 48px;
}

.site-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex: 1;
  text-align: left;
  min-height: 0;
}

.site-title {
  font-size: 18px;
  color: #024588;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 500;
  margin: 0;
  line-height: 1.4;
  text-align: left;
  flex-shrink: 0;
}

.site-description {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
  margin: 0;
  flex: 1;
  min-height: 0;
}

.btn-site {
  background-color: #D0DCE8;
  color: #024588;
  font-family: 'Ubuntu', sans-serif;
  font-weight: 500;
  padding: 10px 16px;
  font-size: 14px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  flex-shrink: 0;
  margin-top: auto;
}

.btn-site:hover {
  background-color: #B8C8D8;
  color: #024588;
}


@media (max-width: 768px) {
  .section-title {
    font-size: 30px;
    text-align: left;
    line-height: 1.2;
    color: #024588;
  }
  
  .section-subtitle {
    font-size: 16px;
    text-align: left;
  }
  
  .sites-grid {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    scroll-snap-type: x mandatory;
    gap: 16px;
    padding-bottom: 20px;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
  
  .sites-grid::-webkit-scrollbar {
    display: none;
  }
  
  .site-pair {
    display: flex;
    flex-direction: column;
    gap: 16px;
    min-width: calc(100% - 32px);
    width: calc(100% - 32px);
    flex-shrink: 0;
    scroll-snap-align: start;
  }
  
  .site-card {
    height: auto;
  }
  
  .mobile-navigation {
    display: flex;
    justify-content: right;
    align-items: center;
    gap: 16px;
    margin-top: 24px;
  }
  
  .nav-btn {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    flex-shrink: 0;
  }
  
  .nav-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  .nav-btn-prev {
    background: #E5E5E5;
  }
  
  .nav-btn-prev svg path {
    fill: #8B93A1;
  }
  
  .nav-btn-next {
    background: #024588;
  }
  
  .nav-btn-next svg path {
    fill: white;
  }
}

@media (min-width: 769px) {
  .mobile-navigation {
    display: none;
  }
}
</style>

