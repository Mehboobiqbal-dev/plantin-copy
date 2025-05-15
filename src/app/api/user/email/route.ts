import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb-client";



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