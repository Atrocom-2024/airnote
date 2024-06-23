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
      const searchPattern = new RegExp(decodeURIComponent(q), 'i');
      const db: Db = await connectDB();
      const searchResults = await db.collection('reviews_data').find(
        { address: { $regex: searchPattern } },
        { projection: { author_email: 0 } }
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