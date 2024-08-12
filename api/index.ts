import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Server from 'http';
import morgan from 'morgan';
import register from "./components/register/network";
import login from "./components/login/network";
import { getConfig, currentEnv } from '../config/config';
import { connect } from '../connection/connection';

// Inicializa la aplicación y el servidor
const app = express();
const server = Server.createServer(app);
const component = 'api';

// Conexión a MongoDB
connect(getConfig(component, 'mongoConnection').toString());

// Configuraciones de middleware
app.use(cors());
// app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev')); 

// Rutas
app.use('/api/login', login);
app.use('/api/register', register);

// Inicia el servidor
const PORT = getConfig(component, 'PORT');

server.listen(PORT, () => {
    console.log(`[${currentEnv}][${component}] Online in port: ${PORT}`);
});