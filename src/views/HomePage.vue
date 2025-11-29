<template>
  <div class="home-page">
    <HeaderSection />
    <HeroSection />
    <BibliografiaSection />
    <BibliotecasSection />
    <NovedadesSection />
    <SitiosRecomendadosSection />
    <PreguntasFrecuentesSection />
    <FooterSection />
  </div>
</template>

<script>
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
    HeaderSection,
    HeroSection,
    BibliografiaSection,
    BibliotecasSection,
    NovedadesSection,
    SitiosRecomendadosSection,
    PreguntasFrecuentesSection,
    FooterSection
  },
  mounted() {
    // Scroll al inicio de la página al cargar
    this.$nextTick(() => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    })
  }
}
</script>

<style scoped>
.home-page {
  width: 100%;
}
</style>



