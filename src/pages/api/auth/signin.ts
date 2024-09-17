import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { AuthUser, MinUserData } from '@/types/auth';
import env from '@/utils/env';
import bcrypt from 'bcryptjs';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

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
          username: user.username,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImgUrl: user.profileImgUrl,
        };

        const userData: MinUserData = {
          firstName: user.firstName,
          lastName: user.lastName,
          profileImgUrl: user.profileImgUrl,
        };

        const token = await jwt.sign(jwtTokenData, env.JWT_SECRET, {
          expiresIn: '1d',
          algorithm: 'HS512',
        });

        // TODO: Encrypt user data using a different method instead of using JWT??
        const userToken = await jwt.sign(userData, env.SECRET_KEY, {
          expiresIn: '1d',
        });

        const jwtCookie = serialize('token', token, {
          httpOnly: true,
          sameSite: 'strict',
          secure: env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24, // 1 day
          path: '/',
        });

        const userCookie = serialize('user', userToken, {
          httpOnly: false,
          sameSite: 'strict',
          secure: env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24, // 1 day
          path: '/',
        });

        response.setHeader('Set-Cookie', [jwtCookie, userCookie]);
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
