import dbConnect from "@/app/libs/dbConnect";
import User from "@/app/models/User";
import { NextResponse } from "next/server"; // For App Router
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest) {
  await dbConnect();

  const { searchParams } = new URL(req.url || "", "http://localhost"); // For App Router
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
