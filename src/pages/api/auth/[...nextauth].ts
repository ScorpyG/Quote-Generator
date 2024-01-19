// import clientPromise from '@/lib/mongodbClient';
import User from '@/models/User';
import connect from '@/utils/db';
// import { MongoDBAdapter } from '@auth/mongodb-adapter';
import bcrypt from 'bcryptjs';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// TODO: refactor the authentication approach
export const authOptions: NextAuthOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  pages: {},
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async authorize(credentials: any) {
        await connect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordMatched = await bcrypt.compare(credentials.password, user.password);
            if (isPasswordMatched) {
              return user;
            }
          }
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          // TODO: not sure how to handle error here
          throw new Error(error);
        }
      },
    }),
  ],
};

export default NextAuth(authOptions);
