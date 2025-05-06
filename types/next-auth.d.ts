// File: types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `jwt` callback and stored in the token.
   */
  interface JWT {
    id: string;
    provider: string;
  }

  /**
   * Extended Session type: add `id` and `provider` to `session.user`.
   */
  interface Session {
    user: {
      /** The user's database ID */
      id: string;
      /** Which provider they signed in with */
      provider: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    provider: string;
  }
}
