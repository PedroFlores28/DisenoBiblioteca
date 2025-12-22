# Resolver Conflicto de Server Name

## El archivo biblioteca ya está habilitado ✅
## Pero hay OTRO archivo también usando `portal-biblioteca.aiep.cl` ⚠️

### Pasos para encontrar y resolver el conflicto:

```bash
# 1. Ver TODOS los archivos habilitados
ls -la /etc/nginx/sites-enabled/

# 2. Buscar en TODOS los archivos habilitados cuál tiene el mismo dominio
for file in /etc/nginx/sites-enabled/*; do
    echo "=== $file ==="
    sudo grep -n "portal-biblioteca.aiep.cl" "$file" 2>/dev/null || echo "No encontrado"
done

# 3. Ver el contenido de cada archivo habilitado para identificar el conflicto
# (Reemplaza "default" o "strapi" con el nombre real del archivo)
sudo cat /etc/nginx/sites-enabled/default
sudo cat /etc/nginx/sites-enabled/strapi
```

### Solución:

Una vez que identifiques el archivo que causa el conflicto:

**Opción A: Deshabilitar el archivo conflictivo** (si no lo necesitas)
```bash
sudo rm /etc/nginx/sites-enabled/nombre-del-archivo-conflicto
```

**Opción B: Cambiar el dominio en el archivo conflictivo** (si lo necesitas)
```bash
sudo nano /etc/nginx/sites-available/nombre-del-archivo-conflicto
# Cambiar server_name a otro dominio
```

**Opción C: Combinar ambas configuraciones** en un solo archivo usando diferentes `location` blocks

### Después de resolver:

```bash
# Verificar sintaxis
sudo nginx -t

# Recargar
sudo systemctl reload nginx

# Verificar que no hay más warnings
sudo nginx -t
```

