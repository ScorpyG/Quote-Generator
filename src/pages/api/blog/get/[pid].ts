import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
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
    const blogPostId = request.query.pid;
    const user = (await jwt.verify(token, process.env.JWT_SECRET!)) as AuthUser;
    const blogPost = await Blog.findById(blogPostId);

    if (user.id !== blogPost.userId.toString()) {
      return response.status(401).json({
        message: 'Unauthorized.',
        success: false,
      });
    } else {
      return response.status(200).json({
        data: blogPost,
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
