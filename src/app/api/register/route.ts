import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/app/lib/mongodb-client";
import bcrypt from "bcryptjs";

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