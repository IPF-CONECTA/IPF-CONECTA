import json

# Leer el archivo JSON
with open('states.json', 'r') as f:
    data = json.load(f)

# Procesar los estados
processed_states = [
    {'id': state['id'], 'name': state['name'], 'country_id': state['country_id']}
    for state in data
]

# Crear las instrucciones SQL
sql_instructions = [
    f"INSERT INTO states (id, name, country_id) VALUES ('{state['id']}', '{state['name']}', '{state['country_id']}');"
    for state in processed_states
]

# Unir las instrucciones SQL en una sola cadena
sql_script = '\n'.join(sql_instructions)

# Escribir el script SQL en un archivo
with open('state.sql', 'w') as f:
    f.write(sql_script)