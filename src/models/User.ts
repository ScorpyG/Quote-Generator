import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, 'Must provide a unique email'],
      required: [true, 'Must provide an email'],
    },
    password: {
      type: String,
      required: [true, 'Must provide an password'],
      select: false,
    },
    firstName: {
      type: String,
      required: [true, 'Must provide a first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Must provide a last name'],
    },
  },
  {
    timestamps: true,
  }
);

export interface User {
  email: string;
  firstName: string;
  lastName: string;
}

export default mongoose.models.User || mongoose.model('User', userSchema);
