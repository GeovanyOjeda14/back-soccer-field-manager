import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import Server from 'http';
import morgan from 'morgan';

// Inicializa la aplicación y el servidor
const app = express();
const server = Server.createServer(app);

// Configuraciones de middleware
app.use(cors());
// app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan('dev')); 

// Rutas

// Inicia el servidor
const PORT = 6000;

server.listen(PORT, () => {
    console.log("[Appointments] Online in port", PORT);
});