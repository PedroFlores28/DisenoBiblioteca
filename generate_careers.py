import csv
import json

# Mapping of school names to keys
school_mapping = {
    'Admin. y Gestión Empresarial': 'administracion',
    'Artes e Industrias Creativas': 'artes',
    'Desarrollo Social y Educación': 'desarrollo',
    'Estética Integral': 'estetica',
    'Gastronomía, Hotel. y Turismo': 'gastronomia',
    'Ing. Energía y Tecnología': 'ingenieria',
    'Salud y Deporte': 'salud'
}

careers_data = """ID_OFICIAL	NOMBRE_BASE_OFICIAL	Escuela	URL Bibliografia	FOTO_URL
1	Ingeniería Ejecución Administración Empresas Mención  Marketing	Admin. y Gestión Empresarial	https://bibliotecas.aiep.cl/client/es_CL/default/search/results?qu=165&rt=false%7C%7C%7CAIEP_CARRERA%7C%7C%7CCarrera&st=TL	https://ik.imagekit.io/5wps2tups/FOTOS%20CARRERAS%20ADMISIO%CC%81N%202025-1/6.%20ADMINISTRACIO%CC%81N%20Y%20GESTIO%CC%81N%20EMPRESARIAL/ingenieria-en-administracion-de-empresas-mencion-marketing.jpg?updatedAt=1738199307768
2	Contabilidad General	Admin. y Gestión Empresarial	https://bibliotecas.aiep.cl/client/es_CL/default/search/results?qu=13&rt=false%7C%7C%7CAIEP_CARRERA%7C%7C%7CCarrera&st=TL	https://ik.imagekit.io/5wps2tups/FOTOS%20CARRERAS%20ADMISIO%CC%81N%202025-1/6.%20ADMINISTRACIO%CC%81N%20Y%20GESTIO%CC%81N%20EMPRESARIAL/contabilidad-general.jpg?updatedAt=1738199307422
3	Ingeniería Ejecución Administración Empresas Mención  Finanzas	Admin. y Gestión Empresarial	https://bibliotecas.aiep.cl/client/es_CL/default/search/results?qu=27&rt=false%7C%7C%7CAIEP_CARRERA%7C%7C%7CCarrera&st=TL	https://ik.imagekit.io/5wps2tups/FOTOS%20CARRERAS%20ADMISIO%CC%81N%202025-1/6.%20ADMINISTRACIO%CC%81N%20Y%20GESTIO%CC%81N%20EMPRESARIAL/ingenieria-en-administracion-de-empresas-mencion-finanzas.jpg?updatedAt=1738199307818
4	Auditoría	Admin. y Gestión Empresarial	https://bibliotecas.aiep.cl/client/es_CL/default/search/results?qu=6&rt=false%7C%7C%7CAIEP_CARRERA%7C%7C%7CCarrera&st=TL	https://ik.imagekit.io/5wps2tups/FOTOS%20CARRERAS%20ADMISIO%CC%81N%202025-1/6.%20ADMINISTRACIO%CC%81N%20Y%20GESTIO%CC%81N%20EMPRESARIAL/auditoria.jpg?updatedAt=1738199310389"""

# Parse the TSV data
lines = careers_data.strip().split('\n')
reader = csv.DictReader(lines, delimiter='\t')

careers = []
for row in reader:
    school_key = school_mapping.get(row['Escuela'], 'administracion')
    career = {
        'id': int(row['ID_OFICIAL']),
        'name': row['NOMBRE_BASE_OFICIAL'],
        'school': school_key,
        'url': row['URL Bibliografia'],
        'imageUrl': row['FOTO_URL']
    }
    careers.append(career)

# Generate JavaScript
js_content = "export const careersData = [\n"
for career in careers:
    js_content += f"  {{ id: {career['id']}, name: '{career['name']}', school: '{career['school']}', url: '{career['url']}', imageUrl: '{career['imageUrl']}' }},\n"
js_content += "]\n\n"
js_content += """export const getCareersBySchool = (schoolKey) => {
  return careersData.filter(career => career.school === schoolKey)
}

export const getAllSchools = () => {
  return [...new Set(careersData.map(c => c.school))]
}
"""

print(js_content)
