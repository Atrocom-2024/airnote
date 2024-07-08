import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { pool } from "@/utils/database";
import { generateRandomString } from "@/utils/modules";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: CustomApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const token = await getToken({ req, secret });
  
      // Unauthorized
      if (!token) {
        return res.status(401).send('접근 권한 없음');
      }

      const { id, kind } = req.query;
      const client = await pool.connect();
      const userInfoQuery = `SELECT id FROM USERS_TB WHERE email = $1;`;
      const userInfoQueryResult = await client.query(userInfoQuery, [token.email]);

      if (!userInfoQueryResult.rows.length) {
        return res.status(401).send('접근 권한 없음');
      }

      const postId = id;
      const userId = userInfoQueryResult.rows[0].id;
      const actionType = kind === 'like' ? 'like' : 'dislike';
      const oppositeActionType = kind === 'like' ? 'dislike' : 'like';

      // 이미 반응이 있는지 확인
      const reactionQuery = `
        SELECT * FROM REACTION_TB
        WHERE post_id = $1 AND user_id = $2 AND reaction_type = $3;
      `;
      const reactionResult = await client.query(reactionQuery, [postId, userId, actionType]);
      
      if (reactionResult.rows.length > 0) {
        // 이미 좋아요/싫어요를 클릭했다면 취소
        const deleteQuery = `
          DELETE FROM REACTION_TB
          WHERE post_id = $1 AND user_id = $2 AND reaction_type = $3;
        `;
        await client.query(deleteQuery, [postId, userId, actionType]);
      } else {
        // 반대 반응이 있는지 확인하고 제거
        const oppositeReactionResult = await client.query(reactionQuery, [postId, userId, oppositeActionType]);
    
        if (oppositeReactionResult.rows.length > 0) {
          const deleteOppositeQuery = `
            DELETE FROM REACTION_TB
            WHERE post_id = $1 AND user_id = $2 AND reaction_type = $3;
          `;
          await client.query(deleteOppositeQuery, [postId, userId, oppositeActionType]);
        }

        // 새로운 반응 추가
        const reactionId = generateRandomString(20);
        const insertQuery = `
          INSERT INTO REACTION_TB (reaction_id, post_id, user_id, reaction_type, create_at)
          VALUES ($1, $2, $3, $4, NOW());
        `;
        await client.query(insertQuery, [reactionId, postId, userId, actionType]);
        client.release();
      }
      return res.status(200).json({ message: '성공적으로 업데이트 되었습니다.' });
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}

interface CustomApiRequest extends NextApiRequest {
  query: {
    id: string;
    kind: 'like' | 'dislike';
  }
}
