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

//-- Order --//
import { CreateOrderController } from './controllers/order/CreateOrderController.js';
import { RemoveOrderController } from './controllers/order/RemoveOrderController.js';
import { SendOrderController } from './controllers/order/SendOrderController.js';
import { ListOrdersController } from './controllers/order/ListOrdersController.js';

//-- Item --//
import { AddItemController } from './controllers/order/AddItemController.js';
import { RemoveItemController } from './controllers/order/RemoveItemController.js';

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

//-- Orders routes --//
router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)
router.get('/orders', isAuthenticated, new ListOrdersController().handle)

//--Itens routes --//
router.post('/order/add', isAuthenticated, new AddItemController().handle)
router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)

export {router};