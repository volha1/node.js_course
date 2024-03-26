import express from 'express';
import { Request, Response } from 'express';
import { getProducts, getProduct } from '../controller/product.controller';
import { authenticateUser } from '../controller/user.controller';

const router = express.Router();
router.use(authenticateUser);
router.get('/', (req: Request, res: Response) => {
  getProducts(req, res);
});

router.get('/:id', (req: Request, res: Response) => {
  getProduct(req, res);
});

export default router;
