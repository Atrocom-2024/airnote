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
    case 'DELETE':
      const { knowledge_id } = req.query;
      if (!knowledge_id) {
        return res.status(400).send('잘못된 요청 구문');
      }
      const client = await pool.connect();
      const deleteKnowledgeQuery = `DELETE FROM KNOWLEDGE_TB WHERE knowledge_id = $1 RETURNING knowledge_id`;
      const deleteQueryResult = await client.query(deleteKnowledgeQuery, [knowledge_id]);
      client.release();
      return res.status(200).json({
        success: true,
        message: 'knowledge deleted successfully',
        updateNickname: deleteQueryResult.rows[0].knowledge_id
      });
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}

interface CustomApiRequest extends NextApiRequest {
  query: {
    knowledge_id: string;
  }
}