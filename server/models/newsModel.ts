import { DataTypes, Model } from 'sequelize';
import connectionDb from '../database/conectionDb';
// import { CatMeme } from '../Interfaces/catInterfaces';
// Definición de los atributos de Book

// interface catMeme extends Model<CatMeme>, CatMeme {}
const news = connectionDb.define(
    'New',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
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
    },
    {
        timestamps: false,
    });

    console.log(news === connectionDb.models.New);

export default news;