import connectionDb from "./database/conectionDb";

async function main() {
  try {
    await connectionDb.authenticate();
    console.log('Conexión exitosa.');
  } catch (error) {
    console.error('conexion fallida', error);
  }
}

main();