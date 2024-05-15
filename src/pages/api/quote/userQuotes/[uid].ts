import clientPromise from '@/lib/mongodbClient';
import { ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../auth/[...nextauth]';

// TODO: add authentication to this API endpoint
async function handler(req: NextApiRequest, res: NextApiResponse) {
  //   const session = await getServerSession(req, res, authOptions);
  const userId = req.query.uid as string;

  if (userId) {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB_NAME);
      const results = await db
        .collection('quotes')
        .find({
          userId: new ObjectId(userId),
        })
        .toArray();

      return res.status(200).json(results);
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
