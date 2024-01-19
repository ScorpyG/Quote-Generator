import User from '@/models/User';
import connect from '@/utils/db';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { email, password, firstName, lastName } = await req.body;

  await connect();

  const userExist = await User.findOne({ email });

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

    await newUser.save();
    return res.status(201).json({ message: 'Account registered successfully!' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return res.status(500).json({ message: error });
  }
}
