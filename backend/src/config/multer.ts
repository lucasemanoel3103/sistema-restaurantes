import crypto from 'crypto';
import multer from 'multer';

import { extname, resolve, dirname } from 'path'; // 1. Adicionado 'dirname'
import { fileURLToPath } from 'url'; // 2. Adicionado import de 'url'

// --- Correção para __dirname em ES Modules ---
const __filename = fileURLToPath(new URL(import.meta.url)); // 3. Pega o caminho do arquivo
const __dirname = dirname(__filename); // 4. Pega o diretório do arquivo

export default {
  upload(folder: string) {
    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, '..', '..', folder), // Agora '__dirname' existe e funciona
        filename: (request, file, callback) => {
          const fileHash = crypto.randomBytes(16).toString('hex');
          const filename = `${fileHash}-${file.originalname}`;

          return callback(null, filename);
        },
      }),
    };
  },
};