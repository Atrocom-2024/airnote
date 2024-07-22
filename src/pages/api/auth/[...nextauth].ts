import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Kakao from "next-auth/providers/kakao";

import { pool } from "@/utils/database";
import { generateRandomString } from "@/utils/modules";

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
    async signIn({ user, profile }) {
      const client = await pool.connect();
      try {
        const checkUserQuery = 'SELECT * FROM USERS_TB WHERE email = $1';
        const checkResult = await client.query(checkUserQuery, [user.email]);
        const existingUser = checkResult.rows[0];
  
        if (profile) {
          if (existingUser) {
            return true;
          } else {
            // 신규 회원이면 /terms 페이지로 리다이렉트하고 사용자 정보를 query params로 전달
            return `/signup?email=${encodeURIComponent(profile.kakao_account.email)}&name=${encodeURIComponent(profile.kakao_account.name)}&nickname=${encodeURIComponent(profile.kakao_account.profile.nickname)}&phone_number=${profile.kakao_account.phone_number}`
          }
        } else {
          return '/home';
        }
        // if (!checkResult.rows.length && profile) {
        //   const id = generateRandomString();
        //   const insertQuery = `
        //     INSERT INTO USERS_TB (id, email, name, nickname, phone_number, provider)
        //     VALUES ($1, $2, $3, $4, $5, $6)
        //     RETURNING id
        //   `
        //   const values = [
        //     id,
        //     profile.kakao_account.email,
        //     profile.kakao_account.name,
        //     profile.kakao_account.profile.nickname,
        //     profile.kakao_account.phone_number,
        //     'kakao'
        //   ];
        //   const result = await client.query(insertQuery, values);
        //   const newUserId = result.rows[0]; // 회원가입 성공시 id 반환
      } finally {
        client.release();
      }
    }
  }
};


export default NextAuth(authOptions);