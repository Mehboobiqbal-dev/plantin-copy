import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb-client";

/**
 * @swagger
 * /api/user:
 *   delete:
 *     summary: Delete a user
 *     description: Deletes a user from the database using their email address.
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
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user to delete
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: Indicates successful deletion
 *                   example: true
 *       400:
 *         description: Missing email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Email is required
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

export async function GET(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const user = await users.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error("Error in GET /api/user:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    const { email, fullName } = await req.json();
    if (!email || !fullName) {
      return NextResponse.json({ error: "Email and fullName are required" }, { status: 400 });
    }

    const result = await users.updateOne({ email }, { $set: { fullName } });
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Error in PUT /api/user:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const result = await users.deleteOne({ email });
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Error in DELETE /api/user:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}