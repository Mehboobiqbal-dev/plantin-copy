import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import AppleProvider from 'next-auth/providers/apple';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from './mongodb-client';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID || '',
      clientSecret: process.env.APPLE_CLIENT_SECRET || '',
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
        try {
          const client = await clientPromise;
          const db = client.db();
          const user = await db.collection('users').findOne({ email: credentials.email });
          if (!user || !user.password) {
            throw new Error('Invalid email or password');
          }
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error('Invalid email or password');
          }
          return { id: user._id.toString(), name: user.name, email: user.email, provider: 'credentials' };
        } catch (error) {
          console.error('Authorize error:', error);
          throw new Error('Authentication failed');
        }
      },
    }),
  ],
  pages: { signIn: '/authmodel' },
  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        token.id = user.id;
        token.provider = account.provider;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.id && token.provider) {
        session.user = {
          id: token.id,
          provider: token.provider,
          name: session.user.name,
          email: session.user.email,
        };
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);