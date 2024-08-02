import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import { AuthUser } from '@/types/auth';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
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
    const blogData = request.body;
    const user = (await jwt.verify(token, process.env.JWT_SECRET!)) as AuthUser;
    const newBlog = new Blog({
      ...blogData,
      userId: new mongoose.Types.ObjectId(user.id),
    });
    const savedBlog = await newBlog.save();

    return response.status(201).json({
      data: savedBlog,
      message: 'Blog post created successfully.',
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: 'Service not available, unable to create blog post.',
      success: false,
    });
  }
}

export default handler;
