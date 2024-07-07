import { NextApiRequest, NextApiResponse } from "next";
import { Endpoint, S3 } from "aws-sdk";
import formidable from "formidable";
import fs from 'fs';
import { generateRandomString } from "@/utils/modules";

export const config = {
  api: {
    bodyParser: false
  }
}

const s3 = new S3({
  endpoint: new Endpoint(process.env.NAVER_STORAGE_ENDPOINT),
  region: 'kr-standard',
  credentials: {
    accessKeyId: process.env.NAVER_ACCESS_KEY,
    secretAccessKey: process.env.NAVER_SECRET_KEY
  }
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const form = formidable({});
      const [filed, files] = await form.parse(req);

      if (files.auth_file) {
        const readStream = fs.createReadStream(files.auth_file[0].filepath);
        const fileType = files.auth_file[0].mimetype?.split('/')[1];
        const uploadParams = {
          Bucket: process.env.NAVER_BUCKET_NAME,
          Key: `${generateRandomString(30)}.${fileType}`,
          ACL: 'public-read',
          Body: readStream
        };
        try {
          const result = await s3.upload(uploadParams).promise();
          return res.status(201).json({ auth_file_url: result.Location });
        } catch (err) {
          console.error('S3 업로드 실패', err);
          return res.status(500).send('서버 관련 오류');
        }
      } else {
        res.status(500).send('알 수 없는 오류');
      }
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}
