const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    open: true,
    // Permitir acceso desde otros hosts (para desarrollo con Nginx)
    allowedHosts: [
      'cmsbiblioteca.aiep.cl',
      '.aiep.cl',
      'localhost'
    ],
    // Proxy para desarrollo: redirige las peticiones a /api a Strapi
    proxy: {
      '/api': {
        target: 'https://cmsbiblioteca.aiep.cl',
        changeOrigin: true,
        secure: true,
        logLevel: 'debug'
      }
    }
  }
})



