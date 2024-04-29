import clientPromise from '@/lib/mongodbClient';
import User from '@/models/User';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { compare } from 'bcryptjs';
import NextAuth, { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import Credentials from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  // ! Casting is required because the MongoDBAdapter function from @auth/mongodb-adapter NOR @next-auth/mongodb-adapter does not return an Adapter
  adapter: MongoDBAdapter(clientPromise) as Adapter,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          await clientPromise;

          // Find user with the email
          const user = await User.findOne({
            email: credentials?.email,
          });
          // Email Not found
          if (!user) {
            throw new Error('Email is not registered');
          }

          // Check hashed password with DB hashed password
          const isPasswordCorrect = await compare(credentials!.password, user.hashedPassword);
          // Incorrect password
          if (!isPasswordCorrect) {
            throw new Error('Password is incorrect');
          }

          return user;
        } catch (e) {
          throw new Error(`Unable to connect to the database. ${e}`);
        }
      },
    }),
  ],
  pages: {
    signIn: '/signin',
  },
  debug: process.env.NODE_ENV !== 'production',
};

export const { handler, auth, signIn, signOut } = NextAuth(authOptions);
