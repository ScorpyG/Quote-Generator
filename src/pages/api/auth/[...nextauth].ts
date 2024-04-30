import clientPromise from '@/lib/mongodbClient';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  // ! Casting is required because the MongoDBAdapter function from @auth/mongodb-adapter NOR @next-auth/mongodb-adapter does not return an Adapter
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    Credentials({
      name: 'Credentials',
      type: 'credentials',
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as { email: string; password: string };

        // TODO: replace this with actual database query
        if (email !== 'testuser1@test.com' || password !== 'TestUser@123') {
          throw new Error('Invalid credentials!');
        } else {
          return {
            id: '1',
            name: 'Test User',
            email: 'testuser1@test.com',
          };
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  debug: process.env.NODE_ENV !== 'production',

  session: {
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
