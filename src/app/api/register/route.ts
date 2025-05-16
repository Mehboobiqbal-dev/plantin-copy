import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb-client";
import bcrypt from "bcryptjs";

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account with the provided email, password, and name. The password is hashed before storage, and additional user fields are initialized.
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
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: User's email address
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User's password (minimum 6 characters recommended)
 *                 example: Password123
 *               name:
 *                 type: string
 *                 description: User's full name
 *                 example: John Doe
 *               confirmPassword:
 *                 type: string
 *                 format: password
 *                 description: Password confirmation (not used server-side, validated client-side)
 *                 example: Password123
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates successful registration
 *                   example: true
 *                 email:
 *                   type: string
 *                   description: The registered user's email
 *                   example: user@example.com
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email, password, and name are required
 *       409:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User already exists
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
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    const { email, password, name } = await req.json();
    if (!email || !password || !name) {
      return NextResponse.json({ error: "Email, password, and name are required" }, { status: 400 });
    }

    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      email,
      name,
      password: hashedPassword,
      fullName: name,
      username: email.split("@")[0],
      avatar: "",
      plantCareReminders: false,
      newArticlesNotifications: false,
    };

    const result = await users.insertOne(newUser);
    if (!result.insertedId) {
      throw new Error("Failed to register user");
    }

    console.log("User registered successfully:", email);
    return NextResponse.json({ success: true, email }, { status: 201 });
  } catch (err) {
    console.error("Error in POST /api/register:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}