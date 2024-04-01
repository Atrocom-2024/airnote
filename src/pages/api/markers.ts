import { NextApiRequest, NextApiResponse } from "next";
import { Db } from "mongodb";

import { connectDB } from "@/utills/database";

export default async function handler(req: CustomApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { sw_lat, sw_lng, ne_lat, ne_lng } = req.query;
      const swLatNum = parseFloat(sw_lat);
      const swLngNum = parseFloat(sw_lng);
      const neLatNum = parseFloat(ne_lat);
      const neLngNum = parseFloat(ne_lng);
      try {
        const db: Db = await connectDB();
        const markerInfo = await db.collection('reviews_data').find(
          {
            latitude: { $gte: swLatNum, $lte: neLatNum },
            longitude: { $gte: swLngNum, $lte: neLngNum },
          },
          { projection: { address: 1, latitude: 1, longitude: 1 } }
        ).toArray();
        return res.status(200).json(markerInfo);
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
    sw_lat: string;
    sw_lng: string;
    ne_lat: string;
    ne_lng: string;
  }
}