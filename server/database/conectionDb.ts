import { envConfig } from '../config';

const connectToDatabase = () => {
    const { DB_HOST, DB_USER, DB_PASSWORD, DB_DEV_NAME } = envConfig;

    console.log(`Conectando a la base de datos en ${DB_HOST} con el usuario ${DB_USER}`);

  // Aquí podrías usar alguna librería como Sequelize o Knex para hacer la conexión
  // Ejemplo (si usas alguna librería de conexión):
  // return new Sequelize(DB_DEV_NAME, DB_USER, DB_PASSWORD, {
  //     host: DB_HOST,
  //     dialect: 'mysql' // o el que uses
  // });
};

export default connectToDatabase;
