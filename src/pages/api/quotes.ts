import clientPromise from '@/lib/mongodbClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getQuotes(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const quotes = await db.collection('quotes').find({}).toArray();

    res.status(200).json({ quotes });
  } catch (error) {
    res.status(500).json({ message: 'Unable to generate demo data.' });
  }
}
