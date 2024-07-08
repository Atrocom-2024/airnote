import { NextApiRequest, NextApiResponse } from "next";

import { pool } from "@/utils/database";
import { verifyToken } from "@/utils/jwtUtils";

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
      const client = await pool.connect();
      const userInfoQuery = `
        SELECT id, email, name, nickname, phone_number, create_at
        FROM USERS_TB
        WHERE nickname = $1;
      `;
      const userInfoQueryResult = await client.query(userInfoQuery, [username]);
      client.release();
      return res.status(200).json(userInfoQueryResult.rows[0]);
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}