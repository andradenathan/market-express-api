import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/config'

export class Product extends Model {}

Product.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: DataTypes.FLOAT.UNSIGNED,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'Product'
});