import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { ResultSetHeader, RowDataPacket } from "mysql2";

import { pool } from "@/utils/database";
import { generateRandomString } from "@/utils/modules";

const secret = process.env.NEXT_AUTH_SECRET;

interface BodyTypes {
  knowledge_title: string;
  knowledge_content: string;
  thumbnail_url: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        return await getKnowledges(res);
      case 'POST':
        return await createKnowledge(req, res);
      default:
        return res.status(405).send('잘못된 요청 메서드');
    }
  } catch (err) {
    console.error("API Error:", err);
    return res.status(500).send("내부 서버 오류");
  }
}

async function getKnowledges(res: NextApiResponse) {
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
  const [rows] = await pool.query<RowDataPacket[]>(knowledgesQuery);

  return res.status(200).json(rows);
}

async function createKnowledge(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });
    
  // Unauthorized
  if (!token || !token.email) {
    return res.status(401).send('접근 권한 없음');
  }
  
  const body: BodyTypes = req.body;
  const userCheckQuery = 'SELECT id FROM USERS_TB WHERE email = ?';
  const [userRows] = await pool.query<RowDataPacket[]>(userCheckQuery, [token.email]);

  const authorId = userRows[0].id;
  const knowledgeId = generateRandomString();

  if (!authorId) {
    return res.status(401).send('접근 권한 없음');
  }
  
  const knowledgeInsertQuery = `
    INSERT INTO KNOWLEDGE_TB (knowledge_id, author_id, knowledge_title, knowledge_content, thumbnail_url)
    VALUES (?, ?, ?, ?, ?)
    RETURNING knowledge_id
  `;

  const knowledgeInsertValues = [
    knowledgeId,
    authorId,
    body.knowledge_title,
    body.knowledge_content,
    body.thumbnail_url
  ];
  const [result] = await pool.query<ResultSetHeader>(knowledgeInsertQuery, knowledgeInsertValues);
  
  if (result.affectedRows === 1) {
    // 성공 시 생성된 ID 반환
    return res.status(201).json({ knowledge_id: knowledgeId });
  } else {
    throw new Error("게시글 생성 실패");
  }
}