import json

with open('countries.json', 'r') as f:
    data = json.load(f)

processed_countries = [
    {'id': country['id'], 'name': country['name'], 'phone_code': country['phone_code'], 'emoji': country['emoji']}
    for country in data
]

sql_sentence = [
    f"INSERT INTO Country (id, name, phone_code, emoji) VALUES ('{country['id']}', '{country['name']}', '{country['phone_code']}', '{country['emoji']}');"
    for country in processed_countries
]

sql_script = '\n'.join(sql_sentence)

with open('country.sql', 'w') as f:
    f.write(sql_script)