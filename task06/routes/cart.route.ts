import express from 'express';
import { Request, Response } from 'express';
import {
  getCartByUserId,
  removeCart,
  updateCart,
} from '../controller/cart.controller';
import { createOrder } from '../controller/order.controller';
import { authenticateUser } from '../controller/user.controller';

const router = express.Router();
router.use(authenticateUser);

router
  .route('/')
  .get((req: Request, res: Response) => {
    getCartByUserId(req, res);
  })
  .delete((req: Request, res: Response) => {
    removeCart(req, res);
  })
  .post((req: Request, res: Response) => {
    createOrder(req, res);
  })
  .put((req: Request, res: Response) => {
    updateCart(req, res);
  });

export default router;
