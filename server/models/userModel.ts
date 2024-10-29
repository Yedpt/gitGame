import {  DataTypes, Model } from "sequelize";
import connectionDb from "../database/conectionDb";
import { Users } from "../interfaces/userInterface";

interface UserModel extends Model<Users>, Users {}
const UserModel= connectionDb.define<UserModel>('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    rol: {
        type: DataTypes.STRING,
        defaultValue: 'usuario'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },
    last_login: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM('active','inactive','deleted'), 
        allowNull: false,
        defaultValue: 'active'
    },
    bio: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    birth_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    
    });

    export default UserModel;