import express, { type Request, type Response, type NextFunction} from 'express';
import cors from 'cors';

import {router} from './routes.js'

const app = express();
app.use(express.json());
app.use(cors());

app.use(router);

app.listen(3333, () => console.log("Servidor online!"))