import bodyParser from 'body-parser';
import express from 'express';

import routes from './routes';

import cors from 'cors';

import path from 'path';


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(routes);


// Configurações de upload
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.listen(process.env.PORT?.valueOf());
