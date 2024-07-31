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
      /**
       * By standard we should return Client error codes (400-499)
       * https://developer.mozilla.org/en-US/docs/Web/HTTP/Status#server_error_responses
       *
       * 403 - Forbidden
       * 404 - Not Found
       * 409 - Conflict
       * ...
       *
       * But client error codes would trigger exception in the client side --> Error screen
       */
      return response.status(200).json({
        message: 'Email is taken. Please use another email',
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
