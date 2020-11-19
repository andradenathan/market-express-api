import bodyParser from 'body-parser';
import express from 'express';
import AddressesController from './controllers/AddressesController';
import ProductsController from './controllers/ProductsController';
import UsersController from './controllers/UsersController';
import SessionController from './controllers/SessionController';
import Auth from './middlewares/Auth';
import Validators from './middlewares/Validators';
import MailController from './controllers/MailController';
import validateOffer from './middlewares/OfferMiddleware';
import seedDB from './seeders/Seeder';
import startDb from './database/start';
import multer from 'multer';
import uploadConfig from './config/Upload';
import path from 'path';
import Admin from './middlewares/Admin';


const app = express();
const upload = multer(uploadConfig);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Rotas de autenticação
app.post('/users', Validators.validateUser('create'), upload.single('photo'), UsersController.create);
app.post('/users/login', SessionController.login);

// Rotas de produtos
app.get('/products/:id', ProductsController.get);
app.get('/products', ProductsController.list);
app.get('/products/:id/owner', ProductsController.getOwner);
app.get('/products/:id/offers', ProductsController.getOffers);
app.post('/products', Auth, Validators.validateProduct('create'), ProductsController.create);
//app.post('/products/:product_id/owner/:user_id', ProductsController.setOwner);
app.put('/products/:id', Auth, Validators.validateProduct('update'), ProductsController.update);
app.delete('/products/:id', Auth, ProductsController.delete);

// Rotas de usuário logado
app.get('/users/curr', Auth, UsersController.get);
app.get('/users/curr/products', Auth, UsersController.getProducts);
app.get('/users/curr/offers', Auth, UsersController.getOffers);
app.post('/users/curr/offers/:product_id', Validators.validadeOffer(), Auth, validateOffer, UsersController.makeOffer);
app.put('/users/curr', Auth, Validators.validateUser('update'), UsersController.update);
app.delete('/users/curr', Auth, UsersController.delete);

// Rotas de Admin
app.get('/users/:id', Auth, Admin, UsersController.get);
app.get('/users/all', Auth, Admin, UsersController.list);
app.get('/users/:id/products', Auth, Admin, UsersController.getProducts);
app.get('/users/:id/offers', Auth, Admin, UsersController.getOffers);
app.put('/users/:id', Auth, Admin, Validators.validateUser('update'), UsersController.update);
app.delete('/users/:id', Auth, Admin, UsersController.delete);

// Rotas de endereços
app.post('/addresses', Auth, AddressesController.create);
//app.post('/addresses/:address_id/user/:user_id', AddressesController.setUser);
app.put('/addresses/', Auth, AddressesController.update);
app.delete('/addresses', Auth, AddressesController.delete);

// Rota de email
app.post('/mail', MailController.mail);

// Rotas de desenvolvimento
app.post('/startDb', startDb);
app.post('/seeders/:n', seedDB);


// Configurações de upload
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(process.env.PORT?.valueOf());
