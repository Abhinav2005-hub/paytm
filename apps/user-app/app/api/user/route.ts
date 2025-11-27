import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (session.user) {
      console.log("Session:", session);
      return NextResponse.json({
        user: session.user
      })
      console.log("Session:", session);
    }
  } catch (e) {
    return NextResponse.json({
      message: "You are not logged in"
    }, {
      status: 403
    })
  }
  return NextResponse.json({
    message: "You are logged in"
  }, {
    status: 403
  })
}
