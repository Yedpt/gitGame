import { DataTypes, Model, Optional } from 'sequelize';
import connectionDb from '../database/conectionDb';
import UserModel from '../models/userModel';
import { ReviewAttributes } from '../interfaces/reviewInterfaces';

// Definimos los campos opcionales solo para el proceso de creación
interface ReviewCreationAttributes extends Optional<ReviewAttributes, 'id' | 'published_at' | 'updated_at' | 'num_likes' | 'rating'> {}


const reviews = connectionDb.define <Model<ReviewAttributes, ReviewCreationAttributes>>(
    'Reviews',
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
        rol: {
            type: DataTypes.STRING,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        review: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        published_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        num_likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            allowNull: true,
        },
        rating: {
            type: DataTypes.STRING,
            defaultValue: 0,
            allowNull: true,
        }
        
    },
    {
        timestamps: false,
        tableName: 'reviews',
    });

    console.log(reviews === connectionDb.models.Reviews);

export default reviews;