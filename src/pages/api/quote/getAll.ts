import dbConnect from '@/lib/dbConnect';
import Quote from '@/models/Quote';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const quotes = await Quote.find({});

    return res.status(200).json({
      data: quotes,
      message: 'Quotes retrieved successfully.',
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Unable retrieve data.',
      success: false,
    });
  }
}

export default handler;
