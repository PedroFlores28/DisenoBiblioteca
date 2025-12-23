# Iniciar PM2 - Biblioteca AIEP

## Opción 1: Iniciar con el archivo de configuración (Recomendado)

```bash
# Desde el directorio del proyecto
cd /home/bibliotecas/DisenoBiblioteca

# Iniciar PM2 con el archivo ecosystem.config.js
pm2 start ecosystem.config.js

# O usando el script npm
npm run pm2:start
```

## Opción 2: Iniciar directamente sin archivo de configuración

```bash
cd /home/bibliotecas/DisenoBiblioteca

# Iniciar directamente con npm run serve
pm2 start npm --name "biblioteca-aiep" -- run serve

# O especificando el puerto y otras opciones
pm2 start npm --name "biblioteca-aiep" -- run serve -- --port 3000
```

## Opción 3: Si ya existe una instancia, eliminar y reiniciar

```bash
# Ver instancias corriendo
pm2 status

# Detener y eliminar la instancia existente
pm2 stop biblioteca-aiep
pm2 delete biblioteca-aiep

# Iniciar una nueva
pm2 start ecosystem.config.js
```

## Opción 4: Iniciar sin variables de entorno (configuración mínima)

Si quieres iniciar sin el archivo ecosystem.config.js:

```bash
cd /home/bibliotecas/DisenoBiblioteca
pm2 start npm --name "biblioteca-aiep" -- run serve
```

## Comandos útiles después de iniciar

```bash
# Ver estado
pm2 status

# Ver logs en tiempo real
pm2 logs biblioteca-aiep

# Ver logs de solo errores
pm2 logs biblioteca-aiep --err

# Reiniciar
pm2 restart biblioteca-aiep

# Detener
pm2 stop biblioteca-aiep

# Guardar la configuración para que se inicie al reiniciar el servidor
pm2 save
pm2 startup
```

## Verificar que está corriendo

```bash
# Verificar que está activo
pm2 status

# Verificar que el puerto 3000 está escuchando
netstat -tuln | grep 3000
# O
ss -tuln | grep 3000

# Probar localmente
curl http://localhost:3000
```

