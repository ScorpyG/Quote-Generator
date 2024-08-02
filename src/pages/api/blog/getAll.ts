import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  try {
    const {
      query: { tag },
    } = request;

    const postsWithRelatedTag = await Blog.find(
      tag
        ? {
            tags: {
              $elemMatch: {
                $regex: new RegExp(tag as string, 'i'),
              },
            },
          }
        : {}
    )
      .populate('userId', 'username -_id')
      .exec();

    return response.status(200).json({
      data: postsWithRelatedTag,
      message: 'Blog posts retrieved successfully.',
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: 'Unable retrieve data.',
      success: false,
    });
  }
}

export default handler;
