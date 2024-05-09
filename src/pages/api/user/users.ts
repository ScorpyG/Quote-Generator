import clientPromise from '@/lib/mongodbClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function getUsers(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const users = await db.collection('users').find({}).toArray();

    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: 'Unable to GET users.' });
  }
}
