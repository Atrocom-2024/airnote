import { NextApiRequest, NextApiResponse } from "next";
import { Db } from "mongodb";

import { connectDB } from "@/utils/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { username } = req.query;
      if (!username) {
        return res.status(400).send('잘못된 요청 구문');
      }
      const db: Db = await connectDB();
      const userInfo = await db.collection('user_data').findOne(
        { name: username }, { projection: { email: 1, name: 1, create_at: 1 } }
      );
      return res.json(userInfo);
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}