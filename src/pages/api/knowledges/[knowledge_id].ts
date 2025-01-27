import { NextApiRequest, NextApiResponse } from "next";

import { pool } from "@/utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let client;
  
  try {
    switch (req.method) {
      case 'GET':
        client = await pool.connect();
        const knowledgeId = req.query.knowledge_id
        const knowledgeQuery = `
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
          WHERE k.knowledge_id = $1
          GROUP BY k.knowledge_id, u.nickname, k.knowledge_title, k.knowledge_content, k.thumbnail_url, k.create_at
        `
        const knowledgeQueryResult = await client.query(knowledgeQuery, [knowledgeId]);
        
        return res.status(200).json(knowledgeQueryResult.rows[0]);
      default:
        return res.status(405).send('잘못된 요청 메서드');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send('내부 서버 오류');
  } finally {
    client?.release();
  }
}