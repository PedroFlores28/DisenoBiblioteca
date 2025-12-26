# Sitios Recomendados para Strapi

Este documento contiene los sitios recomendados que están hardcodeados en el código para que los puedas copiar a Strapi.

## 📋 Estructura en Strapi

El tipo de contenido debe tener los siguientes campos:
- **name** (Text - Short text) - Título del sitio
- **url** (Text o URL) - Link de redirección
- **description** (Text - Long text) - Descripción del sitio
- **iconType** (Enumeration o Text) - Tipo de ícono
- **orden** (Number) - Orden de aparición

## 📝 Sitios Recomendados

### 1. Revistas Académicas (Proquest)

**Nombre (name):**
```
Revistas Académicas (Proquest)
```

**URL (url):**
```
https://itmsp.museknowledge.com/MuseSessionID=0910qnxid/MuseProtocol=https/MuseHost=www.proquest.com/MusePath/index?parentSessionId=Qru4aIKBNrLQJ%2FvHVgOHse7XO26dC1QXWOcVe1ik2RQ%3D&accountid=163619
```

**Descripción (description):**
```
Accede a una amplia colección de revistas académicas y recursos de investigación.
```

**Tipo de Ícono (iconType):**
```
book
```

**Orden:**
```
1
```

---

### 2. Portal de Revistas Académicas Chilenas

**Nombre (name):**
```
Portal de Revistas Académicas Chilenas
```

**URL (url):**
```
https://revistaschilenas.uchile.cl/
```

**Descripción (description):**
```
Biblioteca digital de revistas académicas publicadas en Chile.
```

**Tipo de Ícono (iconType):**
```
document
```

**Orden:**
```
2
```

---

### 3. Biblioteca del Congreso

**Nombre (name):**
```
Biblioteca del Congreso
```

**URL (url):**
```
https://www.leychile.cl/Consulta/homebasico
```

**Descripción (description):**
```
Consulta la legislación chilena y documentos oficiales del Congreso.
```

**Tipo de Ícono (iconType):**
```
people
```

**Orden:**
```
3
```

---

### 4. Normas Chilenas

**Nombre (name):**
```
Normas Chilenas
```

**URL (url):**
```
https://www.inncoleccion.cl/colecao.aspx
```

**Descripción (description):**
```
Accede a las normas técnicas chilenas y estándares nacionales.
```

**Tipo de Ícono (iconType):**
```
normas
```

**Orden:**
```
4
```

---

### 5. Diario Oficial de la República

**Nombre (name):**
```
Diario Oficial de la República
```

**URL (url):**
```
http://www.diariooficial.interior.gob.cl/
```

**Descripción (description):**
```
Consulta las publicaciones oficiales y decretos del gobierno.
```

**Tipo de Ícono (iconType):**
```
diario-oficial
```

**Orden:**
```
5
```

---

### 6. Biblioteca Thomson-Reuters

**Nombre (name):**
```
Biblioteca Thomson-Reuters
```

**URL (url):**
```
https://09115nxig-y-https-next--proview-thomsonreuters-com.itmsp.museknowledge.com/library
```

**Descripción (description):**
```
Recursos especializados en derecho y ciencias jurídicas.
```

**Tipo de Ícono (iconType):**
```
thomson-reuters
```

**Orden:**
```
6
```

---

### 7. Biblioteca ENI

**Nombre (name):**
```
Biblioteca ENI
```

**URL (url):**
```
https://0910cnxik-y-https-www-eni--training-com.itmsp.museknowledge.com/instant-Connection/Default.aspx
```

**Descripción (description):**
```
Materiales de formación y capacitación profesional.
```

**Tipo de Ícono (iconType):**
```
eni
```

**Orden:**
```
7
```

---

### 8. Enciclopedia OIT

**Nombre (name):**
```
Enciclopedia OIT
```

**URL (url):**
```
http://www.insht.es/portal/site/Insht/menuitem.1f1a3bc79ab34c578c2e8884060961ca/?vgnextoid=a981ceffc39a5110VgnVCM100000dc0ca8c0RCRD&vgnextchannel=9f164a7f8a651110VgnVCM100000dc0ca8c0RCRD
```

