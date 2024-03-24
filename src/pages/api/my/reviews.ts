import { NextApiRequest, NextApiResponse } from "next";
import { Db } from "mongodb";

import { connectDB } from "@/utills/database";
import { decrypt } from "@/utills/modules";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { user } = req.query;

  // Forbidden
  if (!user || typeof(user) !== 'string') {
    return res.status(403).send('접근 금지');
  }

  switch (req.method) {
    case 'GET':
      const decrypted_user = decrypt(decodeURIComponent(user), process.env.NEXT_PUBLIC_AES_EMAIL_SECRET_KEY);
      try {
        const db: Db = await connectDB();
        const reviews = await db.collection('reviews_data').find(
          { author_email: decrypted_user },
          {
            projection: {
              latitude: 0,
              longitude: 0,
              auth_file: 0
            }
          }
        ).toArray();
        return res.status(200).json(reviews);
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류')
      }
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}
