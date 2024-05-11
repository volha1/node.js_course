import express from 'express';
import productRouter from './product.route';
import cartRouter from './cart.route';
import authRouter from './auth.route';
import { verifyTokenMiddleware } from '../auth/middlewares';
import { excludeFromTokenCheck } from './utils';

const router = express.Router();

router.use(excludeFromTokenCheck('/auth', verifyTokenMiddleware));
router.use('/auth', authRouter);
router.use('/products', productRouter);
router.use('/profile/cart', cartRouter);

export default router;
