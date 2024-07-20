import { pool } from "@/utils/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { email } = req.query;
      const client = await pool.connect();
      const userInfoQuery = `SELECT id FROM USERS_TB WHERE email = $1;`;
      const userInfoQueryResult = await client.query(userInfoQuery, [email]);

      if (!userInfoQueryResult.rows.length) {
        return res.status(401).send('접근 권한 없음');
      }

      const userId = userInfoQueryResult.rows[0].id;
      const roleConfirmQuery = `
        SELECT ur.user_id, u.email, u.nickname, r.role_name
        FROM USER_ROLES_TB ur
        JOIN ROLES_TB r ON ur.role_id = r.role_id
        JOIN USERS_TB u ON ur.user_id = u.id
        WHERE user_id = $1
      `;
      const roleConfirmQueryResult = await client.query(roleConfirmQuery, [userId]);
      return res.status(200).json({ role: roleConfirmQueryResult.rows[0].role_name });
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}