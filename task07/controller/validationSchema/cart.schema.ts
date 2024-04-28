import Joi from 'joi';
import { productSchema } from './product.schema';

export const cartSchema = Joi.object({
  id: Joi.string().required(),
  userId: Joi.string().required(),
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
