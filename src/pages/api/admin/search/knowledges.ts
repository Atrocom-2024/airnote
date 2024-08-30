import { NextApiRequest, NextApiResponse } from "next";

import { pool } from "@/utils/database";
import { verifyToken } from "@/utils/jwtUtils";

export default async function handler(req: CustomApiRequest, res: NextApiResponse) {
  // 토큰 확인
  const accessToken = req.cookies.accessToken;
  if (accessToken) {
    const { valid } = await verifyToken(accessToken);
    if (!valid) {
      return res.status(401).send('권한 없음');
    }
  } else {
    return res.status(401).send('비로그인 상태');
  }
  
  // 요청 처리
  switch (req.method) {
    case 'GET':
      const { title } = req.query;
      const searchPattern = `%${decodeURIComponent(title)}%`;
      const client = await pool.connect();
      const knowledgesQuery = `
        SELECT
          k.knowledge_id,
          u.email as author_email,
          u.name as author_name,
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
        ${title ? 'WHERE k.knowledge_title ILIKE $1' : ''}
        GROUP BY k.knowledge_id, u.email, u.name, u.nickname, k.knowledge_title, k.knowledge_content, k.thumbnail_url, k.create_at
        ORDER BY k.create_at DESC;
      `;
      const knowledgesQueryResult = title ? (
        await client.query(knowledgesQuery, [searchPattern])
      ) : (
        await client.query(knowledgesQuery)
      );
      client.release();
      return res.status(200).json(knowledgesQueryResult.rows);
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}

interface CustomApiRequest extends NextApiRequest {
  query: {
    title: string;
  }
}