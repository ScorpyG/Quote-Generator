import Quote from '@/models/Quote';
import dbConnect from '@/utils/dbConnect';
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
    const quoteId = request.query.qid;
    const quote = await Quote.findById(quoteId);

    if (!quote) {
      return response.status(204).json({ message: 'Quote not found.' });
    } else {
      return response.status(200).json({
        data: quote,
        message: 'Quote retrieved successfully.',
      });
    }
  } catch (error) {
    return response.status(500).json({
      error,
      message: 'Unable to retrieve the quote.',
    });
  }
}

export default handler;
