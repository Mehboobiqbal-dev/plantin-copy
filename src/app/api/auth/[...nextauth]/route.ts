// File: app/api/auth/[...nextauth]/route.ts

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import connectToDatabase from '@/app/lib/mongodb';
import UserModel from '@/app/models/user';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
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
        if (!credentials?.email || !credentials.password) {
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
        return { id: user.id, name: user.name, email: user.email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.provider = account?.provider!;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.provider = token.provider as string;
      return session;
    },
  },
  pages: { signIn: '/auth' },
  secret: process.env.NEXTAUTH_SECRET,
};

// create the handler once:
const handler = NextAuth(authOptions);

// export it for both GET and POST
export { handler as GET, handler as POST };
