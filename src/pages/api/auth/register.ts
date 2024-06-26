import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  try {
    const { email, firstName, lastName, password } = request.body;
    const user = await User.findOne({ email });

    if (user) {
      return response.status(400).json({
        message: 'User already exists',
        success: false,
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User({
        email,
        firstName,
        lastName,
        password: hashedPassword,
      });
      await newUser.save();

      return response.status(201).json({
        message: 'User created successfully',
        success: true,
      });
    }
  } catch (error) {
    return response.status(503).json({
      error,
      message: 'Service Unavailable.',
      success: false,
    });
  }
}
