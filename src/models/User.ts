import mongoose, { Document } from 'mongoose';

export interface TUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImgUrl?: string;
  verifyToken?: string;
  verifyTokenExpires?: Date;
}

const userSchema = new mongoose.Schema<TUser>(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImgUrl: {
      type: String,
    },
    verifyToken: String,
    verifyTokenExpires: Date,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema, 'users');

export default User;
