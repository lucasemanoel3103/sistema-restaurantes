import { Router } from 'express';
import multer from 'multer';

//-- User --//
import { CreateUserController } from './controllers/user/CreateUserController.js';
import { AuthUserController } from './controllers/user/AuthUserController.js';
import { DetailUserController } from './controllers/user/DetailUserController.js';

//-- Category --//
import { CreateCategoryController } from './controllers/category/CreateCategoryController.js';
import { ListCategoryController } from './controllers/category/ListCategoryController.js';

//-- Product --//
import { CreateProductController } from './controllers/product/CreateProductController.js';
import { ListByCategoryController } from './controllers/product/ListByCategoryController.js';

// Middleware
import { isAuthenticated } from './middleware/isAuthenticated.js';

// Multer
import uploadConfig from './config/multer.js'

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));

//-- Users routes --//
router.post('/users', new CreateUserController().handle)
router.post('/session', new AuthUserController().handle)
router.get('/detail', isAuthenticated, new DetailUserController().handle)

//-- Categories routes --//
router.post('/create', isAuthenticated, new CreateCategoryController().handle)
router.get('/show', isAuthenticated, new ListCategoryController().handle)

//-- Products routes --//
router.post('/product', isAuthenticated, upload.single('file'),new CreateProductController().handle)
router.get('/category/product', isAuthenticated, new ListByCategoryController().handle)

export {router};