import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { generateAccessToken, verifyToken } from "./utils/jwtUtils";

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
      return NextResponse.redirect(new URL('/home', req.url));
    }
  }

  // 관리자 로그인 상태 리다이렉트 설정
  if (pathname === '/admin') {
    const accessToken = req.cookies.get('accessToken');
    const refreshToken = req.cookies.get('refreshToken');
    if (accessToken) {
      const { valid } = await verifyToken(accessToken.value);
      if (valid) {
        return NextResponse.redirect(new URL('/admin/home', req.url));
      }
    } else if (refreshToken) {
      const { valid, payload } = await verifyToken(refreshToken.value);
      if (valid && payload) {
        const { accessToken } = await generateAccessToken({ username: payload.userId });
        const res = NextResponse.next();
        res.cookies.set('accessToken', accessToken);
        return res;
      }
    }
  }
}

export const config = {
  mather: ['/', '/reviews', '/my', '/admin']
}