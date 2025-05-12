import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import clientPromise from "@/app/lib/mongodb-client";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { newPassword } = await req.json();
  if (!newPassword || newPassword.length < 6) {
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  const client = await clientPromise;
  const db = client.db();

  await db.collection("user").updateOne(
    { email: session.user.email },
    { $set: { password: hashedPassword } }
  );

  return NextResponse.json({ success: true });
}
