// models/videoModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import connectionDb from '../database/conectionDb';
import UserModel from '../models/userModel';

// Define la interfaz para los atributos del modelo
interface VideoAttributes {
    id: number;
    user_id: number;
    title: string;
    video_url: string;
    published_at?: Date;
    updated_at?: Date;
}

// Define la interfaz para los atributos opcionales (para crear un video)
interface VideoCreationAttributes extends Optional<VideoAttributes, 'id' | 'published_at' | 'updated_at'> {}

// Extiende la clase Model
class Video extends Model<VideoAttributes, VideoCreationAttributes> implements VideoAttributes {
    public id!: number;
    public user_id!: number;
    public title!: string;
    public video_url!: string;
    public published_at!: Date;
    public updated_at!: Date;

    // Para manejar la actualización automática de updated_at
    public static initialize() {
        Video.beforeUpdate((video) => {
            video.updated_at = new Date();
        });
    }
}

// Inicializa el modelo
Video.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: UserModel,
                key: 'id',
            },
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        video_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        published_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true, // Esto permite que sea nulo si no se actualiza
        },
    },
    {
        tableName: 'videos',
        sequelize: connectionDb, // Se debe pasar la conexión
        timestamps: false, // Si usas timestamps automáticos, puedes poner esto en true
    }
);

// Inicializa la actualización de `updated_at` antes de cualquier actualización
Video.initialize();

export default Video;


