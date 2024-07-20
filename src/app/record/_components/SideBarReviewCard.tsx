'use client'

import { CgProfile } from "react-icons/cg";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

import { parseDate } from "@/utils/modules";

export default function SideBarReviewCard({ review }: PropsType) {
  const reviewContent = review.content.split('\n');

  // TODO: 낙관적 업데이트
  const reactionClickHandler = async (kind: 'like' | 'dislike') => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const uri = `${domain}/api/reviews/${review.post_id}/reactions?kind=${kind}`;

    try {
      const res = await fetch(uri, { method: 'POST' });

    } catch (err) {
      // TODO: 낙관적 업데이트 취소
      return alert('좋아요 실패');
    }
  }

  return (
  <article className="border-b-[1.5px] border-default p-3">
    <section className="flex justify-between items-center">
      <div className="flex items-center">
        <div>
          <CgProfile size="30" color="#AFAFAF" />
        </div>
        <div className="text-gray text-sm ml-1">{review.author_nickname}</div>
        <div className="text-default font-bold ml-2">{review.address_detail}</div>
      </div>
      <div className="text-gray text-sm">{ parseDate(review.create_at) }</div>
    </section>
    <section className="px-2 my-5 text-sm">
      {reviewContent.map((content, idx) => {
        if (!content) {
          return <br key={idx} />;
        }
        return <p className="break-words" key={idx}>{content}</p>;
      })}
    </section>
    <section className="flex justify-end items-center mr-5 text-gray">
      <div className="flex items-center mr-3">
        <button onClick={() => reactionClickHandler('like')}>
          <AiOutlineLike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
        </button>
        <div className="text-xs ml-1 sm:text-sm">{ review.likes }</div>
      </div>
      <div className="flex items-center">
        <button onClick={() => reactionClickHandler('dislike')}>
          <AiOutlineDislike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
        </button>
        <div className="text-xs ml-1 sm:text-sm">{ review.dislikes }</div>
      </div>
    </section>
  </article>
  );
}

interface PropsType {
  review: ReviewType;
}

interface ReviewType {
  post_id: string;
  author_nickname: string;
  address: string;
  address_detail: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: Date;
}