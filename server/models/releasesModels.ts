import { DataTypes, Model } from 'sequelize';
import connectionDb from '../database/conectionDb';
import UserModel from './userModel';
// cambiando el camo relese a release
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
            references: {
                model: UserModel,
                key: 'id',
            }
            },
        title: {
            type: DataTypes.STRING,
        },
        release_date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        rating: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        image_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        month: {
            type: DataTypes.STRING,
            allowNull: false,
        }
          
    },
    {
        timestamps: false,
        tableName: 'releases',
    });
    
export default releases;