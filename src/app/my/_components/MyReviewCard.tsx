'use client'

import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

import { parseDate } from "@/utils/modules";

export default function MyReviewCard({ myReview }: PropsType) {
  const myReviewContent = myReview.content.split('\n');

  return (
    <article className="w-full bg-white rounded-lg p-5 mt-8">
      <section className="flex items-center sm:items-end">
        <div className="text-sm text-default font-bold sm:text-xl">{myReview.address}</div>
        <div className="text-xs text-default ml-3 sm:text-sm">{myReview.address_detail}</div>
      </section>
      <section className="mt-5 text-sm sm:text-base">
        {myReviewContent.map((content, idx) => {
          if (!content) {
            return <br key={idx} />;
          }
          return <p className="break-words" key={idx}>{content}</p>;
        })}
      </section>
      <section className="flex justify-end items-center text-gray font-bold mt-5">
        <div className="flex items-center mr-5">
          <div className="flex items-center mr-2">
            <div>
              <AiOutlineLike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </div>
            <div className="text-xs sm:text-sm">{ myReview.likes }</div>
          </div>
          <div className="flex items-center">
            <div>
              <AiOutlineDislike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </div>
            <div className="text-xs sm:text-sm">{ myReview.dislikes }</div>
          </div>
        </div>
        <div className="text-xs sm:text-sm">{ parseDate(myReview.create_at) }</div>
      </section>
    </article>
  );
}

interface PropsType {
  myReview: {
    post_id: string;
    address: string;
    address_detail: string;
    content: string;
    likes: number;
    dislikes: number;
    create_at: Date;
  }
}