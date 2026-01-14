#!/usr/bin/env python3
# -*- coding: utf-8 -*-
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

def escape_js_string(s):
    """Escape special characters for JavaScript strings"""
    return s.replace("'", "\\'").replace('\n', '\\n').replace('\r', '\\r')

# Read CSV file
careers = []
with open('Contenido_nuevo_portal_bibliotecas_aiep(bibliografia-base-final).csv', 'r', encoding='iso-8859-1') as f:
    reader = csv.DictReader(f, delimiter=';')
    for row in reader:
        # Get the school key
        school_name = row.get('Escuela', '').strip()
        school_key = school_mapping.get(school_name, 'administracion')
        
        career = {
            'id': int(row.get('ID_OFICIAL', 0)),
            'name': row.get('NOMBRE_BASE_OFICIAL', '').strip(),
            'school': school_key,
            'url': row.get('URL Bibliografia', '').strip(),
            'imageUrl': row.get('FOTO_URL', '').strip()
        }
        careers.append(career)

# Sort by ID
careers.sort(key=lambda x: x['id'])

# Generate JavaScript file
js_content = "export const careersData = [\n"
for career in careers:
    name = escape_js_string(career['name'])
    url = escape_js_string(career['url'])
    imageUrl = escape_js_string(career['imageUrl'])
    js_content += f"  {{ id: {career['id']}, name: '{name}', school: '{career['school']}', url: '{url}', imageUrl: '{imageUrl}' }},\n"

js_content += "]\n\n"
js_content += """export const getCareersBySchool = (schoolKey) => {
  return careersData.filter(career => career.school === schoolKey)
}

export const getAllSchools = () => {
  return [...new Set(careersData.map(c => c.school))]
}
"""

# Write to file
with open('src/data/careersData.js', 'w', encoding='utf-8') as f:
    f.write(js_content)

print(f"✅ Successfully converted {len(careers)} careers to careersData.js")
