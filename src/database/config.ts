import { Sequelize } from "sequelize-typescript";
import { config } from 'dotenv';
import { resolve } from 'path';

config({path: resolve(__dirname, "../../.env")});

export const sequelize = new Sequelize({
    /**
     * Sequelize configurations
     * dialect -> which type of database you want to use
     * storage -> the path that you will place the database (you can put ::memory:: to assign into your memory)
     * models -> where your models is located
     * username -> database user
     * password -> database pass
     */

    dialect: 'sqlite',
    storage: process.env.DATABASE_PATH,
    models: [__dirname + '/../models'],
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
});
