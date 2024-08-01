import { QuoteProps } from '@/components/QuoteContainer/QuoteContainer';
import Blog from '@/models/Blog';
import Quote from '@/models/Quote';
import User from '@/models/User';
import { AuthUser } from '@/types/auth';
import { BlogData } from '@/types/blog';
import dbConnect from '../lib/dbConnect';

export async function getAllQuotes(): Promise<QuoteProps[]> {
  await dbConnect();
  const quotes = await Quote.find({});

  return quotes;
}

export async function getQuoteById(quoteId: string): Promise<QuoteProps> {
  await dbConnect();
  const quote = await Quote.findById(quoteId);

  return quote;
}

export async function updateProfilePic(userId: string, profileImgUrl: string): Promise<AuthUser> {
  await dbConnect();
  const updatedUser = await User.findByIdAndUpdate({ _id: userId }, { profileImgUrl: profileImgUrl }, { new: true });

  return updatedUser;
}

export async function getAllPosts(): Promise<BlogData[]> {
  await dbConnect();
  const posts = await Blog.find({});

  return posts;
}

export async function getBlogPostById(postId: string): Promise<BlogData> {
  await dbConnect();
  const post = await Blog.findById(postId);

  return post;
}
