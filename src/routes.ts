import { Router } from 'express';

import { CreateUserController } from './controllers/user/createUserController.js';
import { AuthUserController } from './controllers/user/AuthUserController.js';

const router = Router();

router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)

export {router};