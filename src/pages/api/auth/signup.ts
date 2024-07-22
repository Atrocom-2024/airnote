import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, name, nickname, phone_number } = req.query;
  console.log(req.query);
  return res.status(200);
}