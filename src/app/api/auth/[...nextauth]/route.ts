import NextAuth from 'next-auth';
import { authOptions } from '@/app/lib/auth';

// Create the NextAuth handler
const handler = NextAuth(authOptions);

// Export for GET and POST
export { handler as GET, handler as POST };