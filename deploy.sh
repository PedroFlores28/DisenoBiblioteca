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

# 3. Recompilar la aplicación (si es necesario para producción)
# Descomenta las siguientes líneas si estás sirviendo archivos compilados
# echo -e "${YELLOW}🔨 Compilando aplicación...${NC}"
# npm run build

# 4. Reiniciar PM2
echo -e "${YELLOW}🔄 Reiniciando aplicación en PM2...${NC}"
pm2 restart biblioteca-aiep

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Aplicación reiniciada exitosamente${NC}"
    echo -e "${GREEN}📊 Estado de PM2:${NC}"
    pm2 status
else
    echo -e "${RED}❌ Error al reiniciar PM2${NC}"
    echo -e "${YELLOW}💡 Intenta manualmente: pm2 restart biblioteca-aiep${NC}"
    exit 1
fi

echo -e "${GREEN}✨ Deploy completado exitosamente!${NC}"

