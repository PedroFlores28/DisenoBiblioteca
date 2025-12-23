# Crear Archivo de Variables de Entorno

## Comandos para crear el archivo .env

### Opción 1: Crear desde cero

```bash
# Crear el archivo .env
cat > .env << 'EOF'
# Variables de Entorno - Biblioteca AIEP

# URL de Strapi (CMS)
VUE_APP_STRAPI_URL=http://68.211.112.39:1337

# URL de MongoDB (si se usa backend)
VUE_APP_MONGODB_URI=mongodb://localhost:27017
VUE_APP_MONGODB_DB=biblioteca

# URL de la aplicación (producción)
VUE_APP_BASE_URL=https://portal-biblioteca.aiep.cl

# Entorno
NODE_ENV=production
EOF
```

### Opción 2: Crear con nano (editor)

```bash
nano .env
```

Luego pega este contenido:
```
# Variables de Entorno - Biblioteca AIEP

# URL de Strapi (CMS)
VUE_APP_STRAPI_URL=http://68.211.112.39:1337

# URL de MongoDB (si se usa backend)
VUE_APP_MONGODB_URI=mongodb://localhost:27017
VUE_APP_MONGODB_DB=biblioteca

# URL de la aplicación (producción)
VUE_APP_BASE_URL=https://portal-biblioteca.aiep.cl

# Entorno
NODE_ENV=production
```

### Opción 3: Copiar desde el ejemplo

```bash
# Si ya tienes env.example
cp env.example .env

# O crear directamente
echo "VUE_APP_STRAPI_URL=http://68.211.112.39:1337" > .env
echo "VUE_APP_MONGODB_URI=mongodb://localhost:27017" >> .env
echo "VUE_APP_MONGODB_DB=biblioteca" >> .env
echo "VUE_APP_BASE_URL=https://portal-biblioteca.aiep.cl" >> .env
echo "NODE_ENV=production" >> .env
```

## Verificar que se creó

```bash
# Ver el contenido
cat .env

# Verificar que existe
ls -la .env
```

## Nota importante

El archivo `.env` ya está en `.gitignore`, por lo que no se subirá al repositorio (es seguro).

