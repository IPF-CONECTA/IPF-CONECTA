import fs from "fs";
import axios from "axios";
import path from "path";

// Ruta al archivo JSON
const filePath = path.resolve("./userData.json");

// Cargar usuarios del archivo JSON
const loadUsers = async () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8"); 
    const usersData = JSON.parse(data);

    if (!Array.isArray(usersData)) {
      throw new Error("El archivo JSON no contiene un arreglo de usuarios");
    }

    const users = usersData; 

    console.log("Usuarios cargados:", users)
    const apiUrl = "http://localhost:4000/create-user"; 

    for (const userData of users) {
      try {
 
        const response = await axios.post(apiUrl, { user: userData });
        console.log(`Usuario ${userData.username} registrado con éxito.`);
      } catch (error) {
        console.error(
          `Error al registrar el usuario ${userData.username}:`,
          error.response?.data || error.message
        );
      }
    }
  } catch (error) {
    console.error("Error al cargar el archivo JSON:", error.message);
  }
};

loadUsers();
