<template>
  <div id="app">
    <HomePage />
  </div>
</template>

<script>
import HomePage from './views/HomePage.vue'

export default {
  name: 'App',
  components: {
    HomePage
  },
  mounted() {
    // Prevenir que el navegador restaure la posición del scroll
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
    // Scroll al inicio al cargar/refrescar
    window.scrollTo(0, 0)
    // También asegurar scroll al inicio cuando la página se carga completamente
    window.addEventListener('load', () => {
      window.scrollTo(0, 0)
    })
  }
}
</script>

<style>
#app {
  min-height: 100vh;
}
</style>



