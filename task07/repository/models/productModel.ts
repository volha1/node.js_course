import mongoose, { Schema, Document, Query } from 'mongoose';

interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
}

export const ProductSchema: Schema = new Schema({
  id: String,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

ProductSchema.pre<Query<IProduct, IProduct>>(/^find/, function (next) {
  this.select('-__v');
  next();
});

export default mongoose.model<IProduct>('Product', ProductSchema);
