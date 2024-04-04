import { Request, Response, NextFunction } from 'express';
import { fetchProducts, fetchProduct } from '../service/product.service';
import { AppError } from '../error/appError';
import { HttpStatusCode } from '../error/statusCode';
import catchAsync from '../error/catchAsync';

export const getProducts = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const products = await fetchProducts();
    res.send({ data: products, error: null });
  }
);

export const getProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await fetchProduct(req.params.id);

    if (!product) {
      return next(
        new AppError('No product with such id', HttpStatusCode.NOT_FOUND)
      );
    }
    res.send({ data: product, error: null });
  }
);
