import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXT_AUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  if (!token) {
    if (pathname.startsWith('/my') || pathname.startsWith('/reviews')) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
}

export const config = {
  mather: ['/', '/reviews', '/my']
}