import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import { AuthUser } from '@/types/auth';
import env from '@/utils/env';
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
    const user = (await jwt.verify(token, env.JWT_SECRET!)) as AuthUser;
    const blogPost = await Blog.findById(blogPostId);

    // VERIFY ONLY THE USER WHO CREATED THE BLOG POST CAN DELETE IT
    if (!blogPost) {
      return response.status(200).json({
        message: 'Blog post not found.',
        success: false,
      });
    } else if (user.id !== blogPost.userId.toString()) {
      return response.status(401).json({
        message: 'Unauthorized.',
        success: false,
      });
    } else {
      await Blog.findByIdAndDelete(blogPostId);

      return response.status(202).json({
        message: 'Blog post deleted successfully.',
        success: true,
      });
    }
  } catch (error) {
    return response.status(500).json({
      error,
      message: 'Unable to delete the blog post.',
      success: false,
    });
  }
}

export default handler;
