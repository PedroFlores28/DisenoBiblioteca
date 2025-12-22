# Verificar Contenido del Archivo biblioteca

## El conflicto puede ser por duplicación dentro del mismo archivo

### Ver el contenido completo del archivo:

```bash
sudo cat /etc/nginx/sites-available/biblioteca
```

### Posibles causas del warning:

1. **Dos bloques `server` con el mismo `server_name` escuchando en el mismo puerto** (esto causaría conflicto)
2. **Sintaxis incorrecta** que hace que Nginx interprete mal la configuración
3. **El archivo tiene el dominio duplicado en el mismo bloque** (error de copia/pega)

### Solución:

Si el archivo tiene dos bloques `server` para HTTP (puerto 80) y HTTPS (puerto 443), eso es **CORRECTO** y no debería causar conflicto.

El warning puede ser un **falso positivo** si:
- Un bloque escucha en puerto 80
- Otro bloque escucha en puerto 443
- Ambos tienen el mismo `server_name`

En ese caso, puedes **ignorar el warning** o verificar que la configuración esté correcta.

### Verificar sintaxis completa:

```bash
sudo nginx -t
```

Si dice "test is successful" a pesar del warning, la configuración está funcionando correctamente.

