# Diagnosticar Error 500

## El servidor responde pero hay un error interno

### 1. Ver los logs de error de Nginx

```bash
# Ver los últimos errores
sudo tail -50 /var/log/nginx/biblioteca-error.log

# O ver todos los logs de error
sudo tail -50 /var/log/nginx/error.log
```

### 2. Verificar que el archivo index.html existe y es legible

```bash
# Verificar que existe
ls -la ~/DisenoBiblioteca/dist/index.html

# Verificar permisos
sudo -u www-data cat ~/DisenoBiblioteca/dist/index.html | head -10

# Si falla, arreglar permisos
sudo chown -R www-data:www-data ~/DisenoBiblioteca/dist
sudo chmod -R 755 ~/DisenoBiblioteca/dist
```

### 3. Verificar que la ruta en Nginx es correcta

```bash
# Ver la ruta configurada
sudo grep "root" /etc/nginx/sites-available/biblioteca

# Verificar que esa ruta existe
ls -la /home/bibliotecas/DisenoBiblioteca/dist/
```

### 4. Probar acceso directo al archivo

```bash
# Verificar que Nginx puede leer el archivo
sudo -u www-data test -r ~/DisenoBiblioteca/dist/index.html && echo "OK" || echo "ERROR"

# Ver el contenido
sudo -u www-data cat ~/DisenoBiblioteca/dist/index.html | head -20
```

### 5. Verificar configuración de Nginx

```bash
# Ver la configuración completa
sudo nginx -T | grep -A 30 "portal-biblioteca"
```

## Posibles causas del Error 500:

1. **Permisos incorrectos** - Nginx no puede leer los archivos
2. **Ruta incorrecta** - El directorio no existe o está mal configurado
3. **Error en try_files** - Problema con la configuración de location
4. **Archivo index.html corrupto o vacío**

