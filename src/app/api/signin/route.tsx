import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

/**
 * @swagger
 * /api/signin:
 *   post:
 *     summary: User sign-in
 *     description: Authenticates a user with email and password credentials.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Sign-in successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 user:
 *                   type: object
 *                   description: User data excluding password
 *                   properties:
 *                     _id:
 *                       type: string
 *                       description: User ID
 *                       example: 507f1f77bcf86cd799439011
 *                     email:
 *                       type: string
 *                       description: User's email
 *                       example: user@example.com
 *                     name:
 *                       type: string
 *                       description: User's name
 *                       example: John Doe
 *       400:
 *         description: Missing email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email and password are required
 *       401:
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid email or password
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Server error
 */
export async function POST(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Explicitly check if the connection is ready and db is defined
    if (mongoose.connection.readyState !== 1 || !mongoose.connection.db) {
      throw new Error("Database connection not established or db is undefined");
    }

    // Safely access the database
    const db = mongoose.connection.db;
    const users = db.collection("users");

    const { email, password } = await req.json();
    console.log(email, password);
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Define user document type to avoid @ts-ignore
    interface UserDocument {
      _id: mongoose.Types.ObjectId;
      email: string;
      password: string;
      name?: string;
      [key: string]: any;
    }

    const user = await users.findOne<UserDocument>({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Strip out the password before replying
    const { password: _, ...userWithoutPassword } = user;

    console.log("User signed in successfully:", email);
    return NextResponse.json(
      { success: true, user: userWithoutPassword },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Error in POST /api/signin:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}