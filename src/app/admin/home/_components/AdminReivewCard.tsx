'use client'

import Image from "next/image";
import { AiOutlineLoading } from "react-icons/ai";

import { parseDate } from "@/utils/modules";
import { useDeleteReview } from "@/app/_lib/hooks";

export default function AdminReviewCard({ review }: PropsType) {
  const { mutate, isPending } = useDeleteReview();
  const reviewContent = review.content.split('\n');

  return (
    <article className="w-[700px] rounded-md border-[1.5px] border-default flex items-center p-5">
      <section className="mr-3 w-[30%]">
        <Image
          className="w-[200px] h-[250px] border border-gray rounded-md object-cover"
          src={review.auth_file_url ? review.auth_file_url : '/no-file-img.jpg'}
          width={400}
          height={0}
          alt="인증파일"
        />
      </section>
      <section className="w-[70%]">
        <div className="flex justify-between">
          <div>
            <div className="font-bold text-default text-lg">{review.address}</div>
            <div className="text-dark-gray text-sm font-bold">{review.address_detail}</div>
          </div>
          <div className="text-dark-gray text-sm">{ parseDate(review.create_at) }</div>
        </div>
        <div className="px-2 mt-5 mb-10 text-sm">
          {reviewContent.map((content, idx) => {
            if (!content) {
              return <br key={idx} />;
            }
            return <p className="break-words" key={idx}>{content}</p>;
          })}
        </div>
        <div className="space-y-1 text-sm font-bold">
          <div>작성자 이메일: {review.author_email}</div>
          <div>작성자 이름: {review.author_name}</div>
          <div>작성자 닉네임: {review.author_nickname}</div>
        </div>
        <div className="text-end">
          <button
            className="w-[80px] h-[36px] bg-default rounded-md text-white text-sm font-bold text-center py-2"
            onClick={() => mutate(review.post_id)}
            disabled={isPending}
          >{isPending ? <AiOutlineLoading className="animate-spin mx-auto" size="30" color="white" /> : '기록제거'}</button>
        </div>
      </section>
    </article>
  );
}

interface PropsType {
  review: ReviewType
}

interface ReviewType {
  post_id: string;
  author_email: string;
  author_name: string;
  author_nickname: string;
  address: string;
  address_detail: string;
  content: string;
  auth_file_url: string;
  likes: number;
  dislikes: number;
  create_at: Date;
};