const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    open: true,
    // Permitir acceso desde otros hosts (para desarrollo con Nginx)
    allowedHosts: [
      'cmsbiblioteca.aiep.cl',
      'portal-biblioteca.aiep.cl',
      '.aiep.cl',
      'localhost'
    ],
    // Deshabilitar hot reload y WebSocket cuando está detrás de proxy HTTPS
    // Esto evita errores de WebSocket inseguro desde HTTPS
    hot: false,
    liveReload: false,
    webSocketServer: false, // Deshabilitar completamente el servidor WebSocket
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



