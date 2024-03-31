import { NextApiRequest, NextApiResponse } from "next";
import { Db } from "mongodb";

import { connectDB } from "@/utills/database";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });
  
  // Unauthorized
  if (!token) {
    return res.status(401).send('접근 권한 없음');
  }

  switch (req.method) {
    case 'POST':
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

        // insert 할 데이터 형식
        const insert_data = {
          author_email: token.email,
          author_name: token.name,
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

        const db: Db = await connectDB();
        const userInfo = await db.collection('reviews_data').insertOne(insert_data);
        return res.status(201).json(insert_data);
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류');
      }
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}

interface BodyTypes {
  address: string;
  address_detail: string;
  content: string;
  auth_file: FileList | null;
  encoded_auth_file: string;
}