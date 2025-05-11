import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../lib/mongodb-client';
import connectToDatabase from '@/app/lib/mongodb';
import UserModel from '@/app/models/user';
import bcrypt from 'bcryptjs';

interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
}

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }
        await connectToDatabase();
        const user = await UserModel.findOne({ email: credentials.email });
        if (!user || !user.password) {
          throw new Error('Invalid email or password');
        }
        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error('Invalid email or password');
        }
        return { id: user._id.toString(), name: user.name, email: user.email };
      },
    }),
  ],
  pages: { signIn: '/auth' },
  secret: process.env.NEXTAUTH_SECRET,
};