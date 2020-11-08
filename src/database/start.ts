import { sequelize } from "./config";
import { Request, Response } from 'express'; 

export async function startDb(req: Request, res: Response) {
    if (process.env.NODE_ENV !== "development") {
        res.status(401).json({'error': "can't restart DB in production"}).send;
    }
    try {
        await sequelize.sync({ force: true });
        await sequelize.authenticate();
        res.status(200).json('Connection has been established successfully').send;
    } catch (error) {
        res.status(400).json({'error': 'Unable to connect to the database'}).send;
    }
}