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
        const userKnowledgesQuery = `
          SELECT
            k.knowledge_id,
            k.knowledge_title,
            k.knowledge_content,
            SUM(CASE WHEN krt.knowledge_reaction_type = 'like' THEN 1 ELSE 0 END)::INTEGER AS likes,
            SUM(CASE WHEN krt.knowledge_reaction_type = 'dislike' THEN 1 ELSE 0 END)::INTEGER AS dislikes,
            k.thumbnail_url,
            k.create_at
          FROM KNOWLEDGE_TB k
          JOIN USERS_TB u ON k.author_id = u.id
          LEFT JOIN KNOWLEDGE_REACTION_TB krt ON k.knowledge_id = krt.knowledge_id
          WHERE u.email = $1
          GROUP BY k.knowledge_id, u.nickname, k.knowledge_title, k.knowledge_content, k.thumbnail_url, k.create_at
          ORDER BY k.create_at DESC;
        `;
        const userKnowledgesResult = await client.query(userKnowledgesQuery, [token.email]);
        
        return res.status(200).json(userKnowledgesResult.rows);
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