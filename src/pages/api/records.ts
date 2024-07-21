import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { pool } from "@/utils/database";
import { generateRandomString } from "@/utils/modules";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: CustomApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { lat, lng } = req.query;
      try {
        const client = await pool.connect();
        const reviewsQuery = `
          SELECT
            r.post_id,
            u.nickname AS author_nickname,
            r.address,
            r.address_detail,
            r.content,
            SUM(CASE WHEN rt.reaction_type = 'like' THEN 1 ELSE 0 END) AS likes,
            SUM(CASE WHEN rt.reaction_type = 'dislike' THEN 1 ELSE 0 END) AS dislikes,
            r.create_at
          FROM RECORD_TB r
          JOIN USERS_TB u ON r.author_id = u.id
          LEFT JOIN REACTION_TB rt ON r.post_id = rt.post_id
          WHERE r.latitude = $1 AND r.longitude = $2
          GROUP BY r.post_id, u.nickname, r.address, r.address_detail, r.content, r.create_at
        `;
        const reviewsQueryResult = await client.query(reviewsQuery, [parseFloat(lat), parseFloat(lng)]);
        client.release();
        return res.status(200).json(reviewsQueryResult.rows);
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
        // 주소를 통해 위도/경도 좌표 얻기
        const address_res = await fetch(`https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(body.address)}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `KakaoAK ${process.env.KAKAO_CLIENT_ID}`
          }
        });
        const address_json = await address_res.json();

        // 사용자 정보 얻기
        const client = await pool.connect();
        const userCheckQuery = 'SELECT id FROM USERS_TB WHERE email = $1';
        const userCheckResult = await client.query(userCheckQuery, [token.email]);
        const authorId = userCheckResult.rows[0].id;
        const postId = generateRandomString();

        if (!authorId) {
          return res.status(401).send('접근 권한 없음');
        }

        const recordInsertQuery = `
          INSERT INTO RECORD_TB (post_id, author_id, address, address_detail, latitude, longitude, content, auth_file_url)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING post_id
        `;
        const recordInsertValues = [
          postId,
          authorId,
          body.address,
          body.address_detail,
          parseFloat(address_json.documents[0].y),
          parseFloat(address_json.documents[0].x),
          body.content,
          body.auth_file_url
        ];
        const recordInsertResult = await client.query(recordInsertQuery, recordInsertValues);
        client.release();
        return res.status(201).json(recordInsertResult.rows[0]);
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류');
      }
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}

interface CustomApiRequest extends NextApiRequest {
  query: {
    lat: string;
    lng: string;
  }
}

interface BodyTypes {
  address: string;
  address_detail: string;
  content: string;
  auth_file_url: string;
}