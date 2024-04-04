import mongoose, { Schema, Document } from 'mongoose';
import { ProductEntity } from '../entity/product.entity';
import { ProductSchema } from './productModel';

type ORDER_STATUS = 'created' | 'completed';

interface IOrder extends Document {
  userId: string;
  cartId: string;
  items: [
    {
      product: ProductEntity;
      count: number;
    },
  ];
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

const OrderSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  cartId: {
    type: String,
    required: true,
    unique: true,
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
  payment: {
    type: {
      type: String,
    },
    address: String,
    creditCard: String,
  },
  delivery: {
    type: {
      type: String,
    },
    address: String,
  },
  comments: String,
  status: {
    type: String,
    enum: ['created', 'completed'],
    default: 'created',
  },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
