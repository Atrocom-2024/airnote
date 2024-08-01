import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { pool } from "@/utils/database";
import { generateRandomString } from "@/utils/modules";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const client = await pool.connect();
        const knowledgesQuery = `
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
          ORDER BY k.create_at DESC;
        `
        const knowledgesQueryResult = await client.query(knowledgesQuery);
        client.release();
        return res.status(200).json(knowledgesQueryResult.rows);
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류');
      }
    case 'POST':
      const token = await getToken({ req, secret });
  
      // Unauthorized
      if (!token || !token.email) {
        return res.status(401).send('접근 권한 없음');
      }

      const body: BodyTypes = req.body;
      try {
        // 사용자 정보 얻기
        const client = await pool.connect();
        const userCheckQuery = 'SELECT id FROM USERS_TB WHERE email = $1';
        const userCheckResult = await client.query(userCheckQuery, [token.email]);
        const authorId = userCheckResult.rows[0].id;
        const knowledgeId = generateRandomString();

        if (!authorId) {
          return res.status(401).send('접근 권한 없음');
        }

        const knowledgeInsertQuery = `
          INSERT INTO KNOWLEDGE_TB (knowledge_id, author_id, knowledge_title, knowledge_content, thumbnail_url)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING knowledge_id
        `;
        const knowledgeInsertValues = [
          knowledgeId,
          authorId,
          body.knowledge_title,
          body.knowledge_content,
          body.thumbnail_url
        ];
        const knowledgeInsertResult = await client.query(knowledgeInsertQuery, knowledgeInsertValues);
        client.release();
        return res.status(201).json(knowledgeInsertResult.rows[0]);
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류');
      }
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}

interface BodyTypes {
  knowledge_title: string;
  knowledge_content: string;
  thumbnail_url: string;
}