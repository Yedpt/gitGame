import { Sequelize } from "sequelize";


const connectionDb = new Sequelize('book_app', 'root', '12345', {
    host: 'localhost',
    dialect: 'mysql',
    define: {
        timestamps: false
    }
  });

export default connectionDb;