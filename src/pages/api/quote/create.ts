import dbConnect from '@/lib/dbConnect';
import Quote from '@/models/Quote';
import { AuthUser } from '@/types/auth';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse } from 'next/types';

async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  const token = request.headers.authorization?.split(' ')[1];
  if (!token) {
    return response.status(401).json({
      message: 'Unauthorized.',
    });
  }

  try {
    const quoteData = request.body;
    const user = (await jwt.verify(token, process.env.JWT_SECRET!)) as AuthUser;
    const newQuote = new Quote({
      ...quoteData,
      userId: new mongoose.Types.ObjectId(user.id),
    });
    const savedQuote = await newQuote.save();

    return response.status(201).json({
      data: savedQuote,
      message: 'Quote created successfully.',
      success: true,
    });
  } catch (error) {
    response.status(500).json({
      message: 'Service not available, unable to create quote.',
      success: false,
    });
  }
}

export default handler;
