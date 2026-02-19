import { NextApiRequest, NextApiResponse } from "next";
import { RowDataPacket } from "mysql2";

import { pool } from "@/utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {  
  try {
    switch (req.method) {
      case 'GET':
        const { email } = req.query;
        const userInfoQuery = `SELECT id FROM USERS_TB WHERE email = ?;`;
        const [userRows] = await pool.query<RowDataPacket[]>(userInfoQuery, [email]);
  
        if (!userRows.length) {
          return res.status(401).send('접근 권한 없음');
        }
  
        const userId = userRows[0].id;
        const roleConfirmQuery = `
          SELECT ur.user_id, u.email, u.nickname, r.role_name
          FROM USER_ROLES_TB ur
          JOIN ROLES_TB r ON ur.role_id = r.role_id
          JOIN USERS_TB u ON ur.user_id = u.id
          WHERE user_id = ?
        `;
        const [roleConfirmRows] = await pool.query<RowDataPacket[]>(roleConfirmQuery, [userId]);
        
        return res.status(200).json({ role: roleConfirmRows[0].role_name });
      default:
        return res.status(405).send('잘못된 요청 메서드');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("내부 서버 오류");
  }
}