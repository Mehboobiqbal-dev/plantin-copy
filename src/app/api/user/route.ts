import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/lib/auth';
import clientPromise from '@/app/lib/mongodb-client';
import bcrypt from 'bcryptjs'; // Import bcryptjs

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session data:', session);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized: No session found' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();
    const user = await db.collection('users').findOne({ email: session.user.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ email: user.email, name: user.name });
  } catch (error) {
    console.error('GET /api/user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log('Session data:', session);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { newPassword } = await req.json();
    if (!newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10); // Use bcryptjs
    const client = await clientPromise;
    const db = client.db();

    const result = await db.collection('users').updateOne(
      { email: session.user.email },
      { $set: { password: hashedPassword } }
    );

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: 'Failed to update password' }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('POST /api/user error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}