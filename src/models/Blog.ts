import mongoose from 'mongoose';

export interface TBlog extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  title: string;
  author: string;
  contents: string[];
  imageUrl?: string;
  tags?: string[];
}

const BlogSchema = new mongoose.Schema<TBlog>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    contents: {
      type: [String],
      required: true,
    },
    imageUrl: {
      type: String,
    },
    tags: [String],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Blog = mongoose.models.Blog || mongoose.model('Blog', BlogSchema, 'blogs');

export default Blog;
