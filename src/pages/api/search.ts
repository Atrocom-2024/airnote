import { NextApiRequest, NextApiResponse } from "next";
import { Db } from "mongodb";

import { connectDB } from "@/utils/database";

export default async function handler(req: CustomApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { q } = req.query;

      if (!q || typeof q !== 'string') {
        return res.status(400).send('검색어가 필요합니다');
      }
      console.log(q);
      const searchPattern = new RegExp(decodeURIComponent(q), 'i');
      const db: Db = await connectDB();
      const searchResults = await db.collection('reviews_data').aggregate([
        { $match: { address: { $regex: searchPattern } } }, // 검색 조건에 맞는 문서 필터링
        { 
          $group: { 
            _id: "$address", // address 값으로 그룹화하여 중복 제거
            latitude: { $first: "$latitude" }, // 그룹 내 첫 번째 문서의 latitude 선택
            longitude: { $first: "$longitude" } // 그룹 내 첫 번째 문서의 longitude 선택
          }
        },
        { 
          $project: { 
            _id: 0, // _id 필드 제거
            address: "$_id", // 그룹화된 키(_id)를 address로 이름 변경
            latitude: 1, 
            longitude: 1 
          } 
        }
      ]).toArray();
      return res.status(200).json(searchResults);
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}

interface CustomApiRequest extends NextApiRequest {
  query: {
    q: string;
  }
}