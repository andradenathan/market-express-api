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
app.get('/products/:id/owner', ProductsController.getOwner);
app.get('/products/:id/offers', ProductsController.getOffers);
app.post('/products', ProductsController.validate('create'), ProductsController.create);
app.post('/products/:product_id/owner/:user_id', ProductsController.setOwner);
app.put('/products/:id', ProductsController.validate('update'), ProductsController.update);
app.delete('/products/:id', ProductsController.delete);

// Rotas de usuários
app.get('/users/:id', UsersController.get);
app.get('/users', UsersController.list);
app.get('/users/:id/products', UsersController.getProducts);
app.get('/users/:id/offers', UsersController.getOffers);
app.post('/users', UsersController.validate('create'), UsersController.create);
app.post('/users/:user_id/offers/:product_id', UsersController.makeOffer);
app.put('/users/:id',UsersController.validate('update'), UsersController.update);
app.delete('/users/:id', UsersController.delete);

// Rotas de endereços
app.post('/address', AddressesController.create);
app.post('/addresses/:address_id/user/:user_id', AddressesController.setUser);
app.put('/addresses/:id', AddressesController.update);
app.delete('/addresses/:id', AddressesController.delete);


app.listen(5000);


async function startDb(req: Request, res: Response) {

    try {
        await sequelize.sync({ force: true });
        await sequelize.authenticate();
        res.status(200).json('Connection has been established successfully: ').send;
    } catch (error) {
        res.status(400).json({'Unable to connect to the database': error}).send;
    }
}
