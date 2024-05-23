import dbConnect from '@/utils/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
// import jwt from 'jsonwebtoken';

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  await dbConnect();

  try {
    // TODO: verify the JWT token and update the user's information
  } catch (error) {
    response.status(500).json({ error });
  }
}
