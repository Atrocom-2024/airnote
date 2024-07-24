import { pool } from "@/utils/database";
import { generateRandomString } from "@/utils/modules";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const { email, name, nickname, phone_number } = req.query;

      if (!email || !name || !nickname || !phone_number) {
        return res.status(400).send('유저 정보 없음');
      }

      const userId = generateRandomString(20);
      const client = await pool.connect();
      const signupQuery = `
        INSERT INTO USERS_TB (id, email, name, nickname, phone_number, provider)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING id;
      `;
      const signupValues = [userId, email, name, nickname, phone_number, 'kakao'];
      const signupQueryResult = await client.query(signupQuery, signupValues);
      const signupUserId = signupQueryResult.rows[0];
      client.release();
      return res.status(201).json({
        success: true,
        message: 'sign up successfully',
        user_id: signupUserId
      });
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}