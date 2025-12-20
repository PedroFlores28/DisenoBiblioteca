const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    open: true,
    // Proxy para desarrollo: redirige las peticiones a /api a Strapi
    proxy: {
      '/api': {
        target: process.env.VUE_APP_STRAPI_URL || 'http://68.211.112.39:1337',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug'
      }
    }
  }
})



