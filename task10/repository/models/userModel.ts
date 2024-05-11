import mongoose, { Schema, Document } from 'mongoose';

type ROLE = 'admin' | 'user';

interface IUser extends Document {
  email: string;
  password: string;
  role: ROLE;
}

export const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

export default mongoose.model<IUser>('User', UserSchema);
