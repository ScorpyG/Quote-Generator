import clientPromise from '@/lib/mongodbClient';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, firstName, lastName } = await req.body;

  // ! Not sure y this isn't working
  await clientPromise;

  const userExist = await User.findOne({ email: email });

  if (userExist) {
    return res.status(400).json({ message: 'Email is already in use' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    await newUser
      .save()
      .then(() => {
        res.status(201).json({ message: 'Account registered successfully!' });
      })
      .catch((error: string) => {
        res.status(503).json({ message: error });
      });
  } catch (error) {
    res.status(500).json({ message: error });
  }
}
