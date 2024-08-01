import { NextApiRequest, NextApiResponse } from "next";

import { pool } from "@/utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { limit } = req.query;
      try {
        const client = await pool.connect();
        const topReviewsQuery = `
          SELECT
            r.post_id,
            CASE WHEN u.nickname IS NULL THEN '(탈퇴 사용자)' ELSE u.nickname END as author_nickname,
            r.address,
            r.address_detail,
            r.latitude,
            r.longitude,
            r.content,
            SUM(CASE WHEN rt.reaction_type = 'like' THEN 1 ELSE 0 END) AS likes,
            SUM(CASE WHEN rt.reaction_type = 'dislike' THEN 1 ELSE 0 END) AS dislikes,
            r.create_at
          FROM RECORD_TB r
          LEFT JOIN USERS_TB u ON r.author_id = u.id
          LEFT JOIN REACTION_TB rt ON r.post_id = rt.post_id
          GROUP BY r.post_id, u.nickname, r.address, r.address_detail, r.content, r.latitude, r.longitude, r.create_at
          ORDER BY likes DESC
          LIMIT $1;
        `
        const topReviewsQueryResult = await client.query(topReviewsQuery, [limit]);
        client.release();
        return res.status(200).json(topReviewsQueryResult.rows);
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류');
      }
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}