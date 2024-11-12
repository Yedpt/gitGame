import { Sequelize } from 'sequelize';
import conectionDb from './database/conectionDb';
import UserModel from './models/userModel';
import news from "./models/newsModel";
import reviews from "./models/reviewModel";
import Video from './models/videoModel';
import express, { Express } from 'express';
import cors from 'cors';
import path from 'path';
import { loginRouter, userRouter } from './routes/userRoutes';
import { newRouter } from './routes/newsRoutes';
import { videoRouter } from './routes/videoRoutes';
import { reviewRouter } from './routes/reviewRoutes';
import { PORT } from './config';
import { addLike } from './controllers/reviewControllers';

export const app: Express = express();

// Hacer pública la carpeta de uploads para servir archivos

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173', // Cambia al puerto de tu frontend
    credentials: true, // Permite cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Servir archivos estáticos desde la carpeta 'uploads' dentro de 'server'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Middleware para procesar JSON
app.use(express.json());

// Rutas API
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/news', newRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/videos', videoRouter);
app.use ('/api/likes', addLike);

// Función para autenticar y sincronizar la base de datos
const initializeDatabase = async (sequelize: Sequelize) => {
    try {
        await sequelize.authenticate();
        console.log("Conexión exitosa a la base de datos.");

        await UserModel.sync({ force: false });
        console.log("Tabla de usuarios sincronizada.");

        await news.sync({ force: false });
        console.log("Tabla de noticias sincronizada.");

        await reviews.sync({ force: false });
        console.log("Tabla de reviews sincronizada.");

        await Video.sync({ force: false });
        console.log("Tabla de videos sincronizada.");
        
    } catch (error) {
        console.error("Error al conectar la base de datos:", error);
    }
};

// Inicializa la base de datos
initializeDatabase(conectionDb);

// Iniciar servidor
export const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});