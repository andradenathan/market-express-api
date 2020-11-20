import { sequelize } from "./config";
import { Request, Response } from 'express'; 

export default async (req: Request, res: Response) => {
    
    /**
     * Database starts function and also it's meaningful for restarting database
     */

    if (process.env.NODE_ENV !== "development") {
        res.status(401).json({'error': "Can't restart DB in production"}).send;
    }
    try {
        await sequelize.sync({ force: true });
        await sequelize.authenticate();
        res.status(200).json('Connection has been established successfully').send;
    } catch (error) {
        res.status(400).json({'error': 'Unable to connect to the database'}).send;
    };
}