import { Sequelize } from "sequelize-typescript"; // Mapeador de relação de objetos
import { config } from 'dotenv';
import { resolve } from 'path';

// Configura conexão com o bd
config({path: resolve(__dirname, "../../.env")});

// inicia o sequelize
export const sequelize = new Sequelize({
    /**
     * Configurações do Sequelize:
     * dialect -> O tipo de banco de dados que você deseja usar
     * storage -> O caminho da onde o banco de dados armazenará os seus dados (::memory:: para armazenar na memória)
     * models -> O caminho das Models
     * username -> Usuário do banco de dados
     * password -> Senha do banco de dados
     */

    dialect: 'sqlite',
    storage: process.env.DATABASE_PATH,
    models: [__dirname + '/../models'],
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
});
