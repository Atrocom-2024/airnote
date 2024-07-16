import { NextApiRequest, NextApiResponse } from "next";

import { pool } from "@/utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const client = await pool.connect();
        const topKnowledgesQuery = `
          SELECT
            k.knowledge_id,
            u.nickname as author_nickname,
            k.knowledge_title,
            k.knowledge_content,
            k.thumbnail_url,
            k.create_at
          FROM KNOWLEDGE_TB k
          JOIN USERS_TB u ON k.author_id = u.id
          LIMIT 3;
        `
        const topKnowledgesQueryResult = await client.query(topKnowledgesQuery);
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