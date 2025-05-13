import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb-client";

export async function PUT(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db();
    const users = db.collection("users");

    const { email, plantCareReminders, newArticlesNotifications } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const result = await users.updateOne(
      { email },
      { $set: { plantCareReminders, newArticlesNotifications } }
    );
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Error in PUT /api/user/notifications:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}