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
    const blogPostData = request.body;
    const user = (await jwt.verify(token, process.env.JWT_SECRET!)) as AuthUser;
    const existBlogPost = await Blog.findById(blogPostId);

    // VERIFY ONLY THE USER WHO CREATED THE BLOG POST CAN UPDATE IT
    if (user.id !== existBlogPost.userId.toString()) {
      return response.status(401).json({
        message: 'Unauthorized.',
        success: false,
      });
    } else {
      const updatedBlogPost = await Blog.findByIdAndUpdate({ _id: blogPostId }, { ...blogPostData }, { new: true });

      return response.status(200).json({
        data: updatedBlogPost,
        message: 'Blog post updated successfully.',
        success: true,
      });
    }
  } catch (error) {
    return response.status(500).json({
      error,
      message: 'Unable to update your blog post.',
      success: false,
    });
  }
}

export default handler;
