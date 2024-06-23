import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { Db } from "mongodb";

import { connectDB } from "@/utils/database";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: CustomApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { lat, lng } = req.query;
      try {
        const db: Db = await connectDB();
        const reviews = await db.collection('reviews_data').find(
          { latitude: parseFloat(lat), longitude: parseFloat(lng) },
          { projection: { author_email: 0, latitude: 0, longitude: 0, auth_file: 0 } }
        ).toArray();
        return res.status(200).json(reviews);
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류');
      }
    case 'POST':
      const token = await getToken({ req, secret });
  
      // Unauthorized
      if (!token) {
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
        const db: Db = await connectDB();
        const userInfo = await db.collection('user_data').findOne(
          { email: token.email }, { projection: { nickname: 1 } }
        );

        if (userInfo) {
          // insert 할 데이터 형식
          const insert_data = {
            author_email: token.email,
            author_name: userInfo.nickname,
            address: body.address,
            address_detail: body.address_detail,
            latitude: parseFloat(address_json.documents[0].y),
            longitude: parseFloat(address_json.documents[0].x),
            content: body.content,
            likes: 0,
            dislikes: 0,
            create_at: new Date().toLocaleString('ko-KR'),
            auth_file: body.encoded_auth_file,
          }
  
          const insertReview = await db.collection('reviews_data').insertOne(insert_data);
          return res.status(201).json(insert_data);
        }
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
  auth_file: FileList | null;
  encoded_auth_file: string;
}