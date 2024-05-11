import clientPromise from '@/lib/mongodbClient';
import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: authenticate this api endpoint
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB_NAME);
      // TODO: retrieve user quotes based on current user's session from the database
      const results = await db.collection('quotes').find({}).toArray();

      return res.status(200).json({ results });
    } catch (error) {
      return res.status(500).json({
        error,
        message: 'Service unavailable. Unable to retrieve user quotes.',
      });
    }
  } else {
    return res.status(401).json({ message: 'Unauthorized.' });
  }
}

export default handler;
