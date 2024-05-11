import express from 'express';
import {
  getCartByUser,
  removeCart,
  updateCart,
} from '../controller/cart.controller';
import { createOrder } from '../controller/order.controller';
import { isAdminMiddleware } from '../auth/middlewares';

const router = express.Router();

router
  .route('/')
  .get(getCartByUser)
  .delete(isAdminMiddleware, removeCart)
  .post(createOrder)
  .put(updateCart);

export default router;
