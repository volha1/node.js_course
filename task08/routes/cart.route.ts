import express from 'express';
import {
  getCartByUserId,
  removeCart,
  updateCart,
} from '../controller/cart.controller';
import { createOrder } from '../controller/order.controller';

const router = express.Router();

router
  .route('/')
  .get(getCartByUserId)
  .delete(removeCart)
  .post(createOrder)
  .put(updateCart);

export default router;
