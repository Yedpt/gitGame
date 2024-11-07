// models/videoModel.ts
import { DataTypes, Model, Optional } from 'sequelize';
import connectionDb from '../database/conectionDb';

// Define la interfaz para los atributos del modelo
interface VideoAttributes {
    id: number;
    user_id: number;
    title: string;
    video_url: string;
    published_at?: Date;
    updated_at?: Date;
    thumbnail?: string | null;
}

// Define la interfaz para los atributos opcionales (para crear un video)
interface VideoCreationAttributes extends Optional<VideoAttributes, 'id' | 'published_at' | 'updated_at' | 'thumbnail'> {}

class Video extends Model<VideoAttributes, VideoCreationAttributes> implements VideoAttributes {
    public id!: number;
    public user_id!: number;
    public title!: string;
    public video_url!: string;
    public published_at!: Date;
    public updated_at!: Date;
    public thumbnail!: string | null;
}

// Inicializa el modelo con hooks y atributos
Video.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
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
            allowNull: true,
        },
        thumbnail: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        tableName: 'videos',
        sequelize: connectionDb,
        timestamps: false,
        hooks: {
            beforeUpdate: (video: Video) => {
                video.updated_at = new Date();
            }
        }
    }
);

export default Video;
