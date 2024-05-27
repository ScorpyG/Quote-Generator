import Quote from '@/models/Quote';
import { AuthUser } from '@/types/auth';
import dbConnect from '@/utils/dbConnect';
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
    const user = (await jwt.verify(token, process.env.JWT_SECRET!)) as AuthUser;
    const quotes = await Quote.find({ userId: new mongoose.Types.ObjectId(user.id) });

    if (!quotes) {
      return response.status(204).json({
        message: 'No quotes found.',
      });
    } else {
      return response.status(200).json({
        data: quotes,
        message: 'User quotes retrieved successfully.',
      });
    }
  } catch (error) {
    return response.status(500).json({
      error,
      message: 'Service unavailable. Unable to retrieve user quotes.',
    });
  }
}

export default handler;
