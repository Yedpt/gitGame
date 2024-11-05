import { DataTypes, Model } from 'sequelize';
import connectionDb from '../database/conectionDb';

const releases = connectionDb.define(
    'upcoming_releases',
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
        },
        relese_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        month: {
            type: DataTypes.STRING,
            allowNull: false,
        }
          
    },
    {
        timestamps: false,
        tableName: 'reviews',
    });

   

export default releases;