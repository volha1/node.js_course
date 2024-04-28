import Joi from 'joi';
import { productSchema } from './product.schema';

export const cartSchema = Joi.object({
  id: Joi.string().required(),
  email: Joi.string().email().required(),
  isDeleted: Joi.boolean().required(),
  items: Joi.array()
    .items(
      Joi.object({
        product: productSchema,
        count: Joi.number().required(),
      })
    )
    .required(),
});
