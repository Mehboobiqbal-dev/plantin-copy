import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb-client";

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
    console.error("Error in PUT /api/user/name:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}