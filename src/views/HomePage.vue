<template>
  <div class="home-page">
    <WelcomeModal />
    <HeaderSection />
    <HeroSection v-if="!showDetailedBibliografia" />
    <BibliografiaSection ref="bibliografiaSection" />
    <BibliotecasSection v-if="!showDetailedBibliografia" />
    <NovedadesSection v-if="!showDetailedBibliografia" />
    <SitiosRecomendadosSection v-if="!showDetailedBibliografia" />
    <PreguntasFrecuentesSection v-if="!showDetailedBibliografia" />
    <FooterSection v-if="!showDetailedBibliografia" />
  </div>
</template>

<script>
import WelcomeModal from '../components/WelcomeModal.vue'
import HeaderSection from '../components/sections/HeaderSection.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import BibliografiaSection from '../components/sections/BibliografiaSection.vue'
import BibliotecasSection from '../components/sections/BibliotecasSection.vue'
import NovedadesSection from '../components/sections/NovedadesSection.vue'
import SitiosRecomendadosSection from '../components/sections/SitiosRecomendadosSection.vue'
import PreguntasFrecuentesSection from '../components/sections/PreguntasFrecuentesSection.vue'
import FooterSection from '../components/sections/FooterSection.vue'

export default {
  name: 'HomePage',
  components: {
    WelcomeModal,
    HeaderSection,
    HeroSection,
    BibliografiaSection,
    BibliotecasSection,
    NovedadesSection,
    SitiosRecomendadosSection,
    PreguntasFrecuentesSection,
    FooterSection
  },
  data() {
    return {
      showDetailedBibliografia: false
    }
  },
  mounted() {
    // Scroll al inicio de la página al cargar
    this.$nextTick(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    })
    // Escuchar eventos de cambio de vista detallada
    window.addEventListener('bibliografia-detailed-view-changed', (e) => {
      this.showDetailedBibliografia = e.detail.show
    })
  },
  beforeUnmount() {
    window.removeEventListener('bibliografia-detailed-view-changed', () => {})
  }
}
</script>

<style scoped>
.home-page {
  width: 100%;
}
</style>