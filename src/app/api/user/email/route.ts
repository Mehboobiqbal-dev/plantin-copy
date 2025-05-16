import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb-client";

/**
 * @swagger
 * /api/user/email:
 *   put:
 *     summary: Update user email
 *     description: Updates the email address of an existing user identified by their current email. Ensures the new email is not already in use.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentEmail
 *               - newEmail
 *             properties:
 *               currentEmail:
 *                 type: string
 *                 format: email
 *                 description: The user's current email address
 *                 example: old@example.com
 *               newEmail:
 *                 type: string
 *                 format: email
 *                 description: The new email address to set
 *                 example: new@example.com
 *     responses:
 *       200:
 *         description: Email updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates successful update
 *                   example: true
 *                 newEmail:
 *                   type: string
 *                   description: The updated email address
 *                   example: new@example.com
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Current and new email are required
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
 *       409:
 *         description: New email already in use
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email already in use
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

    const { currentEmail, newEmail } = await req.json();
    if (!currentEmail || !newEmail) {
      return NextResponse.json({ error: "Current and new email are required" }, { status: 400 });
    }

    // Check if new email already exists
    const existingUser = await users.findOne({ email: newEmail });
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const result = await users.updateOne({ email: currentEmail }, { $set: { email: newEmail } });
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, newEmail }, { status: 200 });
  } catch (err) {
    console.error("Error in PUT /api/user/email:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}