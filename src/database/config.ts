import { Sequelize } from "sequelize-typescript";
import { config } from 'dotenv';
import { resolve } from 'path';

config({path: resolve(__dirname, "../../.env")});

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DATABASE_PATH,
    models: [__dirname + '/../models'],
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
});
