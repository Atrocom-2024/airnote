import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXT_AUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  // 처음 접속시 home으로 리다이렉트 설정
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/home', req.url));
  }

  // 일반 유저 로그인 상태 리다이렉트 설정
  if (pathname.startsWith('/my') || pathname.startsWith('/reviews')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }
}

export const config = {
  mather: ['/', '/reviews', '/my', '/admin']
}