**Descripción (description):**
```
Recursos sobre seguridad y salud en el trabajo de la OIT.
```

**Tipo de Ícono (iconType):**
```
oit
```

**Orden:**
```
8
```

---

## 📥 Formato JSON para Referencia

```json
[
  {
    "name": "Revistas Académicas (Proquest)",
    "url": "https://itmsp.museknowledge.com/MuseSessionID=0910qnxid/MuseProtocol=https/MuseHost=www.proquest.com/MusePath/index?parentSessionId=Qru4aIKBNrLQJ%2FvHVgOHse7XO26dC1QXWOcVe1ik2RQ%3D&accountid=163619",
    "description": "Accede a una amplia colección de revistas académicas y recursos de investigación.",
    "iconType": "book",
    "orden": 1
  },
  {
    "name": "Portal de Revistas Académicas Chilenas",
    "url": "https://revistaschilenas.uchile.cl/",
    "description": "Biblioteca digital de revistas académicas publicadas en Chile.",
    "iconType": "document",
    "orden": 2
  },
  {
    "name": "Biblioteca del Congreso",
    "url": "https://www.leychile.cl/Consulta/homebasico",
    "description": "Consulta la legislación chilena y documentos oficiales del Congreso.",
    "iconType": "people",
    "orden": 3
  },
  {
    "name": "Normas Chilenas",
    "url": "https://www.inncoleccion.cl/colecao.aspx",
    "description": "Accede a las normas técnicas chilenas y estándares nacionales.",
    "iconType": "normas",
    "orden": 4
  },
  {
    "name": "Diario Oficial de la República",
    "url": "http://www.diariooficial.interior.gob.cl/",
    "description": "Consulta las publicaciones oficiales y decretos del gobierno.",
    "iconType": "diario-oficial",
    "orden": 5
  },
  {
    "name": "Biblioteca Thomson-Reuters",
    "url": "https://09115nxig-y-https-next--proview-thomsonreuters-com.itmsp.museknowledge.com/library",
    "description": "Recursos especializados en derecho y ciencias jurídicas.",
    "iconType": "thomson-reuters",
    "orden": 6
  },
  {
    "name": "Biblioteca ENI",
    "url": "https://0910cnxik-y-https-www-eni--training-com.itmsp.museknowledge.com/instant-Connection/Default.aspx",
    "description": "Materiales de formación y capacitación profesional.",
    "iconType": "eni",
    "orden": 7
  },
  {
    "name": "Enciclopedia OIT",
    "url": "http://www.insht.es/portal/site/Insht/menuitem.1f1a3bc79ab34c578c2e8884060961ca/?vgnextoid=a981ceffc39a5110VgnVCM100000dc0ca8c0RCRD&vgnextchannel=9f164a7f8a651110VgnVCM100000dc0ca8c0RCRD",
    "description": "Recursos sobre seguridad y salud en el trabajo de la OIT.",
    "iconType": "oit",
    "orden": 8
  }
]
```

## 🚀 Instrucciones para Agregar en Strapi

1. Ve a **Content Manager** → **Sitios-recomendados**
2. Para cada sitio (8 en total):
   - Haz clic en **Create new entry**
   - Copia el **Nombre** en el campo `name`
   - Copia la **URL** en el campo `url`
   - Copia la **Descripción** en el campo `description`
   - Selecciona o escribe el **Tipo de Ícono** en el campo `iconType`
   - Agrega el número de **Orden** en el campo `orden`
   - Haz clic en **Save**
   - Haz clic en **Publish** para publicar la entrada
3. Repite para los 8 sitios

## 📌 Notas

- El campo **orden** es importante para controlar el orden de aparición
- El código ordena los sitios por el campo `orden` de forma ascendente
- Si no hay campo `orden`, los sitios se mostrarán en el orden en que fueron creados
- Asegúrate de que todas las entradas estén **Publicadas** (no solo guardadas)
- Los tipos de ícono disponibles son: `book`, `document`, `people`, `normas`, `diario-oficial`, `thomson-reuters`, `eni`, `oit`

