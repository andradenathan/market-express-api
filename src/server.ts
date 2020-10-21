import bodyParser from 'body-parser';
import express from 'express';
import {Request, Response} from "express"
import ProductsController from './controllers/ProductsController';
import { sequelize } from './database/config';

const app = express();

app.listen(5001);
app.use(bodyParser.json());

app.post('/sync', startDb);

app.get('/products/:id', ProductsController.get);
app.get('/products', ProductsController.list);
app.post('/products', ProductsController.create);
app.put('/products/:id', ProductsController.update);
app.delete('/products/:id', ProductsController.delete);

app.listen(5000);


async function startDb(req: Request, res: Response) {

    try {
        await sequelize.sync({ force: true });
        await sequelize.authenticate();
        res.status(200).json('Connection has been established successfully.').send;
    } catch (error) {
        res.status(400).json({'Unable to connect to the database': error}).send;
    }
}
