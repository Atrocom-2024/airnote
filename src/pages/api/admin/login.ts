import { NextApiRequest, NextApiResponse } from "next";
import { Db } from "mongodb";

import { connectDB } from "@/utils/database";
import { decrypt } from "@/utils/modules";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwtUtils";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const { id, password }: BodyTypes = req.body;
      if (!id || !password) {
        return res.status(400).send('아이디 또는 비밀번호를 입력해주세요.');
      }
      const decryptedId = decrypt(id, process.env.NEXT_PUBLIC_AES_ID_SECRET_KEY);
      const decryptedPw = decrypt(password, process.env.NEXT_PUBLIC_AES_PW_SECRET_KEY);
    
      try {
        const db: Db = await connectDB();
        const adminInfo = await db.collection('admin_data').findOne({ id: decryptedId });
        if (!adminInfo || adminInfo.password !== decryptedPw) {
          return res.status(401).send('아이디 또는 비밀번호가 잘못되었습니다.');
        }

        // 토큰 생성
        const { accessToken } = await generateAccessToken({ userId: decryptedId });
        const { refreshToken } = await generateRefreshToken({ userId: decryptedId });
        res.setHeader('Set-Cookie', [
          `accessToken=${accessToken}; Path=/; Expires=${new Date(
            Date.now() + 60 * 60 * 1000
          ).toUTCString()}; HttpOnly`,
          `refreshToken=${refreshToken}; Path=/; Expires=${new Date(
            Date.now() + 60 * 60 * 24 * 1000 * 3
          ).toUTCString()}; HttpOnly`
        ]);
        return res.status(200).send('관리자 로그인 성공');
      } catch (err) {
        return res.status(500).send('내부 서버 오류');
      }
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}

interface BodyTypes {
  id: string;
  password: string;
}