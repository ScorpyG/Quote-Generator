import clientPromise from '@/lib/mongodbClient';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

// TODO: add authentication to this API endpoint
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const quoteId = req.query.quoteId as string;

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const result = await db.collection('quotes').findOne({ _id: new ObjectId(quoteId) });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      error,
      message: 'Unable to retrieve the quote.',
    });
  }
}

export default handler;
