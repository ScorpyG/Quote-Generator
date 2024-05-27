import { serialize } from 'cookie';
import { NextApiRequest, NextApiResponse } from 'next';

function handler(request: NextApiRequest, response: NextApiResponse) {
  try {
    const cookie = serialize('token', '', {
      httpOnly: true,
      // sameSite: 'strict',
      // secure: process.env.NODE_ENV === 'production',
      maxAge: -1,
      expires: new Date(0),
      path: '/',
    });

    response.setHeader('Set-Cookie', cookie);
    return response.status(200).json({
      message: 'Signed out successfully',
      success: true,
    });
  } catch (error) {
    return response.status(503).json({
      error,
      message: 'Service Unavailable.',
      success: false,
    });
  }
}

export default handler;
