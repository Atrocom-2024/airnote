import { NextApiRequest, NextApiResponse } from "next";

import { pool } from "@/utils/database";

export default async function handler(req: CustomApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      const { q } = req.query;

      if (!q || typeof q !== 'string') {
        return res.status(400).send('검색어가 필요합니다');
      }
      const searchPattern = `%${decodeURIComponent(q)}%`;
      const client = await pool.connect();
      const suggestAddressQuery = `
        SELECT DISTINCT ON (address)
          post_id,
          address,
          latitude,
          longitude
        FROM RECORD_TB
        WHERE address ILIKE $1;
      `;
      const suggestAddressQueryResult = await client.query(suggestAddressQuery, [searchPattern]);
      client.release();
      return res.status(200).json(suggestAddressQueryResult.rows);
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}

interface CustomApiRequest extends NextApiRequest {
  query: {
    q: string;
  }
}