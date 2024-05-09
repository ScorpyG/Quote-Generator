import clientPromise from '@/lib/mongodbClient';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const results = await db.collection('quotes').find({}).toArray();

    res.status(200).json({ results });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Unable to generate demo data.',
    });
  }
}

export default handler;
