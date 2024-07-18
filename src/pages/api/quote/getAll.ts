import dbConnect from '@/lib/dbConnect';
import Quote from '@/models/Quote';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  try {
    const {
      query: { tag },
    } = request;

    const quotes = await Quote.find(
      tag
        ? {
            tags: {
              $elemMatch: {
                $regex: new RegExp(tag as string, 'i'), // Casting here is fine
              },
            },
          }
        : {}
    );

    return response.status(200).json({
      data: quotes,
      message: 'Quotes retrieved successfully.',
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: 'Unable retrieve data.',
      success: false,
    });
  }
}

export default handler;
