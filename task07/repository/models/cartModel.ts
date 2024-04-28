import mongoose, { Schema, Document, Types } from 'mongoose';
import { ProductEntity } from '../entity/product.entity';
import { ProductSchema } from './productModel';

interface ICart extends Document {
  userId: string;
  isDeleted: boolean;
  items: [
    {
      product: ProductEntity;
      count: number;
    },
  ];
}

const CartSchema: Schema = new Schema({
  userId: {
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
