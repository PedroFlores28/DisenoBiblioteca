const path = require('path')

module.exports = {
  apps: [{
    name: 'biblioteca-aiep',
    script: 'npm',
    args: 'run serve',
    // Usa __dirname para obtener la ruta del proyecto automáticamente
    // Si necesitas una ruta específica, reemplaza __dirname con la ruta absoluta
    cwd: __dirname,
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true
  }]
}

