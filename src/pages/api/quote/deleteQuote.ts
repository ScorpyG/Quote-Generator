import clientPromise from '@/lib/mongodbClient';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);

    const quoteId = req.body.quoteId;

    const result = await db.collection('quotes').deleteOne({ _id: new ObjectId(quoteId) });

    res.status(200).json({ result, message: 'Quote deleted successfully.' });
  } catch (error) {
    res.status(500).json({
      error,
      message: 'Unable to delete your quote.',
    });
  }
}

export default handler;
