import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import { randomBytes, createHash } from 'crypto';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Validation schema for request body
type RequestBody = { email: string };
const ForgotPasswordSchema = z.object({
  email: z.string().email('Please provide a valid email address.'),
});

// Ensure .env.local variables are loaded automatically by Next.js
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_PASS = process.env.GMAIL_PASS;
const MONGODB_URI = process.env.MONGODB_URI;
const APP_URL = process.env.APP_URL || 'http://localhost:3000';

export async function POST(req: Request) {
  try {
    // Validate environment variables
    if (!GMAIL_USER || !GMAIL_PASS || !MONGODB_URI) {
      console.error('Missing environment variables:', {
        GMAIL_USER: !!GMAIL_USER,
        GMAIL_PASS: !!GMAIL_PASS,
        MONGODB_URI: !!MONGODB_URI,
      });
      return NextResponse.json(
        { error: 'Server configuration error. Please contact support.' },
        { status: 500 }
      );
    }

    // Validate request body
    const body: RequestBody = await req.json();
    const validation = ForgotPasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email } = validation.data;

    // Attempt database connection
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

    // Ensure db is defined
    const db = mongoose.connection.db;
    if (!db) {
      console.error('Database connection object is undefined');
      return NextResponse.json(
        { error: 'Database connection failed.' },
        { status: 500 }
      );
    }

    const users = db.collection('users');

    // Find user document
    let user;
    try {
      user = await users.findOne({ email });
      console.log(`User lookup for ${email}: ${user ? 'Found' : 'Not found'}`);
    } catch (userError) {
      console.error('User lookup error:', userError);
      return NextResponse.json(
        { error: 'Error checking user account.' },
        { status: 500 }
      );
    }

    // Always return same message for security (prevent email enumeration)
    if (!user) {
      console.log(`No user found for email: ${email}`);
      return NextResponse.json(
        {
          message:
            'If an account exists, a password reset link has been sent.',
          userFound: false,
        },
        { status: 200 }
      );
    }

    // Generate token and expiration
    let rawToken, tokenHash, expires;
    try {
      rawToken = randomBytes(32).toString('hex');
      tokenHash = createHash('sha256').update(rawToken).digest('hex');
      expires = new Date(Date.now() + 3600_000); // 1 hour
      console.log(`Generated token for ${email}`);
    } catch (tokenError) {
      console.error('Token generation error:', tokenError);
      return NextResponse.json(
        { error: 'Error generating reset token.' },
        { status: 500 }
      );
    }

    // Update user with token fields
    try {
      await users.updateOne(
        { email },
        {
          $set: {
            resetPasswordToken: tokenHash,
            resetPasswordExpires: expires,
          },
        }
      );
      console.log(`Updated user ${email} with reset token`);
    } catch (updateError) {
      console.error('User update error:', updateError);
      return NextResponse.json(
        { error: 'Error saving reset token.' },
        { status: 500 }
      );
    }

    // Set up email transporter
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: GMAIL_USER, pass: GMAIL_PASS },
      });
      console.log('Email transporter initialized');
    } catch (transporterError) {
      console.error('Email transporter setup error:', transporterError);
      return NextResponse.json(
        { error: 'Error setting up email service.' },
        { status: 500 }
      );
    }

    // Send email with raw token
    const resetUrl = `${APP_URL}/auth/reset-password?token=${rawToken}&email=${encodeURIComponent(
      email
    )}`;
    let emailSent = false;
    try {
      const info = await transporter.sendMail({
        from: `"Your App Name" <${GMAIL_USER}>`,
        to: email,
        subject: 'Reset Your Password',
        html: `
          <h2>Password Reset</h2>
          <p>Click <a href="${resetUrl}">here</a> to reset your password. This link is valid for 1 hour.</p>
          <p>If you did not request this, please ignore this email.</p>
        `,
      });
      console.log(`Email sent to ${email}: Message ID ${info.messageId}`);
      emailSent = true;
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        {
          error: 'Error sending reset email.',
          userFound: true,
          emailSent: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message:
          'If an account exists, a password reset link has been sent.',
        userFound: true,
        emailSent,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error('Forgot password error:', err);
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 }
    );
  }
}