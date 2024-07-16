import { NextApiRequest, NextApiResponse } from "next";

import { pool } from "@/utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const knowledgeId = req.query.knowledge_id
        const client = await pool.connect();
        const knowledgeQuery = `
          SELECT
            k.knowledge_id,
            u.nickname as author_nickname,
            k.knowledge_title,
            k.knowledge_content,
            k.thumbnail_url,
            k.create_at
          FROM KNOWLEDGE_TB k
          JOIN USERS_TB u ON k.author_id = u.id
          WHERE knowledge_id = $1
          LIMIT 3;
        `
        const knowledgeQueryResult = await client.query(knowledgeQuery, [knowledgeId]);
        client.release();
        return res.status(200).json(knowledgeQueryResult.rows);
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류');
      }
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}