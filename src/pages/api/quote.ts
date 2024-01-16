import clientPromise from '@/lib/mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('quotes');

    // Quote DB name...
    const quotes = await db.collection('demo_quotes').find().toArray();

    res.json(quotes);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
  }
}
