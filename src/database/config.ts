import { Sequelize } from "sequelize-typescript"; // Mapeador de relação de objetos
import { config } from 'dotenv';
import { resolve } from 'path';

// Configura conexão com o bd
config({path: resolve(__dirname, "../../.env")});

// inicia o sequelize
export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DATABASE_PATH,
    models: [__dirname + '/../models'],
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
});
