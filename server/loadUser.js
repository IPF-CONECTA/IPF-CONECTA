import fs from "fs";
import axios from "axios";
import path from "path";

// Ruta al archivo JSON
const filePath = path.resolve("./user.json");

// Cargar usuarios del archivo JSON
const loadUsers = async () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8"); // Leer archivo JSON
    const usersData = JSON.parse(data);

    // Verificar si la propiedad 'users' existe y es un arreglo
    if (!Array.isArray(usersData)) {
      throw new Error("El archivo JSON no contiene un arreglo de usuarios");
    }

    const users = usersData; // Directamente tomar el arreglo de usuarios

    console.log("Usuarios cargados:", users); // Mostrar los usuarios para asegurarse de que se cargaron correctamente

    const apiUrl = "http://localhost:4000/create-user"; // Cambia a tu endpoint

    for (const userData of users) {
      try {
        // Envolver el objeto de usuario en la propiedad 'user' como la API espera
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

// Ejecutar la función para cargar usuarios
loadUsers();
