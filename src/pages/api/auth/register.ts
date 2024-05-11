import clientPromise from '@/lib/mongodbClient';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB_NAME);
    const { email, password, firstName, lastName } = req.body;

    const userExist = await db.collection('users').findOne({ email });

    if (userExist) {
      return res.status(203).json({ message: 'Email is already in use' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await db.collection('users').insertOne({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return res.status(201).json({ newUser, message: 'Account registered successfully!' });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Service is temporarily unavailable. Please try again later.',
    });
  }
}

export default handler;
