import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb-client";
import bcrypt from "bcryptjs";

/**
 * @swagger
 * /api/user/password:
 *   put:
 *     summary: Update user password
 *     description: Updates the password for a user identified by their email. The new password is hashed before storage and must be at least 6 characters long.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - newPassword
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The user's email address
 *                 example: user@example.com
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 description: The new password (minimum 6 characters)
 *                 example: NewPass123
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates successful update
 *                   example: true
 *       400:
 *         description: Missing or invalid fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email and a password (min 6 chars) are required
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
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

export async function PUT(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    const { email, newPassword } = await req.json();
    if (!email || !newPassword || newPassword.length < 6) {
      return NextResponse.json({ error: "Email and a password (min 6 chars) are required" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await users.updateOne({ email }, { $set: { password: hashedPassword } });
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Error in PUT /api/user/password:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}