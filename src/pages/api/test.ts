import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../_utills/database";
import { Db } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const db: Db = await connectDB();
  const result = await db.collection('user_data').find().toArray();
  console.log(result);
  return res.json({result});
} 