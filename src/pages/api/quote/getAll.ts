import Quote from '@/models/Quote';
import dbConnect from '@/utils/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const quotes = await Quote.find({});

    if (quotes.length < 1) {
      return res.status(204).json({
        message: 'No quotes found.',
      });
    } else {
      return res.status(200).json({
        data: quotes,
        message: 'Quotes retrieved successfully.',
      });
    }
  } catch (error) {
    return res.status(500).json({
      error,
      message: 'Unable retrieve data.',
    });
  }
}

export default handler;
