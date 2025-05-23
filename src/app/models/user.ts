import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password?: string;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);