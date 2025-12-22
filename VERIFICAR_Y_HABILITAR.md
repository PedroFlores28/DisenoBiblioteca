# Verificar y Habilitar Configuración Nginx

## El archivo ya existe, ahora necesitas:

### 1. Ver qué archivos están habilitados

```bash
ls -la /etc/nginx/sites-enabled/
```

### 2. Ver el contenido del archivo biblioteca

```bash
sudo cat /etc/nginx/sites-available/biblioteca
```

### 3. Si el archivo está correcto, habilitarlo

```bash
sudo ln -s /etc/nginx/sites-available/biblioteca /etc/nginx/sites-enabled/biblioteca
```

### 4. Si hay otro archivo habilitado con el mismo dominio, deshabilitarlo

```bash
# Ver todos los archivos habilitados
ls -la /etc/nginx/sites-enabled/

# Si hay conflicto, deshabilitar el otro (NO eliminar, solo el enlace)
# Ejemplo:
# sudo rm /etc/nginx/sites-enabled/default
# o
# sudo rm /etc/nginx/sites-enabled/strapi
```

### 5. Verificar sintaxis

```bash
sudo nginx -t
```

### 6. Recargar

```bash
sudo systemctl reload nginx
```

