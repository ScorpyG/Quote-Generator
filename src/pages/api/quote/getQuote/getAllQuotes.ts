import clientPromise from '@/lib/mongodbClient';
import { NextApiRequest, NextApiResponse } from 'next';

// No authentication required for this API endpoint
async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const results = await db.collection('quotes').find({}).toArray();

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({
      error,
      message: 'Unable retrieve data.',
    });
  }
}

export default handler;
