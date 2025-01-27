import { NextApiRequest, NextApiResponse } from "next";

import { pool } from "@/utils/database";

export default async function handler(req: CustomApiRequest, res: NextApiResponse) {
  let client;
  
  try {
    switch (req.method) {
      case 'GET':
        client = await pool.connect();
        const { sw_lat, sw_lng, ne_lat, ne_lng } = req.query;
        const swLatNum = parseFloat(sw_lat);
        const swLngNum = parseFloat(sw_lng);
        const neLatNum = parseFloat(ne_lat);
        const neLngNum = parseFloat(ne_lng);
        const markerInfoQuery = `
          SELECT post_id, address, latitude, longitude
          FROM RECORD_TB
          WHERE latitude BETWEEN $1 AND $2 AND longitude BETWEEN $3 AND $4;
        `;
        const locationValues = [swLatNum, neLatNum, swLngNum, neLngNum];
        const markerInfoQueryResult = await client.query(markerInfoQuery, locationValues);
        
        return res.status(200).json(markerInfoQueryResult.rows);
      default:
        return res.status(405).send('잘못된 요청 메서드');
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("내부 서버 오류");
  } finally {
    client?.release();
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