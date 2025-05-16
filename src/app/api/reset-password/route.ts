import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import bcryptjs from 'bcryptjs';
import { createHash } from 'crypto';
import { z } from 'zod';

// Validation schema for request body
type RequestBody = { email: string; token: string; newPassword: string };
const ResetPasswordSchema = z.object({
  email: z.string().email('Invalid email address.'),
  token: z.string().min(1, 'Token is required.'),
  newPassword: z.string().min(8, 'Password must be at least 8 characters.'),
});

const MONGODB_URI = process.env.MONGODB_URI;

export async function POST(req: Request) {
  try {
    // Validate environment variables
    if (!MONGODB_URI) {
      console.error('Missing MONGODB_URI');
      return NextResponse.json(
        { error: 'Server configuration error.' },
        { status: 500 }
      );
    }

    // Validate request body
    const body: RequestBody = await req.json();
    const validation = ResetPasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email, token, newPassword } = validation.data;

    // Connect to database
    let mongoose;
    try {
      mongoose = await connectToDatabase();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { error: 'Unable to connect to database.' },
        { status: 500 }
      );
    }

    // Ensure the database connection is ready
    if (!mongoose.connection.db) {
      console.error('Database connection not established');
      return NextResponse.json(
        { error: 'Database connection not established.' },
        { status: 500 }
      );
    }

    const db = mongoose.connection.db;
    const users = db.collection('users');

    // Hash the provided token
    let tokenHash;
    try {
      tokenHash = createHash('sha256').update(token).digest('hex');
    } catch (tokenError) {
      console.error('Token hashing error:', tokenError);
      return NextResponse.json(
        { error: 'Error processing token.' },
        { status: 500 }
      );
    }

    // Find user with matching email and token
    let user;
    try {
      user = await users.findOne({
        email,
        resetPasswordToken: tokenHash,
        resetPasswordExpires: { $gt: new Date() },
      });
      console.log(`User lookup for ${email}: ${user ? 'Found' : 'Not found'}`);
    } catch (userError) {
      console.error('User lookup error:', userError);
      return NextResponse.json(
        { error: 'Error checking user account.' },
        { status: 500 }
      );
    }

    if (!user) {
      console.log(`Invalid or expired token for email: ${email}`);
      return NextResponse.json(
        { error: 'Invalid or expired reset link.' },
        { status: 400 }
      );
    }

    // Hash the new password
    let hashedPassword;
    try {
      hashedPassword = await bcryptjs.hash(newPassword, 10);
    } catch (hashError) {
      console.error('Password hashing error:', hashError);
      return NextResponse.json(
        { error: 'Error processing password.' },
        { status: 500 }
      );
    }

    // Update user with new password and clear reset token
    try {
      await users.updateOne(
        { email },
        {
          $set: { password: hashedPassword },
          $unset: { resetPasswordToken: '', resetPasswordExpires: '' },
        }
      );
      console.log(`Password reset for ${email}`);
    } catch (updateError) {
      console.error('User update error:', updateError);
      return NextResponse.json(
        { error: 'Error updating password.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Password reset successfully.' },
      { status: 200 }
    );
  } catch (err) {
    console.error('Reset password error:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}