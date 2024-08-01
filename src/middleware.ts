import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/jwtUtils";

const secret = process.env.NEXT_AUTH_SECRET;

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  // 랜딩 페이지 접근 시 로그인 상태이면 home으로 리다이렉트 설정
  if (pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  }

  // 회원인 유저는 회원가입 페이지 접근 불가
  if (pathname === '/signup') {
    if (token) {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  }

  // 마이페이지 접근 리다이렉트 설정
  if (pathname.startsWith('/profile')) {
    if (!token) {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  }

  // 비로그인 상태에서 공간 기록 페이지 접근시 리다이렉트 설정
  if (pathname === '/record/add') {
    if (!token) {
      return NextResponse.redirect(new URL('/home', req.url));
    }
  }

  if (pathname === '/knowledges/add') {
    if (!token) {
      return NextResponse.redirect(new URL('/knowledges', req.url));
    }
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const res = await fetch(`${domain}/api/user-roles?email=${token.email}`);
    if (!res.ok) {
      return NextResponse.redirect(new URL('/knowledges', req.url));
    }
    const json = await res.json();
    if (json.role !== 'expert' && json.role !== 'admin') {
      return NextResponse.redirect(new URL('/knowledges', req.url));
    }
  }

  // 관리자 로그인 상태 리다이렉트 설정
  if (pathname === '/admin') {
    const accessToken = req.cookies.get('accessToken');
    if (accessToken) {
      const { valid } = await verifyToken(accessToken.value);
      if (valid) {
        return NextResponse.redirect(new URL('/admin/home', req.url));
      }
    }
  }

  // 관리자 홈 상태 리다이렉트 설정
  if (pathname === '/admin/home') {
    const accessToken = req.cookies.get('accessToken');
    if (accessToken) {
      const { valid } = await verifyToken(accessToken.value);
      if (!valid) {
        return NextResponse.redirect(new URL('/admin', req.url));
      }
    } else {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }
}

export const config = {
  mather: ['/', '/signup', '/record', '/my', '/admin']
}