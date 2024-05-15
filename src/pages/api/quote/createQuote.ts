import clientPromise from '@/lib/mongodbClient';
import { NextApiRequest, NextApiResponse } from 'next/types';

// TODO: add authentication to this API endpoint
async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    // The data comes from the request body is ONLY validated by the client-side form validation.
    const quoteData = req.body;

    const result = await db.collection('quotes').insertOne({
      ...quoteData,
      createdAt: new Date(),
    });

    return res.status(201).json({ result, message: 'Quote created successfully.' });
  } catch (error) {
    return res.status(500).json({
      error,
      message: 'Unable to create your quote.',
    });
  }
}

export default handler;
