import { connectDB } from "@/utills/database";
import { Db } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

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