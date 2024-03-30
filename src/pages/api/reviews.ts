import { NextApiRequest, NextApiResponse } from "next";
import { Db } from "mongodb";

import { connectDB } from "@/utills/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const params = req.query;
      console.log('요청 들어옴!!!');
      console.log(params);
      return res.status(200).json({});
      // try {
      //   const db: Db = await connectDB();
      //   const topReviews = await db.collection('reviews_data').aggregate([
      //     { $sort: { likes: -1 } },
      //     { $limit: 4 },
      //     { $project: { _id: 1, address: 1, address_detail: 1, latitude: 1, longitude: 1, content: 1, likes: 1, dislikes: 1, create_at: 1 } }
      //   ]).toArray();
      //   return res.status(200).json(topReviews);
      // } catch (err) {
      //   console.error(err);
      //   return res.status(500).send('내부 서버 오류');
      // }
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}