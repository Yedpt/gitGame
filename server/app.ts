import connectionDb from "./database/conectionDb";
import news from "./models/newsModel";
import express from 'express';
import cors from 'cors';
import { router } from "./routes/newsRoutes";


export const app = express();

app.use(cors()); //AJUSTAR CON EL LOCALHOST DEL FRONT
app.use(express.json());
app.use('/news', router)


async function main() {
    try {
        await connectionDb.authenticate();
        console.log('Conexión exitosa.');

        await news.sync({ force: false });
        console.log('Tabla de noticias creada');

    } catch (error) {
        console.error('conexion fallida', error);
    }
}

export const server = app.listen(8000, () => {
    console.log('working server up http://localhost:8000')
} //ajustar luego con PORT
)

main();