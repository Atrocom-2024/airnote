import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { pool } from "@/utils/database";
import { generateRandomString } from "@/utils/modules";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    // case 'GET':
    //   const { lat, lng } = req.query;
    //   try {
    //     const client = await pool.connect();
    //     const reviewsQuery = `
    //       SELECT
    //         r.post_id,
    //         u.nickname AS author_nickname,
    //         r.address,
    //         r.address_detail,
    //         r.content,
    //         SUM(CASE WHEN rt.reaction_type = 'like' THEN 1 ELSE 0 END) AS likes,
    //         SUM(CASE WHEN rt.reaction_type = 'dislike' THEN 1 ELSE 0 END) AS dislikes,
    //         r.create_at
    //       FROM RECORD_TB r
    //       JOIN USERS_TB u ON r.author_id = u.id
    //       LEFT JOIN REACTION_TB rt ON r.post_id = rt.post_id
    //       WHERE r.latitude = $1 AND r.longitude = $2
    //       GROUP BY r.post_id, u.nickname, r.address, r.address_detail, r.content, r.create_at
    //     `;
    //     const reviewsQueryResult = await client.query(reviewsQuery, [parseFloat(lat), parseFloat(lng)]);
    //     client.release();
    //     return res.status(200).json(reviewsQueryResult.rows);
    //   } catch (err) {
    //     console.error(err);
    //     return res.status(500).send('내부 서버 오류');
    //   }
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