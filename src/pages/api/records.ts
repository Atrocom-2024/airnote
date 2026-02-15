import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { ResultSetHeader, RowDataPacket } from "mysql2";

import { pool } from "@/utils/database";
import { generateRandomString } from "@/utils/modules";

const secret = process.env.NEXT_AUTH_SECRET;

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

export default async function handler(req: CustomApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        return getRecords(req, res);
      case 'POST':
        return createRecord(req, res);
      default:
        return res.status(405).send('잘못된 요청 메서드');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("내부 서버 오류");
  }
}

async function getRecords(req: CustomApiRequest, res: NextApiResponse) {
  const { lat, lng } = req.query;
  const recordsQuery = `
    SELECT
      r.post_id,
      CASE WHEN u.nickname IS NULL THEN '(탈퇴 사용자)' ELSE u.nickname END as author_nickname,
      r.address,
      r.address_detail,
      r.content,
      SUM(CASE WHEN rt.reaction_type = 'like' THEN 1 ELSE 0 END) AS likes,
      SUM(CASE WHEN rt.reaction_type = 'dislike' THEN 1 ELSE 0 END) AS dislikes,
      r.create_at
    FROM RECORD_TB r
    LEFT JOIN USERS_TB u ON r.author_id = u.id
    LEFT JOIN REACTION_TB rt ON r.post_id = rt.post_id
    WHERE r.latitude = ? AND r.longitude = ?
    GROUP BY r.post_id, u.nickname, r.address, r.address_detail, r.content, r.create_at
  `;
  const [recordRows] = await pool.query<RowDataPacket[]>(recordsQuery, [parseFloat(lat), parseFloat(lng)]);
  
  return res.status(200).json(recordRows);
}

async function createRecord(req: CustomApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });

  // Unauthorized
  if (!token || !token.email) {
    return res.status(401).send('접근 권한 없음');
  }
  
  const body: BodyTypes = req.body;

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
  const userCheckQuery = 'SELECT id FROM USERS_TB WHERE email = ?';
  const [userRows] = await pool.query<RowDataPacket[]>(userCheckQuery, [token.email]);
  const authorId = userRows[0].id;
  const postId = generateRandomString();

  if (!authorId) {
    return res.status(401).send('접근 권한 없음');
  }
  
  const recordInsertQuery = `
    INSERT INTO RECORD_TB (post_id, author_id, address, address_detail, latitude, longitude, content, auth_file_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
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
  const [recordInsertResult] = await pool.query<ResultSetHeader>(recordInsertQuery, recordInsertValues);

  if (recordInsertResult.affectedRows === 1) {
    return res.status(201).json({ record_id: postId });
  } else {
    throw new Error("기록 생성 실패");
  }
}