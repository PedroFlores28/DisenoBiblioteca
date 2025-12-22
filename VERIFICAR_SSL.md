# Verificar SSL y Funcionamiento del Sitio

## El error de curl es normal (problema de verificación del certificado en el cliente)

### Opción 1: Probar con curl ignorando verificación SSL (solo para pruebas)

```bash
curl -k -I https://portal-biblioteca.aiep.cl
```

Esto debería mostrar el código HTTP (200, 301, etc.)

### Opción 2: Verificar desde el navegador

Abre en tu navegador:
```
https://portal-biblioteca.aiep.cl
```

Si funciona, verás la aplicación Vue.js.

### Opción 3: Verificar logs de Nginx

```bash
# Ver logs de acceso
sudo tail -20 /var/log/nginx/biblioteca-access.log

# Ver logs de error
sudo tail -20 /var/log/nginx/biblioteca-error.log
```

### Opción 4: Verificar que Nginx está sirviendo el sitio

```bash
# Probar con wget (puede tener mejor manejo de certificados)
wget --no-check-certificate -O- https://portal-biblioteca.aiep.cl 2>&1 | head -20

# O verificar directamente el archivo
cat ~/DisenoBiblioteca/dist/index.html | head -20
```

### Opción 5: Verificar certificado SSL

```bash
# Ver detalles del certificado
openssl s_client -connect portal-biblioteca.aiep.cl:443 -servername portal-biblioteca.aiep.cl < /dev/null 2>/dev/null | openssl x509 -noout -dates
```

## Solución al error de curl (opcional)

Si quieres que curl funcione sin `-k`, necesitas actualizar los certificados CA:

```bash
# En Ubuntu/Debian
sudo apt-get update
sudo apt-get install ca-certificates

# Actualizar certificados
sudo update-ca-certificates
```

Pero esto NO es necesario para que el sitio funcione - solo afecta a curl desde el servidor.

## Lo más importante

**El sitio debería funcionar perfectamente desde un navegador web**, incluso si curl muestra este error. El error es solo un problema de verificación del certificado en el lado del cliente (curl), no un problema del servidor.

