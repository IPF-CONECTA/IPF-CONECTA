## Como hacer la build de la base de datos:

### Luego de instalar todas las dependencias con npm install:

- Configurar tu uri de postgree (./src/config/db.js), establece tus credenciales en el .env
- Descomenta los bulkCreate en el archivo (./src/config/sync.js) para crear los registros correspondientes
- Copia el sql (./src/config/world/world.sql) y pegalo en la query del manejador de base de datos que tengas

#### Y listo :

### Estando en desarrollo comenta los bulkCreate, sino se crearan los mismos registros cada vez que se inicie el servidor
