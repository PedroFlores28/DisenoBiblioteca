<template>
  <section class="sitios-section">
    <div class="container">
      <h2 class="section-title">Sitios recomendados para tus estudios</h2>
      <p class="section-subtitle">
        Accede a libros, revistas, normas y otras fuentes externas disponibles de uso público.
      </p>
      <div class="sites-grid">
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
      sites: []
    }
  },
  async mounted() {
    await this.loadSites()
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
  transition: all 0.3s ease;
  flex-shrink: 0;
  margin-top: auto;
}

.btn-site svg {
  transition: transform 0.3s ease;
}

.btn-site:hover {
  background-color: #B8C8D8;
  color: #024588;
}

.btn-site:hover svg {
  transform: translateX(4px);
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
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>

