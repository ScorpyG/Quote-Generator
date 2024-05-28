import Quote from '@/models/Quote';
import dbConnect from '@/utils/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  try {
    const quoteId = request.query.qid;
    const quote = await Quote.findById(quoteId);

    return response.status(200).json({
      data: quote,
      message: 'Quote retrieved successfully.',
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: 'Unable to retrieve the quote.',
      success: false,
    });
  }
}

export default handler;
