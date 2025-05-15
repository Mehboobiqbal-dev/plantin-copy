import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb-client";
import bcrypt from "bcryptjs";



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