import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { pool } from "@/utils/database";
import { generateRandomString } from "@/utils/modules";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: CustomApiRequest, res: NextApiResponse) {
  let client;
  const token = await getToken({ req, secret });

  // Unauthorized
  if (!token) {
    return res.status(401).send('접근 권한 없음');
  }
  
  try {
    switch (req.method) {
      case 'POST':
        client = await pool.connect();
        const { knowledge_id, kind } = req.query;
        const userInfoQuery = `SELECT id FROM USERS_TB WHERE email = $1;`;
        const userInfoQueryResult = await client.query(userInfoQuery, [token.email]);
    
        if (!userInfoQueryResult.rows.length) {
          return res.status(401).send('접근 권한 없음');
        }
    
        const knowledgeId = knowledge_id;
        const userId = userInfoQueryResult.rows[0].id;
        const actionType = kind === 'like' ? 'like' : 'dislike';
        const oppositeActionType = kind === 'like' ? 'dislike' : 'like';
    
        // 이미 반응이 있는지 확인
        const knowledgeReactionQuery = `
          SELECT * FROM KNOWLEDGE_REACTION_TB
          WHERE knowledge_id = $1 AND user_id = $2 AND knowledge_reaction_type = $3;
        `;
        const knowledgeReactionResult = await client.query(knowledgeReactionQuery, [knowledgeId, userId, actionType]);
        
        if (knowledgeReactionResult.rows.length > 0) {
          // 이미 좋아요/싫어요를 클릭했다면 취소
          const deleteQuery = `
            DELETE FROM KNOWLEDGE_REACTION_TB
            WHERE knowledge_id = $1 AND user_id = $2 AND knowledge_reaction_type = $3;
          `;
          const deleteQueryResult = await client.query(deleteQuery, [knowledgeId, userId, actionType]);
          return res.status(200).json({
            success: true,
            message: 'review deleted successfully',
            knowledge_id: deleteQueryResult.rows[0]
          });
        } else {
          // 반대 반응이 있는지 확인하고 제거
          const oppositeReactionResult = await client.query(knowledgeReactionQuery, [knowledgeId, userId, oppositeActionType]);
        
          if (oppositeReactionResult.rows.length > 0) {
            const deleteOppositeQuery = `
              DELETE FROM KNOWLEDGE_REACTION_TB
              WHERE knowledge_id = $1 AND user_id = $2 AND knowledge_reaction_type = $3;
            `;
            await client.query(deleteOppositeQuery, [knowledgeId, userId, oppositeActionType]);
          }
    
          // 새로운 반응 추가
          const reactionId = generateRandomString(20);
          const insertQuery = `
            INSERT INTO KNOWLEDGE_REACTION_TB (
              knowledge_reaction_id,
              knowledge_id,
              user_id,
              knowledge_reaction_type
            )
            VALUES ($1, $2, $3, $4)
            RETURNING knowledge_id;
          `;
          const insertQueryResult = await client.query(insertQuery, [reactionId, knowledgeId, userId, actionType]);
  
          return res.status(200).json({
            success: true,
            message: 'review created successfully',
            knowledge_id: insertQueryResult.rows[0]
          });
        }
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

interface CustomApiRequest extends NextApiRequest {
  query: {
    knowledge_id: string;
    kind: 'like' | 'dislike';
  }
}
