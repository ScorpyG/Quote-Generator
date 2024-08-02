import mongoose, { Document } from 'mongoose';

export interface TUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  profileImgUrl?: string;
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
    username: {
      type: String,
      required: true,
      unique: true,
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
