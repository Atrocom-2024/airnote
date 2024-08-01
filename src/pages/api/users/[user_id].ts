import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { pool } from "@/utils/database";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });
  const { user_id } = req.query;

  // Forbidden
  if (!token || !user_id) {
    return res.status(403).send('접근 금지');
  }

  switch (req.method) {
    case 'DELETE':
      const client = await pool.connect();
      const deleteUserQuery = `DELETE FROM USERS_TB WHERE id = $1 RETURNING id;`;
      const deleteUserRoleQuery = `DELETE FROM USER_ROLES_TB WHERE user_id = $1;`
      await client.query('BEGIN');
      await client.query(deleteUserRoleQuery, [user_id]);
      const deleteUserQueryResult = await client.query(deleteUserQuery, [user_id]);
      await client.query('COMMIT');
      const deleteUserId = deleteUserQueryResult.rows[0].id;
      client.release();
      return res.status(201).json({
        success: true,
        message: 'sign up successfully',
        user_id: deleteUserId
      });
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}