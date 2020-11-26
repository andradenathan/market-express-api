import { sequelize } from "./config";
import { Request, Response } from 'express'; 

// Inicia o banco de dados (Casos não esteja em produção)
export default async (req: Request, res: Response) => {
    if (process.env.NODE_ENV !== "development") {   // Verifica se o bd está em produção e retorna um erro caso esteja
        res.status(401).json({'error': "Can't restart DB in production"}).send;
    }
    try {
        await sequelize.sync({ force: true });  // Migra o db
        await sequelize.authenticate(); // testa a conexão com o bd
        res.status(200).json('Connection has been established successfully').send;
    } catch (error) {
        res.status(400).json({'error': 'Unable to connect to the database'}).send;
    }
}