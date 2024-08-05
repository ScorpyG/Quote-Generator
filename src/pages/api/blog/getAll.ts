import dbConnect from '@/lib/dbConnect';
import Blog from '@/models/Blog';
import User from '@/models/User';
import { NextApiRequest, NextApiResponse } from 'next';

async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  try {
    const {
      query: { tag },
    } = request;

    /**
     * .populate() required existence of the ref model in the same CONNECTION.
     *
     * Explanation - https://stackoverflow.com/questions/26818071/mongoose-schema-hasnt-been-registered-for-model
     * Docs - https://mongoosejs.com/docs/populate.html#cross-db-populate
     **/
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
      .populate('userId', 'username -_id', User)
      .exec();

    return response.status(200).json({
      data: postsWithRelatedTag,
      message: 'Blog posts retrieved successfully.',
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: `Unable retrieve data. ${error}`,
      success: false,
    });
  }
}

export default handler;
