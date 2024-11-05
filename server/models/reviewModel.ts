import { DataTypes, Model } from 'sequelize';
import connectionDb from '../database/conectionDb';
import UserModel from '../models/userModel';

const reviews = connectionDb.define(
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
            allowNull: true,
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: true,
        }
        
    },
    {
        timestamps: false,
        tableName: 'reviews',
    });

    console.log(reviews === connectionDb.models.Reviews);

export default reviews;