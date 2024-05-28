import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import { AuthUser } from '@/types/auth';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  const token = request.headers.authorization?.split(' ')[1];
  if (!token) {
    return response.status(401).json({
      message: 'Unauthorized.',
      success: false,
    });
  }

  try {
    const user = (await jwt.verify(token, process.env.JWT_SECRET!)) as AuthUser;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const userDataFromDB = await User.findById(user.id).select('-password'); // User data from DB excluding password

    return response.status(200).json({
      data: user,
      message: 'User retrieved successfully.',
      success: true,
    });
  } catch (error) {
    return response.status(503).json({
      error,
      message: 'Unable to retrieve user info.',
      success: false,
    });
  }
}
export default handler;
