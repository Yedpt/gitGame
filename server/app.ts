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
import {releaseRouter} from './routes/releasesRoutes';
import multer from 'multer';
import releases from './models/releasesModels';

export const app: Express = express();

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:5173', // Cambia al puerto de tu frontend
    credentials: true, // Permite cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configura multer para guardar imágenes en una carpeta específica (e.g., 'uploads/')
const upload = multer({ dest: 'uploads/launch' });

// Servir archivos estáticos desde la carpeta 'uploads' dentro de 'server'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Middleware para procesar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas API
app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);
app.use('/api/news', newRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/videos', videoRouter);
app.use('/api/releases', releaseRouter); // para Usar las rutas de los juegos

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

        await releases.sync({force:false});
        console.log("tabla de lanzamientos syncronizada");

        
        
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