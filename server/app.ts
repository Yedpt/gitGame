import connectionDb from "./database/conectionDb";
import news from "./models/newsModel";
import express from 'express';
import cors from 'cors';
import { router } from "./routes/newsRoutes";
import { PORT } from "./config";


export const app = express();

app.use(cors()); //AJUSTAR CON EL LOCALHOST DEL FRONT
app.use(express.json());
app.use('/news', router)

    try {
        connectionDb.authenticate();
        console.log('Conexión exitosa');

        news.sync({ force: false });
        console.log('Tabla de noticias creada');

    } catch (error) {
        console.error('conexion fallida', error);
    }

export const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}/`);
})
