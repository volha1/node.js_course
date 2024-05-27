import mongoose, { Schema, Document } from 'mongoose';
import { ProductEntity } from '../../entity/product.entity';
import { ProductSchema } from './productModel';

interface ICart extends Document {
  email: string;
  isDeleted: boolean;
  items: [
    {
      product: ProductEntity;
      count: number;
    },
  ];
}

const CartSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  items: [
    {
      product: ProductSchema,
      count: {
        type: Number,
        required: true,
      },
    },
  ],
});

export default mongoose.model<ICart>('Cart', CartSchema);
