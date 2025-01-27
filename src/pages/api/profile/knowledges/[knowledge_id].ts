import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { pool } from "@/utils/database";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });
  const { knowledge_id } = req.query;

  // Forbidden
  if (!token) {
    return res.status(403).send('접근 금지');
  }

  if (!knowledge_id) {
    return res.status(400).send('잘못된 요청 구문');
  }

  let client;
  try {
    client = await pool.connect();
    switch (req.method) {
      case 'GET':
        const userKnowledgeDetailQuery = `
          SELECT
            knowledge_id,
            knowledge_title,
            knowledge_content,
            thumbnail_url,
            create_at
          FROM KNOWLEDGE_TB
          WHERE knowledge_id = $1;
        `
        const userKnowledgeDetailResult = await client.query(userKnowledgeDetailQuery, [knowledge_id]);
        
        return res.status(200).json(userKnowledgeDetailResult.rows[0]);
      case 'PUT':
        const body = req.body;
        const userKnowledgeEditQuery = `
          UPDATE KNOWLEDGE_TB
          SET knowledge_title = $2, knowledge_content = $3
          WHERE knowledge_id = $1
          RETURNING knowledge_id;
        `;
        const userKnowledgeEditQueryValues = [knowledge_id, body.knowledge_title, body.knowledge_content];
        const userKnowledgeEditResult = await client.query(userKnowledgeEditQuery, userKnowledgeEditQueryValues);
        
        return res.status(201).json({
          success: true,
          message: 'knowledge edit successfully',
          knowledge_id: userKnowledgeEditResult.rows[0].knowledge_id
        });
      case 'DELETE':
        await client.query('BEGIN');
        // REACTION_TB에서 삭제
        await client.query('DELETE FROM KNOWLEDGE_REACTION_TB WHERE knowledge_id = $1', [knowledge_id]);
        // RECORD_TB에서 삭제하고 post_id 반환
        const deleteKnowledgeResult = await client.query(
          'DELETE FROM KNOWLEDGE_TB WHERE knowledge_id = $1 RETURNING knowledge_id',
          [knowledge_id]
        );
        await client.query('COMMIT');

        return res.status(200).json({
          success: true,
          message: 'knowledge delete successfully',
          record_id: deleteKnowledgeResult.rows[0].knowledge_id
        });
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