import { NextResponse } from 'next/server';
import connectToDatabase from '@/app/lib/mongodb';
import UserModel from '@/app/models/user';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  const { name, email, password, confirmPassword } = await req.json();
  if (!name || !email || !password || password !== confirmPassword) {
    return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
  }
  await connectToDatabase();
  if (await UserModel.findOne({ email })) {
    return NextResponse.json({ error: 'User exists' }, { status: 400 });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = new UserModel({ name, email, password: hashed });
  await user.save();
  return NextResponse.json({ message: 'Registered' }, { status: 201 });
}