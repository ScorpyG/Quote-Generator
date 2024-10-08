import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import { AuthUser } from '@/types/auth';
import env from '@/utils/env';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  const token = request.headers.authorization?.split(' ')[1];
  if (!token) {
    return response.status(401).json({
      message: 'Unauthorized.',
    });
  }

  try {
    const user = (await jwt.verify(token, env.JWT_SECRET!)) as AuthUser;
    const posts = await Blog.find({ userId: new mongoose.Types.ObjectId(user.id) });

    return response.status(200).json({
      data: posts,
      message: 'User posts retrieved successfully.',
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: 'Unable to retrieve user posts.',
      success: false,
    });
  }
}

export default handler;
