import { Router } from 'express';

import AddressesController from './controllers/AddressesController';
import ProductsController from './controllers/ProductsController';
import UsersController from './controllers/UsersController';
import SessionController from './controllers/SessionController';
import MailController from './controllers/MailController';

import Auth from './middlewares/Auth';
import Validators from './middlewares/Validators';
import validateOffer from './middlewares/OfferMiddleware';
import Admin from './middlewares/Admin';

import seedDB from './seeders/Seeder';
import startDb from './database/start';

import multer from 'multer';
import uploadConfig from './config/Upload';

const routes = Router();
const upload = multer(uploadConfig);

// Rotas de desenvolvimento
routes.post('/startDb', startDb);
routes.post('/seeders/:n', seedDB);

// Rotas de autenticação
routes.post('/users', upload.single('photo'), Validators.validateUser('create'), UsersController.create);
routes.post('/users/login', SessionController.login);

// Rotas de produtos
routes.get('/products/:id', ProductsController.get);
routes.get('/products', ProductsController.list);
routes.get('/products/:id/owner', ProductsController.getOwner);
routes.get('/products/:id/offers', ProductsController.getOffers);
routes.post('/products', Auth, Validators.validateProduct('create'), ProductsController.create);
//routes.post('/products/:product_id/owner/:user_id', ProductsController.setOwner);
routes.put('/products/:id', Auth, Validators.validateProduct('update'), ProductsController.update);
routes.delete('/products/:id', Auth, ProductsController.delete);

// Rotas de usuários
routes.get('/users/curr', Auth, UsersController.get);
routes.get('/users/curr/products', Auth, UsersController.getProducts);
routes.get('/users/curr/offers', Auth, UsersController.getOffers);
routes.post('/users/curr/offers/:product_id', Validators.validadeOffer(), Auth, validateOffer, UsersController.makeOffer);
routes.put('/users/curr', Auth, Validators.validateUser('update'), UsersController.update);
routes.delete('/users/curr', Auth, UsersController.delete);

// Rotas de administrador
routes.get('/users/:id', Auth, Admin, UsersController.get);
routes.get('/users/all', Auth, Admin, UsersController.list);
routes.get('/users/:id/products', Auth, Admin, UsersController.getProducts);
routes.get('/users/:id/offers', Auth, Admin, UsersController.getOffers);
routes.put('/users/:id', Auth, Admin, Validators.validateUser('update'), UsersController.update);
routes.delete('/users/:id', Auth, Admin, UsersController.delete);

// Rotas de endereços
routes.post('/addresses', Auth, AddressesController.create);
//routes.post('/addresses/:address_id/user/:user_id', AddressesController.setUser);
routes.put('/addresses/', Auth, AddressesController.update);
routes.delete('/addresses', Auth, AddressesController.delete);

// Rotas de email
routes.post('/mail', MailController.mail);


export default routes;