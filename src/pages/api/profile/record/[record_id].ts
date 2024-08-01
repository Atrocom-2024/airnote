import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import { pool } from "@/utils/database";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req, secret });
  const { record_id } = req.query;

  // Forbidden
  if (!token) {
    return res.status(403).send('접근 금지');
  }

  if (!record_id) {
    return res.status(400).send('잘못된 요청 구문');
  }

  switch (req.method) {
    case 'GET':
      try {
        const client = await pool.connect();
        const userRecordDetailQuery = `
          SELECT
            post_id,
            address,
            address_detail,
            content,
            create_at
          FROM RECORD_TB
          WHERE post_id = $1;
        `
        const userRecordDetailQueryResult = await client.query(userRecordDetailQuery, [record_id]);
        client.release();
        return res.status(200).json(userRecordDetailQueryResult.rows[0]);
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류')
      }
    case 'PUT':
      const body = req.body;
      try {
        const client = await pool.connect();
        const userRecordEditQuery = `
          UPDATE RECORD_TB
          SET address = $2, address_detail = $3, content = $4
          WHERE post_id = $1
          RETURNING post_id;
        `;
        const userRecordEditQueryValues = [record_id, body.address, body.address_detail, body.content];
        const userRecordEditQueryResult = await client.query(userRecordEditQuery, userRecordEditQueryValues);
        client.release();
        return res.status(201).json({
          success: true,
          message: 'record edit successfully',
          record_id: userRecordEditQueryResult.rows[0].post_id
        });
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류');
      }
    case 'DELETE':
      try {
        const client = await pool.connect();
        await client.query('BEGIN');
        // REACTION_TB에서 삭제
        await client.query('DELETE FROM REACTION_TB WHERE post_id = $1', [record_id]);
        // RECORD_TB에서 삭제하고 post_id 반환
        const deleteRecordResult = await client.query(
          'DELETE FROM RECORD_TB WHERE post_id = $1 RETURNING post_id',
          [record_id]
        );
        await client.query('COMMIT');
        client.release();
        return res.status(200).json({
          success: true,
          message: 'record delete successfully',
          record_id: deleteRecordResult.rows[0]
        });
      } catch (err) {
        console.error(err);
        return res.status(500).send('내부 서버 오류');
      }
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}