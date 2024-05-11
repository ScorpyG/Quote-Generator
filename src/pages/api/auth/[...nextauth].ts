import clientPromise from '@/lib/mongodbClient';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import bcrypt from 'bcryptjs';
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
        const client = await clientPromise;
        const db = client.db(process.env.MONGODB_DB_NAME);

        const { email, password } = credentials as { email: string; password: string };
        const user = await db.collection('users').findOne({ email });

        if (!user) {
          throw new Error('No user found');
        } else {
          const isValid = await bcrypt.compare(password, user.password);

          if (!isValid) {
            throw new Error('Password is incorrect');
          } else {
            return {
              id: user._id.toString(),
              email: user.email,
              name: `${user.firstName} ${user.lastName}`,
            };
          }
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
