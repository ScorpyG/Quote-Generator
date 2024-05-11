import clientPromise from '@/lib/mongodbClient';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const { quote, author, tags } = req.body;

    const quoteId = req.body.quoteId;

    const result = await db.collection('quotes').updateOne(
      { _id: new ObjectId(quoteId) },
      {
        $set: {
          quote: quote,
          author: author,
          tags: tags,
        },
      }
    );

    return res.status(200).json({ result, message: 'Quote updated successfully.' });
  } catch (error) {
    return res.status(500).json({
      error,
      message: 'Unable to update your quote.',
    });
  }
}

export default handler;
