import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import User from '@/models/User';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  try {
    const username = request.query.username;
    const user = await User.findOne({ username });

    if (!user) {
      return response.status(204).json({
        message: 'User not found.',
        success: false,
      });
    } else {
      const posts = await Blog.find({ userId: user._id }).populate('userId', 'username -_id').exec();

      return response.status(200).json({
        data: posts,
        message: 'Blog post retrieved successfully.',
        success: true,
      });
    }
  } catch (error) {
    return response.status(500).json({
      error,
      message: 'Unable to retrieve the blog post.',
      success: false,
    });
  }
}

export default handler;
