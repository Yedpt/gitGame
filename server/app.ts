import conectionDb from './database/conectionDb';
import UserModel from './models/userModel';
import news from "./models/newsModel";
import reviews from "./models/reviewModel";
import Video from './models/videoModel';
import express from 'express';
import cors from 'cors';
<<<<<<< HEAD
import releasesRoutes from './routes/releasesRoutes';
import { reviewRouter } from './routes/reviewRoutes';
import {userRouter} from './routes/userRoutes';
=======
import {loginRouter, userRouter} from './routes/userRoutes';
>>>>>>> a23966d04463ec528c3235a29fb2c42a62e64f44
import { newRouter } from './routes/newsRoutes';
import { videoRouter } from './routes/videoRoutes';
import { PORT } from './config';
import reviewRoutes, { uploadRouter } from './routes/reviewRoutes';

export const app = express();
// Hacer pública la carpeta de uploads para servir archivos

app.use(cors({
    origin: 'http://localhost:5173', // Cambia al puerto de tu frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/news', newRouter);
app.use('/api/reviews', reviewRoutes);
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