import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/mongodb';
import UserModel from '@/app/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  let body: { name: string; email: string; password: string; confirmPassword: string } | null = null;
  try {
    // Parse request body
    body = await req.json();
    if (!body) {
      console.error('Request body is empty or invalid');
      return NextResponse.json({ error: 'Request body is required' }, { status: 400 });
    }

    // Destructure after confirming body is not null
    const { name, email, password, confirmPassword } = body;

    // Validate input
    if (!name || typeof name !== 'string' || name.trim().length < 1) {
      console.error('Invalid name:', name);
      return NextResponse.json({ error: 'Name is required and must be a non-empty string' }, { status: 400 });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      console.error('Invalid email:', email);
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!password || typeof password !== 'string' || password.length < 6) {
      console.error('Invalid password');
      return NextResponse.json({ error: 'Password is required and must be at least 6 characters' }, { status: 400 });
    }
    if (password !== confirmPassword) {
      console.error('Password mismatch');
      return NextResponse.json({ error: 'Passwords do not match' }, { status: 400 });
    }

    // Connect to MongoDB
    try {
      await connectToDatabase();
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json({ error: 'Failed to connect to the database' }, { status: 500 });
    }

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      console.error('User already exists with email:', email);
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save new user
    const user = new UserModel({ name, email, password: hashedPassword });
    await user.save();

    console.log('User registered successfully:', email);
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error: unknown) {
    // Handle error with proper typing
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    const errorStack = error instanceof Error ? error.stack : undefined;

    // Log detailed error
    console.error('Registration error:', {
      message: errorMessage,
      stack: errorStack,
      requestBody: body || 'Failed to parse request body',
    });

    return NextResponse.json(
      { error: 'An unexpected error occurred during registration', details: errorMessage },
      { status: 500 }
    );
  }
}