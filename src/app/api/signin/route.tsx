import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import bcrypt from "bcryptjs";


export async function POST(req: NextRequest) {
  try {
    // use your existing helper to get mongoose and its native DB handle
    const mongoose = await connectToDatabase();
    const db = mongoose.connection.db;
    const users = db.collection("users");

    const { email, password } = await req.json();
    console.log(email, password)
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await users.findOne({ email });
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

    // strip out the password before replying
    // (note: user is a raw Mongo doc here, so destructure off .password)
    // @ts-ignore
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
