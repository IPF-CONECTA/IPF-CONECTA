import server from "./server";
import "dotenv/config";
import { databaseConnection } from "./database/main";

const PORT = process.env.PORT || 4000;

databaseConnection();

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
