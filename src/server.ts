import bodyParser from 'body-parser';
import express from 'express';
import { sequelize } from './database/config';
import {Request, Response} from "express"
import AddressesController from './controllers/AddressesController';
import ProductsController from './controllers/ProductsController';
import UsersController from './controllers/UsersController';
import SessionController from './controllers/SessionController';
import Auth from './middlewares/Auth';
import Validators from './middlewares/Validators';
import { validate as validateOffer } from './middlewares/OfferMiddleware';


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/sync', startDb);

// Rotas de autenticação
app.post('/auth/login', SessionController.login);


// Rotas de produtos
app.get('/products/:id', ProductsController.get);
app.get('/products', ProductsController.list);
app.get('/products/:id/owner', ProductsController.getOwner);
app.get('/products/:id/offers', ProductsController.getOffers);
app.post('/products', Validators.validateProduct('create'), ProductsController.create);
app.post('/products/:product_id/owner/:user_id', ProductsController.setOwner);
app.put('/products/:id', Validators.validateProduct('update'), ProductsController.update);
app.delete('/products/:id', ProductsController.delete);

// Rotas de usuários
app.get('/users/:id', UsersController.get);
app.get('/users', UsersController.list);
app.get('/users/:id/products', UsersController.getProducts);
app.get('/users/:id/offers', UsersController.getOffers);
app.post('/users', Validators.validateUser('create'), UsersController.create);
app.post('/users/:user_id/offers/:product_id', Validators.validadeOffer(), validateOffer, UsersController.makeOffer);
app.put('/users', Auth, Validators.validateUser('update'), UsersController.update);
app.delete('/users/:id', UsersController.delete);

// Rotas de endereços
app.post('/address', AddressesController.create);
app.post('/addresses/:address_id/user/:user_id', AddressesController.setUser);
app.put('/addresses/:id', AddressesController.update);
app.delete('/addresses/:id', AddressesController.delete);


app.listen(process.env.PORT?.valueOf());


async function startDb(req: Request, res: Response) {

    try {
        await sequelize.sync({ force: true });
        await sequelize.authenticate();
        res.status(200).json('Connection has been established successfully').send;
    } catch (error) {
        res.status(400).json({'Unable to connect to the database': error}).send;
    }
}
