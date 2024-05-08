import { NextApiRequest, NextApiResponse } from "next";
import { Db } from "mongodb";

import { connectDB } from "@/utils/database";
import { verifyToken } from "@/utils/jwtUtils";

// TODO: 관리자 권한 확인하기
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // 토큰 확인
  const accessToken = req.cookies.accessToken;
  if (accessToken) {
    const { valid } = await verifyToken(accessToken);
    if (!valid) {
      return res.status(401).send('권한 없음');
    }
  } else {
    return res.status(401).send('비로그인 상태');
  }
  
  // 요청 처리
  switch (req.method) {
    case 'GET':
      const { username } = req.query;
      if (!username) {
        return res.status(400).send('잘못된 요청 구문');
      }
      const db: Db = await connectDB();
      const userInfo = await db.collection('user_data').findOne(
        { name: username }, { projection: { email: 1, name: 1, create_at: 1 } }
      );
      return res.json(userInfo);
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}