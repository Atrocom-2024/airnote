import { NextApiRequest, NextApiResponse } from "next";

import { pool } from "@/utils/database";
import { generateRandomString } from "@/utils/modules";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let client;
  
  try {
    switch (req.method) {
      case 'POST':
        const { email, name, nickname, phone_number } = req.query;
  
        if (!email || !name || !nickname || !phone_number) {
          return res.status(400).send('유저 정보 없음');
        }
  
        client = await pool.connect();
        const userId = generateRandomString(20);
        const signupQuery = `
          INSERT INTO USERS_TB (id, email, name, nickname, phone_number, provider)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING id;
        `;
        const signupValues = [userId, email, name, nickname, phone_number, 'kakao'];
        await client.query('BEGIN');
        await client.query('INSERT INTO USER_ROLES_TB (user_id) VALUES ($1)', [userId]);
        const signupQueryResult = await client.query(signupQuery, signupValues);
        await client.query('COMMIT');
        const signupUserId = signupQueryResult.rows[0].id;
        
        return res.status(201).json({
          success: true,
          message: 'sign up successfully',
          user_id: signupUserId
        });
      default:
        return res.status(405).send('잘못된 요청 메서드');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("내부 서버 오류");
  } finally {
    client?.release();
  }
}