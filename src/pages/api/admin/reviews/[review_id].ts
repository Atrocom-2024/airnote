import { NextApiRequest, NextApiResponse } from "next";
import { Db, ObjectId } from "mongodb";

import { connectDB } from "@/utils/database";
import { verifyToken } from "@/utils/jwtUtils";

// TODO: 기록 제거 안되는 원인 찾기
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
      const { review_id } = req.query;
      if (!review_id) {
        return res.status(400).send('잘못된 요청 구문');
      }
      const db: Db = await connectDB();
      const deleteReview = await db.collection('review_data').deleteOne({ _id: new ObjectId(review_id) })
      console.log(deleteReview);
      return res.status(200).json(deleteReview);
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}

interface CustomApiRequest extends NextApiRequest {
  query: {
    review_id: string;
  }
}