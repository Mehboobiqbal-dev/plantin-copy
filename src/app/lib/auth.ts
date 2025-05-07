// src/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./mongodb";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  // — Persist users & sessions in MongoDB
  adapter: MongoDBAdapter(clientPromise),

  // — Use stateless JWT sessions
  session: { strategy: "jwt" },

  // — Required for production
  secret: process.env.NEXTAUTH_SECRET,

  // — Redirect here on both sign-in and error
  pages: {
    signIn: "/authmodel",
    error:  "/authmodel",  
  },

  providers: [
    CredentialsProvider({
      name: "Email & Password",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please provide both email and password");
        }

        const client = await clientPromise;
        const users  = client.db().collection("users");

        // 1) Find user
        const user = await users.findOne<{
          _id: any;
          name: string;
          email: string;
          passwordHash: string;
        }>({ email: credentials.email });
        if (!user) {
          throw new Error("User not found");
        }

        // 2) Verify password
        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        // 3) Return minimal user object
        return {
          id:    user._id.toString(),
          name:  user.name,
          email: user.email,
        };
      },
    }),

    GoogleProvider({
      clientId:     process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),

    FacebookProvider({
      clientId:     process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),

    AppleProvider({
      clientId:     process.env.APPLE_ID!,
      // Must be a signed JWT string
      clientSecret: process.env.APPLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    // Persist user.id into the token on sign-in
    async jwt({ token, user }) {
      if (user) token.id = user.id as string;
      return token;
    },

    // Make token.id available via `session.user.id`
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },

  events: {
    // Log every successful sign-in (account may be null for e.g. Credentials)
    async signIn({ user, account }) {
      console.log("✅ NextAuth signIn:", user.email, account?.provider);
    },
  },

  // Catch all internal NextAuth logs/errors
  logger: {
    error(code, metadata) {
      console.error("NextAuth error:", code, metadata);
    },
    warn(code) {
      console.warn("NextAuth warning:", code);
    },
    debug(code, metadata) {
      console.debug("NextAuth debug:", code, metadata);
    },
  },

  // Turn on debug messages in development
  debug: process.env.NODE_ENV === "development",
};
