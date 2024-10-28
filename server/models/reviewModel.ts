import { DataTypes, Model } from 'sequelize';
import connectionDb from '../database/conectionDb';

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
            allowNull: true,
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: true,
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
            allowNull: false,
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        
    },
    {
        timestamps: false,
    });

    console.log(reviews === connectionDb.models.Review);

export default reviews;