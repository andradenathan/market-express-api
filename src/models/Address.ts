import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database/config';

export class Address extends Model {}

Address.init({
    street: {
        type: DataTypes.STRING,
        allowNull: false
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Address'
})
