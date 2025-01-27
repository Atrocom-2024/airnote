import { NextApiRequest, NextApiResponse } from "next";

import { pool } from "@/utils/database";

export default async function handler(req: CustomApiRequest, res: NextApiResponse) {
  let client;
  
  try {
    switch (req.method) {
      case 'GET':
        const { q } = req.query;
  
        if (!q || typeof q !== 'string') {
          return res.status(400).send('검색어가 필요합니다');
        }

        client = await pool.connect();
        const searchPattern = `%${decodeURIComponent(q)}%`;
        const searchQuery = `
          SELECT 
            r.post_id,
            r.address,
            r.address_detail,
            r.latitude,
            r.longitude,
            r.content,
            SUM(CASE WHEN rt.reaction_type = 'like' THEN 1 ELSE 0 END) AS likes,
            SUM(CASE WHEN rt.reaction_type = 'dislike' THEN 1 ELSE 0 END) AS dislikes,
            r.create_at
          FROM RECORD_TB r
          LEFT JOIN REACTION_TB rt ON r.post_id = rt.post_id
          WHERE r.address ILIKE $1
          GROUP BY r.post_id, r.address, r.address_detail, r.latitude, r.longitude, r.content, r.create_at;
        `;
        const searchQueryResult = await client.query(searchQuery, [searchPattern]);
        
        return res.status(200).json(searchQueryResult.rows);
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
    q: string;
  }
}