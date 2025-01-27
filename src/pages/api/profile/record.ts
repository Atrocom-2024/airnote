import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { pool } from "@/utils/database";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let client;
  const token = await getToken({ req, secret });

  // Forbidden
  if (!token) {
    return res.status(403).send('접근 금지');
  }

  try {
    switch (req.method) {
      case 'GET':
        client = await pool.connect();
        const userRecordQuery = `
          SELECT
            r.post_id,
            r.address,
            r.address_detail,
            r.content,
            SUM(CASE WHEN rt.reaction_type = 'like' THEN 1 ELSE 0 END) AS likes,
            SUM(CASE WHEN rt.reaction_type = 'dislike' THEN 1 ELSE 0 END) AS dislikes,
            r.create_at
          FROM RECORD_TB r
          JOIN USERS_TB u ON r.author_id = u.id
          LEFT JOIN REACTION_TB rt ON r.post_id = rt.post_id
          WHERE u.email = $1
          GROUP BY r.post_id, r.address, r.address_detail, r.content, r.create_at
        `
        const userRecordQueryResult = await client.query(userRecordQuery, [token.email]);
        
        return res.status(200).json(userRecordQueryResult.rows);
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