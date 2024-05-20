import clientPromise from '@/lib/mongodbClient';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

// TODO: add authentication to this API endpoint
async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const { firstName, lastName } = req.body;

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId('65a9cd85fa2c4b5fd6214d42') }, // TODO: update the hardcoded id to use the session user id
      {
        $set: {
          firstName,
          lastName,
          updatedAt: new Date(),
        },
      }
    );

    return res.status(201).json({ result, message: 'Profile updated successfully.' });
  } catch (error) {
    return res.status(500).json({ error, message: 'Unable to update your profile.' });
  }
}

export default handler;
