import conectionDb from './database/conectionDb';
import UserModel from './models/userModel';
import news from "./models/newsModel";
import express from 'express';
import cors from 'cors';
import {userRouter} from './routes/userRoutes';
import { router } from "./routes/newsRoutes";
import { PORT } from './config';

export const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // el localhost donde esta corriendo el front
  }));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/news', router)

    try {
        conectionDb.authenticate();
        console.log("conexión exitosa a la bbdd");

        UserModel.sync({ force: false });
        console.log("se ha creado la tabla de usuarios");

        news.sync({ force: false });
        console.log('Tabla de noticias creada');

    }catch (error) {
        console.log("error al conectar la base de datos 😒", error);
    }

export const server = app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto http://localhost:${PORT}`);
});