import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const { id } = req.query;
      console.log(id);
      return res.status(200).json({});
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}