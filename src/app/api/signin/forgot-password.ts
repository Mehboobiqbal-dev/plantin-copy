import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import User from '@/app/models/user';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { z } from 'zod';

// Validation schema for request body
const ForgotPasswordSchema = z.object({
  email: z.string().email('Please provide a valid email address.'),
});

// Environment variables
const {
  GMAIL_USER,
  GMAIL_PASS,
  APP_URL = 'http://localhost:3000',
} = process.env;

export async function POST(req: Request) {
  try {
    // Validate environment variables
    if (!GMAIL_USER || !GMAIL_PASS) {
      console.error('Missing Gmail credentials');
      return NextResponse.json(
        { error: 'Server configuration error: Missing email credentials.' },
        { status: 500 }
      );
    }

    // Parse and validate request body
    const body = await req.json();
    console.log('Received forgot password request:', { body });

    const validation = ForgotPasswordSchema.safeParse(body);
    if (!validation.success) {
      console.error('Validation error:', validation.error.errors);
      return NextResponse.json(
        { error: validation.error.errors[0].message },
        { status: 400 }
      );
    }

    const { email } = validation.data;
    console.log('Validated email:', email);

    // Connect to database
    try {
      await connectToDatabase();
    } catch (dbErr) {
      console.error('Database connection error:', dbErr);
      return NextResponse.json(
        { error: 'Failed to connect to the database.' },
        { status: 500 }
      );
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found for email:', email);
      return NextResponse.json(
        { message: 'If an account exists, a password reset link has been sent.' },
        { status: 200 }
      );
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    // Save token to user
    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpires = resetTokenExpires;
    await user.save();
    console.log('Reset token saved for user:', email);

    // Configure Nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_PASS,
      },
    });

    // Verify SMTP connection
    try {
      await transporter.verify();
      console.log('SMTP connection verified');
    } catch (smtpErr) {
      console.error('SMTP verification error:', smtpErr);
      return NextResponse.json(
        { error: 'Failed to connect to email server.' },
        { status: 500 }
      );
    }

    // Send reset email
    const resetUrl = `${APP_URL}/auth/reset-password?token=${resetToken}&email=${encodeURIComponent(email)}`;
    const mailOptions = {
      from: `"PlantIn Support" <${GMAIL_USER}>`,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <h2>Reset Your Password</h2>
        <p>You requested a password reset for your PlantIn account.</p>
        <p>Click the link below to reset your password. This link is valid for 1 hour:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #34D399; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Best regards,<br>PlantIn Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Reset email sent to:', email);

    return NextResponse.json(
      { message: 'If an account exists, a password reset link has been sent.' },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error('Forgot password error:', {
      message: err instanceof Error ? err.message : 'Unknown error',
      stack: err instanceof Error ? err.stack : undefined,
      requestBody: await req.json().catch(() => ({})),
    });

    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    );
  }
}