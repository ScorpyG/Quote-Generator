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
    const quoteData = request.body;
    const user = (await jwt.verify(token, process.env.JWT_SECRET!)) as AuthUser;
    const quote = await Quote.findById(quoteId);

    // VERIFY ONLY THE USER WHO CREATED THE QUOTE CAN UPDATE IT
    if (user.id !== quote.userId.toString()) {
      return response.status(401).json({
        message: 'Unauthorized.',
        success: false,
      });
    } else {
      const updatedQuote = await Quote.findByIdAndUpdate({ _id: quoteId }, { ...quoteData }, { new: true });

      return response.status(201).json({
        data: updatedQuote,
        message: 'Quote updated successfully.',
        success: true,
      });
    }
  } catch (error) {
    return response.status(500).json({
      error,
      message: 'Unable to update your quote.',
      success: false,
    });
  }
}

export default handler;
