import { NextApiRequest, NextApiResponse } from "next";
import { Db } from "mongodb";

import { connectDB } from "@/utils/database";

export default async function handler(req: CustomApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { address } = req.query;
      if (!address) {
        return res.status(400).send('잘못된 요청 구문');
      }
      const searchPattern = new RegExp(decodeURIComponent(address), 'i');
      const db: Db = await connectDB();
      const reviews = await db.collection('reviews_data').find(
        { address: { $regex: searchPattern } }, { projection: { latitude: 0, longitude: 0 } }
      ).toArray();
      return res.json(reviews);
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}

interface CustomApiRequest extends NextApiRequest {
  query: {
    address: string;
  }
}