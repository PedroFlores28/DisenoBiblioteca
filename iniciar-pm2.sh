#!/bin/bash

# Script para iniciar la aplicación con PM2
# Uso: ./iniciar-pm2.sh

echo "🚀 Iniciando aplicación con PM2..."

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

# Verificar si PM2 está instalado
if ! command -v pm2 &> /dev/null; then
    echo -e "${RED}❌ PM2 no está instalado. Instálalo con: npm install -g pm2${NC}"
    exit 1
fi

# Verificar si ya existe una instancia corriendo
echo -e "${YELLOW}📊 Verificando instancias existentes de PM2...${NC}"
EXISTING=$(pm2 list | grep -c "biblioteca-aiep" || echo "0")

if [ "$EXISTING" != "0" ]; then
    echo -e "${YELLOW}⚠️  Ya existe una instancia de 'biblioteca-aiep' corriendo.${NC}"
    echo -e "${YELLOW}¿Qué deseas hacer?${NC}"
    echo "1) Detener y eliminar la instancia existente, luego iniciar una nueva"
    echo "2) Solo reiniciar la instancia existente"
    echo "3) Cancelar"
    read -p "Elige una opción (1-3): " option
    
    case $option in
        1)
            echo -e "${YELLOW}🛑 Deteniendo y eliminando instancia existente...${NC}"
            pm2 delete biblioteca-aiep 2>/dev/null || true
            echo -e "${GREEN}✅ Instancia eliminada${NC}"
            ;;
        2)
            echo -e "${YELLOW}🔄 Reiniciando instancia existente...${NC}"
            pm2 restart biblioteca-aiep
            echo -e "${GREEN}✅ Instancia reiniciada${NC}"
            pm2 status
            exit 0
            ;;
        3)
            echo -e "${YELLOW}❌ Operación cancelada${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}❌ Opción inválida${NC}"
            exit 1
            ;;
    esac
fi

# Verificar que el archivo de configuración existe
if [ ! -f "ecosystem.config.js" ]; then
    echo -e "${RED}❌ Error: No se encontró ecosystem.config.js${NC}"
    exit 1
fi

# Instalar dependencias si es necesario
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Instalando dependencias...${NC}"
    npm install
fi

# Iniciar la aplicación con PM2
echo -e "${YELLOW}🚀 Iniciando aplicación con PM2...${NC}"
pm2 start ecosystem.config.js

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Aplicación iniciada exitosamente${NC}"
    echo ""
    echo -e "${GREEN}📊 Estado de PM2:${NC}"
    pm2 status
    echo ""
    echo -e "${GREEN}💡 Comandos útiles:${NC}"
    echo "  - Ver logs: pm2 logs biblioteca-aiep"
    echo "  - Reiniciar: pm2 restart biblioteca-aiep"
    echo "  - Detener: pm2 stop biblioteca-aiep"
    echo "  - Eliminar: pm2 delete biblioteca-aiep"
    echo "  - Guardar configuración: pm2 save"
    echo ""
    echo -e "${YELLOW}⚠️  Importante: Ejecuta 'pm2 save' para guardar la configuración${NC}"
    echo -e "${YELLOW}   Esto hará que PM2 reinicie la aplicación automáticamente al reiniciar el servidor${NC}"
else
    echo -e "${RED}❌ Error al iniciar la aplicación${NC}"
    echo -e "${YELLOW}💡 Revisa los logs con: pm2 logs biblioteca-aiep${NC}"
    exit 1
fi

