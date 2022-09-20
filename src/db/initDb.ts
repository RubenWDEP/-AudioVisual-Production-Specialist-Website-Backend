import { ResultSetHeader } from "mysql2";
import { getConnection } from "./db";

async function main() {
  let connection;

  try {
    connection = await getConnection();
    console.log("he creado las conexiones...");
    console.log("Creando la tabla...");

    const createTableComments =
      await connection.query<ResultSetHeader>(`CREATE TABLE IF NOT EXISTS comments(
        idComment INTEGER PRIMARY KEY AUTO_INCREMENT, 
        section VARCHAR (20) NOT NULL,
        name VARCHAR (20) NOT NULL, 
        email VARCHAR (50) NOT NULL, 
        comment VARCHAR (280) NOT NULL,
        create_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    if (createTableComments[0].warningStatus === 1) {
      console.log("La tabla de comentarios ya existe.");
    } else {
      console.log("Se ha creado correctamente la tabla de comentarios.");
    }
  } catch (error) {
    console.error(error);
  } finally {
    if (connection) {
      process.exit();
    }
  }
}

main();
