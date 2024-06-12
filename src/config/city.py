import json

# Leer el archivo JSON
with open('cities.json', 'r') as f:
    data = json.load(f)

# Procesar las ciudades
processed_cities = [
    {'id': city['id'], 'name': city['name'].replace("'", "''"), 'state_id': city['state_id']}
    for city in data
]

# Crear las instrucciones SQL
sql_instructions = [
    f"INSERT INTO cities (id, name, state_id) VALUES ('{city['id']}', '{city['name']}', '{city['state_id']}');"
    for city in processed_cities
]

# Unir las instrucciones SQL en una sola cadena
sql_script = '\n'.join(sql_instructions)

# Escribir el script SQL en un archivo
with open('city.sql', 'w') as f:
    f.write(sql_script)