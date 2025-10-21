import { Router } from 'express';

//-- User --//
import { CreateUserController } from './controllers/user/CreateUserController.js';
import { AuthUserController } from './controllers/user/AuthUserController.js';
import { DetailUserController } from './controllers/user/DetailUserController.js';

//-- Category --//
import { CreateCategoryController } from './controllers/category/CreateCategoryController.js';

import { isAuthenticated } from './middleware/isAuthenticated.js';

const router = Router();

//-- Users routes --//
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/detail', isAuthenticated, new DetailUserController().handle)

//-- Categories routes --//
router.post('/create', isAuthenticated, new CreateCategoryController().handle)


export {router};