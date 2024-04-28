import express from 'express';
import { authenticateUserMiddleware } from '../auth/middlewares';
import productRouter from './product.route';
import cartRouter from './cart.route';

const router = express.Router();

router.use(authenticateUserMiddleware);
router.use('/products', productRouter);
router.use('/profile/cart', cartRouter);
export default router;
