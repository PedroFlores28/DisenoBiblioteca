#!/bin/bash

# Script de deploy para actualizar la aplicación después de git pull
# Uso: ./deploy.sh

echo "🚀 Iniciando proceso de deploy..."

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: No se encontró package.json. Asegúrate de estar en el directorio del proyecto.${NC}"
    exit 1
fi

# 1. Obtener los últimos cambios de Git
echo -e "${YELLOW}📥 Obteniendo cambios de Git...${NC}"
git pull

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al hacer git pull${NC}"
    exit 1
fi

# 2. Instalar dependencias si hay cambios en package.json
echo -e "${YELLOW}📦 Verificando dependencias...${NC}"
if git diff HEAD@{1} HEAD --name-only | grep -q "package.json\|package-lock.json"; then
    echo -e "${YELLOW}📦 Instalando nuevas dependencias...${NC}"
    npm install
fi

# 3. Reiniciar PM2 (la aplicación corre en el puerto 3000)
echo -e "${YELLOW}🔄 Reiniciando aplicación en PM2...${NC}"
pm2 restart biblioteca-aiep

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Aplicación reiniciada exitosamente en PM2${NC}"
    echo -e "${GREEN}📊 Estado de PM2:${NC}"
    pm2 status
else
    echo -e "${RED}❌ Error al reiniciar PM2${NC}"
    echo -e "${YELLOW}💡 Intenta manualmente: pm2 restart biblioteca-aiep${NC}"
    exit 1
fi

# 4. Recargar Nginx (proxy a PM2 en puerto 3000)
echo -e "${YELLOW}🔄 Recargando Nginx...${NC}"
sudo nginx -t && sudo systemctl reload nginx

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Nginx recargado exitosamente${NC}"
else
    echo -e "${YELLOW}⚠️  Advertencia: No se pudo recargar Nginx. Verifica manualmente: sudo systemctl reload nginx${NC}"
fi

echo -e "${GREEN}✨ Deploy completado exitosamente!${NC}"

