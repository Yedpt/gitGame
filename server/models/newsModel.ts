import { DataTypes, Model } from 'sequelize';
import connectionDb from '../database/conectionDb';
import UserModel from '../models/userModel';

const NewsModel = connectionDb.define(
    'News',
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
        news: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        published_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: true,
        },
        num_likes: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image2_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    });

// console.log(news === connectionDb.models.New);

export default NewsModel;