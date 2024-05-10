import Joi from 'joi';
import { productSchema } from './product.schema';

export const orderSchema = Joi.object({
  userId: Joi.string().required(),
  cartId: Joi.string().required(),
  items: Joi.array().items(
    Joi.object({
      product: productSchema,
      count: Joi.number().required(),
    })
  ),
  payment: Joi.object({
    type: Joi.string().required(),
    address: Joi.string(),
    creditCard: Joi.string(),
  }).required(),
  delivery: Joi.object({
    type: Joi.string().required(),
    address: Joi.string().required(),
  }).required(),
  comments: Joi.string().required(),
  status: Joi.string().required(),
  total: Joi.number().required(),
});
