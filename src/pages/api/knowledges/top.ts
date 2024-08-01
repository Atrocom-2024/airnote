import { NextApiRequest, NextApiResponse } from "next";

import { pool } from "@/utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { limit } = req.query;
      try {
        const client = await pool.connect();
        const topKnowledgesQuery = `
          SELECT
            k.knowledge_id,
            CASE WHEN u.nickname IS NULL THEN '(탈퇴 사용자)' ELSE u.nickname END as author_nickname,
            k.knowledge_title,
            k.knowledge_content,
            SUM(CASE WHEN krt.knowledge_reaction_type = 'like' THEN 1 ELSE 0 END)::INTEGER AS likes,
            SUM(CASE WHEN krt.knowledge_reaction_type = 'dislike' THEN 1 ELSE 0 END)::INTEGER AS dislikes,
            k.thumbnail_url,
            k.create_at
          FROM KNOWLEDGE_TB k
          LEFT JOIN USERS_TB u ON k.author_id = u.id
          LEFT JOIN KNOWLEDGE_REACTION_TB krt ON k.knowledge_id = krt.knowledge_id
          GROUP BY k.knowledge_id, u.nickname, k.knowledge_title, k.knowledge_content, k.thumbnail_url, k.create_at
          ORDER BY likes DESC
          LIMIT $1;
        `
        const topKnowledgesQueryResult = await client.query(topKnowledgesQuery, [limit]);
        client.release();
        return res.status(200).json(topKnowledgesQueryResult.rows);
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류');
      }
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}