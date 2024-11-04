import conectionDb from './database/conectionDb';
import UserModel from './models/userModel';
import news from "./models/newsModel";
import reviews from "./models/reviewModel";
import Video from './models/videoModel';
import express from 'express';
import cors from 'cors';
import releasesRoutes from './routes/releasesRoutes';
import { reviewRouter } from './routes/reviewRoutes';
import {userRouter} from './routes/userRoutes';
import { newRouter } from './routes/newsRoutes';
import { videoRouter } from './routes/videoRoutes';
import { PORT } from './config';

export const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // el localhost donde esta corriendo el front
  }));
app.use(express.json());

app.use('/api/users', userRouter);
app.use('/api/news', newRouter)
app.use('/api/reviews', reviewRouter);
app.use('/api/videos', videoRouter);
app.use('/api/releases', releasesRoutes); // para Usar las rutas de los juegos

    try {
        conectionDb.authenticate();
        console.log("conexión exitosa a la bbdd");

        UserModel.sync({ force: false });
        console.log("se ha creado la tabla de usuarios");

        news.sync({ force: false });
        console.log('Tabla de noticias creada');

        reviews.sync({ force: false });
        console.log('Tabla de reviews creada');
        
        Video.sync({ force:false});
        console.log('Tabla de videos creada');
        

    }catch (error) {
        console.log("error al conectar la base de datos 😒", error);
    }

export const server = app.listen(PORT, () => {
    console.log(`servidor corriendo en el puerto http://localhost:${PORT}`);
});