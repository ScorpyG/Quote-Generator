import User from '@/models/User';
import { AuthUser } from '@/types/auth';
import dbConnect from '@/utils/dbConnect';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  const token = request.headers.authorization?.split(' ')[1];
  if (!token) {
    return response.status(401).json({
      message: 'Unauthorized.',
    });
  }

  try {
    const newUserData = request.body;
    const user = (await jwt.verify(token, process.env.JWT_SECRET!)) as AuthUser;
    const updatedUserData = await User.findByIdAndUpdate({ _id: user.id }, { ...newUserData }, { new: true });

    return response.status(200).json({
      data: updatedUserData,
      message: 'Profile updated successfully.',
    });
  } catch (error) {
    return response.status(500).json({
      error,
      message: 'Unable to update profile.',
    });
  }
}
