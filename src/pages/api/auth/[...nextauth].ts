import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Kakao from "next-auth/providers/kakao";

export const authOptions: NextAuthOptions = {
  providers: [
    Kakao({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      authorization: 'https://kauth.kakao.com/oauth/authorize?lang=ko'
    })
  ],
  secret: process.env.NEXT_AUTH_SECRET, // 프로덕션 모드에서는 시크릿이 필요함
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.user = user;
        token.id = user.id;
      } 
      return token;
    },
  },
};

export default NextAuth(authOptions);