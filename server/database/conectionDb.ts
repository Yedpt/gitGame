import { Sequelize } from 'sequelize';
import { DB_PASSWORD, DB_HOST, DB_USER, DB_DEV_NAME, DB_TEST_NAME, DB_PORT, NODE_ENV } from '../config';

const DB_NAME = NODE_ENV === 'test' ? DB_TEST_NAME : DB_DEV_NAME;


const connectionDb = new Sequelize( DB_NAME , DB_USER, DB_PASSWORD , {
  host: DB_HOST ,
  dialect: 'mysql',
  port: Number(DB_PORT) || 3306,
  timezone: "+01:00",
  define: {
    timestamps: false,
  },
});

export default connectionDb;
