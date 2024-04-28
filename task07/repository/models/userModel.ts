import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  login: string;
}

export const UserSchema: Schema = new Schema({
  id: String,
  login: {
    type: String,
    required: true,
    unique: true,
  },
});

export default mongoose.model<IUser>('User', UserSchema);
