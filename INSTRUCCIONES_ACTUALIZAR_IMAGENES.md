# 📸 Instrucciones para Actualizar URLs de Imágenes desde Excel

## Opción 1: Usar CSV (Recomendado - Más fácil)

### Paso 1: Exportar Excel a CSV
1. Abre tu archivo Excel con las URLs de imágenes
2. Asegúrate de que tenga estas columnas:
   - **Columna A**: Nombre de la carrera (ej: "DISEÑO GRÁFICO")
   - **Columna B**: URL de la imagen (ej: "https://ik.imagekit.io/...")
3. Guarda como CSV:
   - Archivo → Guardar como
   - Tipo: CSV (delimitado por comas) (*.csv)
   - Nombre: `careers-images.csv`
4. Guarda el archivo en la raíz del proyecto: `DisenoBiblioteca/careers-images.csv`

### Paso 2: Instalar dependencias (si no lo has hecho)
```bash
cd DisenoBiblioteca
npm install
```

### Paso 3: Ejecutar el script
```bash
npm run update:images:csv
```

El script buscará coincidencias por nombre de carrera y actualizará las URLs automáticamente.

---

## Opción 2: Usar Excel directamente

### Paso 1: Preparar el Excel
1. Tu archivo Excel debe tener:
   - **Columna A**: Nombre de la carrera
   - **Columna B**: URL de la imagen
2. Guarda el archivo como `careers-images.xlsx` en la raíz del proyecto: `DisenoBiblioteca/careers-images.xlsx`

### Paso 2: Instalar dependencia
```bash
cd DisenoBiblioteca
npm install xlsx --save-dev
```

### Paso 3: Ejecutar el script
```bash
npm run update:images:excel
```

---

## Estructura del CSV/Excel

| Nombre de la Carrera | URL de la Imagen |
|---------------------|------------------|
| DISEÑO GRÁFICO | https://ik.imagekit.io/.../diseno-grafico.jpg |
| COMUNICACIÓN Y RELACIONES PÚBLICAS | https://ik.imagekit.io/.../comunicacion.jpg |

**Nota**: El script busca coincidencias por nombre. Si los nombres no coinciden exactamente, intentará encontrar coincidencias parciales.

---

## Ejemplo de uso

1. Tienes un Excel con las URLs
2. Exportas a CSV con nombre `careers-images.csv`
3. Lo guardas en `DisenoBiblioteca/`
4. Ejecutas: `npm run update:images:csv`
5. ¡Listo! Las URLs se actualizan automáticamente en `careersData.js`

---

## Solución de problemas

### Error: "No se puede leer el archivo CSV"
- Verifica que el archivo se llame exactamente `careers-images.csv` y esté en la raíz del proyecto
- Verifica que tenga encabezados en la primera fila

### Error: "No se actualizaron URLs"
- Verifica que los nombres de las carreras coincidan exactamente (mayúsculas/minúsculas importan)
- El script también busca coincidencias parciales automáticamente

### Los nombres no coinciden
- Puedes editar el script `scripts/update-image-urls-csv.js` y ajustar los nombres de columnas en las líneas 13-14
