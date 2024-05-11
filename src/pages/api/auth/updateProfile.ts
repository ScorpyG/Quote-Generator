import clientPromise from '@/lib/mongodbClient';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const { firstName, lastName, userId } = req.body;

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          firstName,
          lastName,
        },
      }
    );

    return res.status(201).json({ result, message: 'Profile updated successfully.' });
  } catch (error) {
    return res.status(500).json({ error, message: 'Unable to update your profile.' });
  }
}

export default handler;
