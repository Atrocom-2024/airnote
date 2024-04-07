import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { Db, ObjectId, WithId } from "mongodb";

import { connectDB } from "@/utils/database";

const secret = process.env.NEXT_AUTH_SECRET;

export default async function handler(req: CustomApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'POST':
      const token = await getToken({ req, secret });
  
      // Unauthorized
      if (!token) {
        return res.status(401).send('접근 권한 없음');
      }

      const { id, kind } = req.query;
      const db: Db = await connectDB();
      const user_data = await db.collection('user_data').findOne({ email: token.email });

      if (!user_data) {
        return res.status(401).send('접근 권한 없음');
      }

      const reviewsDataAction = kind === 'like' ? 'likes' : 'dislikes';
      const reviewDataOppositeAction = kind === 'like' ? 'dislikes' : 'likes';
      const actionField = kind === 'like' ? 'review_likes' : 'review_dislikes';
      const oppositeField = kind === 'like' ? 'review_dislikes' : 'review_likes';
      const alreadyExists = user_data[actionField]?.includes(id);
      const oppositeExists = user_data[oppositeField]?.includes(id);

      if (alreadyExists) {
        // 이미 좋아요/싫어요를 클릭했다면 취소
        const result_reactions = user_data[actionField].filter((review_id: string) => review_id !== id);
        await db.collection('user_data').updateOne({ email: token.email }, { $set: { [actionField]: result_reactions } });
        await db.collection('reviews_data').updateOne({ _id: new ObjectId(id) }, { $inc: { [reviewsDataAction]: -1 } });
      } else {
        // 싫어요/좋아요를 클릭했다면 취소 후 좋아요/싫어요로 변경
        if (oppositeExists) {
          const result_reactions = user_data[oppositeField].filter((review_id: string) => review_id !== id);
          await db.collection('user_data').updateOne({ email: token.email }, { $set: { [oppositeField]: result_reactions } });
          await db.collection('reviews_data').updateOne({ _id: new ObjectId(id) }, { $inc: { [reviewDataOppositeAction]: -1 } });
        }
        await db.collection('user_data').updateOne({ email: token.email }, { $addToSet: { [actionField]: id } });
        await db.collection('reviews_data').updateOne({ _id: new ObjectId(id) }, { $inc: { [reviewsDataAction]: 1 } });
      }
      return res.status(200).json({ message: '성공적으로 업데이트 되었습니다.' });
    default:
      return res.status(405).send('잘못된 요청 메서드');
  }
}

interface CustomApiRequest extends NextApiRequest {
  query: {
    id: string;
    kind: 'like' | 'dislike';
  }
}
