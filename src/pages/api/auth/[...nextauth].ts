import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Kakao from "next-auth/providers/kakao";
import { Db } from "mongodb";

import { connectDB } from "@/utills/database";

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
    async signIn({ user }) {
      const db: Db = await connectDB();
      const userInfo = await db.collection('user_data').findOne({ email: user.email });
      if (!userInfo) {
        const insertUser = await db.collection('user_data').insertOne({
          email: user.email,
          name: user.name,
          review_likes: [],
          review_dislikes: [],
          community_likes: [],
          community_dislikes: [],
          create_at: new Date().toLocaleString('ko-KR')
        });
      }
      return true;
    }
  },
};

export default NextAuth(authOptions);