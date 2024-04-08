import { Request, Response } from 'express';
import { fetchProducts, fetchProduct } from '../service/product.service';
import { AppError } from '../errors/appError';
import { HttpStatusCode } from '../errors/statusCode';

export const getProducts = (req: Request, res: Response) => {
  const products = fetchProducts();
  res.send({ data: products, error: null });
};

export const getProduct = (req: Request, res: Response) => {
  const product = fetchProduct(req.params.id);

  if (!product) {
    throw new AppError(
      HttpStatusCode.NOT_FOUND,
      'No product with such id',
      true
    );
  }
  res.send({ data: product, error: null });
};
