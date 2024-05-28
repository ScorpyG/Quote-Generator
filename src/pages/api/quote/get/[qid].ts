import Quote from '@/models/Quote';
import dbConnect from '@/utils/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  try {
    const quoteId = request.query.qid;
    const quote = await Quote.findById(quoteId);

    if (!quote) {
      return response.status(204).json({
        message: 'Quote not found.',
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
      error,
      message: 'Unable to retrieve the quote.',
      success: false,
    });
  }
}

export default handler;
