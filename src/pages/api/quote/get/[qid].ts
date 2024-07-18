import dbConnect from '@/lib/dbConnect';
import Quote from '@/models/Quote';
import { AuthUser } from '@/types/auth';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  const token = request.headers.authorization?.split(' ')[1];
  if (!token) {
    return response.status(401).json({
      message: 'Unauthorized.',
      success: false,
    });
  }

  try {
    const quoteId = request.query.qid;
    const user = (await jwt.verify(token, process.env.JWT_SECRET!)) as AuthUser;
    const quote = await Quote.findById(quoteId);

    if (user.id !== quote.userId.toString()) {
      return response.status(401).json({
        message: 'Unauthorized.',
        success: false,
      });
    } else {
      return response.status(200).json({
        data: quote,
        message: 'Quote retrieved successfully.',
        success: true,
      });
    }
  } catch (error) {
    return response.status(500).json({
      message: 'Unable to retrieve the quote.',
      success: false,
    });
  }
}

export default handler;
