'use client'

import { useSession } from "next-auth/react";
import { CgProfile } from "react-icons/cg";
import { HiHandThumbUp, HiHandThumbDown } from "react-icons/hi2";

import { parseDate } from "@/utils/modules";
import { useRecordReaction } from "@/app/_lib/hooks";

export default function SideBarRecordCard({ review }: PropsType) {
  const { data: session } = useSession();
  const { mutate: postRecordLike } = useRecordReaction(review.post_id, 'like');
  const { mutate: postRecordDislike } = useRecordReaction(review.post_id, 'dislike');
  const reviewContent = review.content.split('\n');

  const reactionClickHandler = (reactionType: 'like' | 'dislike') => {
    if (!session) {
      return alert('로그인 후 이용 가능합니다.');
    }
    if (reactionType === 'like') {
      postRecordLike();
    } else {
      postRecordDislike();
    }
  }

  return (
  <article className="border-b border-default p-3">
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
          <HiHandThumbUp className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
        </button>
        <div className="text-xs ml-1 sm:text-sm">{ review.likes }</div>
      </div>
      <div className="flex items-center">
        <button onClick={() => reactionClickHandler('dislike')}>
          <HiHandThumbDown className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
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