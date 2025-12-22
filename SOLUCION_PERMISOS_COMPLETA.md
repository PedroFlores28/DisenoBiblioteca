# Solución: Permission Denied - Permisos en Directorios Padre

## Problema
Nginx (www-data) no puede acceder a `/home/bibliotecas/DisenoBiblioteca/dist/` porque los directorios padre no tienen permisos de ejecución (x) para otros usuarios.

## Solución

### Opción 1: Dar permisos de ejecución a los directorios padre (Recomendado)

```bash
# Dar permisos de ejecución (x) a los directorios padre
# Esto permite que www-data navegue hasta dist/
sudo chmod o+x /home/bibliotecas
sudo chmod o+x /home/bibliotecas/DisenoBiblioteca

# Verificar permisos
ls -ld /home/bibliotecas
ls -ld /home/bibliotecas/DisenoBiblioteca
ls -ld /home/bibliotecas/DisenoBiblioteca/dist
```

### Opción 2: Mover dist/ a una ubicación más accesible (Alternativa)

```bash
# Crear directorio en /var/www (ubicación estándar para sitios web)
sudo mkdir -p /var/www/biblioteca

# Copiar archivos
sudo cp -r ~/DisenoBiblioteca/dist/* /var/www/biblioteca/

# Dar permisos
sudo chown -R www-data:www-data /var/www/biblioteca
sudo chmod -R 755 /var/www/biblioteca

# Actualizar configuración de Nginx
sudo nano /etc/nginx/sites-available/biblioteca
# Cambiar: root /var/www/biblioteca;
```

### Opción 3: Usar ACLs (Access Control Lists) - Más seguro

```bash
# Instalar ACL si no está instalado
sudo apt-get install acl

# Dar acceso específico a www-data
sudo setfacl -m u:www-data:x /home/bibliotecas
sudo setfacl -m u:www-data:x /home/bibliotecas/DisenoBiblioteca
sudo setfacl -R -m u:www-data:rX /home/bibliotecas/DisenoBiblioteca/dist
```

## Verificar que funciona

```bash
# Probar acceso como www-data
sudo -u www-data test -r /home/bibliotecas/DisenoBiblioteca/dist/index.html && echo "OK" || echo "ERROR"

# Ver logs después de aplicar
sudo tail -f /var/log/nginx/biblioteca-error.log
```

## Recomendación

**Usar Opción 1** es la más rápida. Solo necesitas:
```bash
sudo chmod o+x /home/bibliotecas
sudo chmod o+x /home/bibliotecas/DisenoBiblioteca
```

Esto permite que cualquier usuario (incluido www-data) pueda "entrar" (x) a esos directorios, pero no ver el contenido (r) ni modificarlo (w) a menos que tenga permisos específicos.

