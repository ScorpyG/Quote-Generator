import mongoose from 'mongoose';

export interface TUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
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
