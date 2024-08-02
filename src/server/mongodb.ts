import Blog from '@/models/Blog';
import User from '@/models/User';
import { AuthUser, BasicUser } from '@/types/auth';
import { BlogData } from '@/types/blog';
import dbConnect from '../lib/dbConnect';

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

export async function getAllUsers(): Promise<BasicUser[]> {
  await dbConnect();
  const users = await User.find({}).select(['-password', '-email', '-profileImgUrl']);

  return users;
}

export async function getAllPostsByUser(userId: string): Promise<BlogData[]> {
  await dbConnect();
  const posts = await Blog.find({ userId });

  return posts;
}
