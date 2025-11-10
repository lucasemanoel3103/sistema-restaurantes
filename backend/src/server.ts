import express, { type Request, type Response, type NextFunction } from 'express';
import cors from 'cors';
import path from 'path';

// Importa as funções necessárias para recriar o __dirname
import { fileURLToPath } from 'url';

import { router } from './routes.js';


// 1. Pega o caminho do arquivo atual (equivalente ao __filename)
const __filename = fileURLToPath(import.meta.url);
// 2. Pega o diretório do arquivo atual (equivalente ao __dirname)
const __dirname = path.dirname(__filename);


const app = express();
app.use(express.json());
app.use(cors());

app.use(router);


app.use(
    '/files',
    express.static(path.resolve(__dirname, '..', 'tmp'))
)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof Error) {
      
        console.error(err);
        
        return res.status(400).json({
            error: err.message
        })
    }


    console.error(err);

    return res.status(500).json({
        status: 'error',
        message: 'Internal server error.'
    })
})

app.listen(3333, () => console.log("Servidor online na porta 3333!"))