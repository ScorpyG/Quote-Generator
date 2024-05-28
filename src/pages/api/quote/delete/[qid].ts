import dbConnect from '@/lib/dbConnect';
import Quote from '@/models/Quote';
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
    const quote = await Quote.findById(quoteId);

    if (!quote) {
      return response.status(200).json({
        message: 'Quote not found.',
        success: false,
      });
    } else {
      await Quote.findByIdAndDelete(quoteId);

      return response.status(202).json({
        message: 'Quote deleted successfully.',
        success: true,
      });
    }
  } catch (error) {
    return response.status(500).json({
      error,
      message: 'Unable to delete the quote.',
      success: false,
    });
  }
}

export default handler;
