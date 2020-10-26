import bodyParser from 'body-parser';
import express from 'express';
import { sequelize } from './database/config';

import {Request, Response} from "express"

import AddressesController from './controllers/AddressesController';
import ProductsController from './controllers/ProductsController';
import UsersController from './controllers/UsersController';


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/sync', startDb);

// Rotas de produtos
app.get('/products/:id', ProductsController.get);
app.get('/products', ProductsController.list);
app.post('/products', ProductsController.create);
app.put('/products/:id', ProductsController.update);
app.delete('/products/:id', ProductsController.delete);

// Rotas de usuários
app.get('/users/:id', UsersController.get);
app.get('/users', UsersController.list);
app.post('/users', UsersController.create);
app.put('/users/:id', UsersController.update);
app.delete('/users/:id', UsersController.delete);

// Rotas de endereços
app.post('/address', AddressesController.create);
app.put('/addresses/:id', AddressesController.update);
app.delete('/addresses/:id', AddressesController.delete);


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
