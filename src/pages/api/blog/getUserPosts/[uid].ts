import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  try {
    const userId = request.query.uid;
    const userPosts = await Blog.find({ userId });

    return response.status(200).json({
      data: userPosts,
      message: 'User posts retrieved successfully.',
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: 'Unable to retrieve user posts.',
      success: false,
    });
  }
}

export default handler;
