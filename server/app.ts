import conectionDb from './database/conectionDb';
import UserModel from './models/userModel';
import news from "./models/newsModel";
import reviews from "./models/reviewModel";
import Video from './models/videoModel';
import express from 'express';
import cors from 'cors';
import {loginRouter, userRouter} from './routes/userRoutes';
import { newRouter } from './routes/newsRoutes';
import { videoRouter } from './routes/videoRoutes';
import { PORT } from './config';
import { reviewRouter } from './routes/reviewRoutes';
import path from 'path';

export const app = express();

// Hacer pública la carpeta de uploads para servir archivos

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173', // Cambia al puerto de tu frontend
    credentials: true, // Permite cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Hacer pública la carpeta de uploads para servir archivos estáticos
const uploadPath = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadPath));

// Middleware para procesar JSON
app.use(express.json());

// Rutas API
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/news', newRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/videos', videoRouter);

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