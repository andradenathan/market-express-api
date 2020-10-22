import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/config'

export class User extends Model {}

User.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    }

}, {
    sequelize,
    modelName: 'User'
});