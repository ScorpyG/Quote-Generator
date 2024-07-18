import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { AuthUser } from '@/types/auth';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  const JWT_SECRET = process.env.JWT_SECRET!;

  if (!JWT_SECRET) {
    return response.status(501).json({
      message: 'JWT_SECRET is undefined',
      success: false,
    });
  }

  try {
    const { email, password } = request.body;
    const user = await User.findOne({ email });

    if (!user) {
      return response.status(200).json({
        message: 'User not found',
        success: false,
      });
    } else {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return response.status(203).json({
          message: 'Invalid Credentials',
          success: false,
        });
      } else {
        const jwtTokenData: AuthUser = {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImgUrl: user.profileImgUrl,
        };
        const token = await jwt.sign(jwtTokenData, JWT_SECRET, {
          expiresIn: '1d',
          algorithm: 'HS512',
        });

        const cookie = serialize('token', token, {
          httpOnly: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24, // 1 day
          path: '/',
        });
        response.setHeader('Set-Cookie', cookie);
        return response.status(200).json({
          message: 'Signed in successfully',
          success: true,
        });
      }
    }
  } catch (error) {
    return response.status(503).json({
      error,
      message: 'Service Unavailable.',
      success: false,
    });
  }
}
