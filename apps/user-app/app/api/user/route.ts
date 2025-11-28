import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { message: "You are not logged in" },
      { status: 403 }
    );
  }

  return NextResponse.json(
    { message: "You are logged in", user: session.user },
    { status: 200 }
  );
}

