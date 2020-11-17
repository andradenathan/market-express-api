import bodyParser from 'body-parser';
import express from 'express';
import AddressesController from './controllers/AddressesController';
import ProductsController from './controllers/ProductsController';
import UsersController from './controllers/UsersController';
import SessionController from './controllers/SessionController';
import Auth from './middlewares/Auth';
import Validators from './middlewares/Validators';
import MailController from './controllers/MailController';
import { validate as validateOffer } from './middlewares/OfferMiddleware';
import { seedDB } from './seeders/Seeder';
import { startDb } from './database/start';
import multer from 'multer';
import uploadConfig from './config/Upload';
import path from 'path';


const app = express();
const upload = multer(uploadConfig);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


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
app.post('/users', Validators.validateUser('create'), upload.single('photo'), UsersController.create);
app.post('/users/:user_id/offers/:product_id', Validators.validadeOffer(), validateOffer, UsersController.makeOffer);
app.put('/users', Auth, Validators.validateUser('update'), UsersController.update);
app.delete('/users/:id', UsersController.delete);

// Rotas de endereços
app.post('/address', AddressesController.create);
app.post('/addresses/:address_id/user/:user_id', AddressesController.setUser);
app.put('/addresses/:id', AddressesController.update);
app.delete('/addresses/:id', AddressesController.delete);

// Rota de email
app.post('/mail', MailController.mail);

// Rotas de desenvolvimento
app.post('/startDb', startDb);
app.post('/seeders/:n', seedDB);


// Configurações de upload
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(process.env.PORT?.valueOf());
