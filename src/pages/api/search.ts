import { connectDB } from "@/utils/database";
import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: CustomApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { q } = req.query;

      if (!q || typeof q !== 'string') {
        return res.status(400).send('검색어가 필요합니다');
      }

      const searchPattern = new RegExp(decodeURIComponent(q), 'i');
      const db: Db = await connectDB();
      console.log(q);
      const searchResults = await db.collection('reviews_data').find(
        { address: { $regex: searchPattern } },
        { projection: { address: 1, latitude: 1, longitude: 1 } }
      ).toArray();
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