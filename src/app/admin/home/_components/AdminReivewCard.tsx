'use client'

import PartLoadingUI from "@/app/_components/PartLoadingUI";
import { useDeleteReview } from "@/app/_lib/hooks";
import { parseDate } from "@/utils/modules";
import Image from "next/image";

export default function AdminReviewCard({ review }: PropsType) {
  const { mutate, isPending } = useDeleteReview();

  return (
    <article className="w-[700px] rounded-md border-[1.5px] border-default flex items-center p-5">
      <section className="mr-3 w-[30%]">
        <Image
          className="w-[200px] h-[250px] border border-gray rounded-md object-cover"
          src={review.auth_file}
          width={400}
          height={0}
          alt="인증파일"
        />
      </section>
      <section className="w-[70%]">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="font-bold text-default text-lg">{review.address}</div>
            <div className="text-dark-gray font-bold ml-2">{review.address_detail}</div>
          </div>
          <div className="text-dark-gray text-sm">{ parseDate(review.create_at) }</div>
        </div>
        <div className="px-2 mt-5 mb-20 text-sm">{review.content}</div>
        <div className="text-end">
          <button
            className="bg-default rounded-md text-white text-sm font-bold px-4 py-2"
            onClick={() => mutate(review._id)}
            disabled={isPending}
          >{isPending ? <PartLoadingUI /> : '기록제거'}</button>
        </div>
      </section>
    </article>
  );
}

interface PropsType {
  review: ReviewType
}

interface ReviewType {
  _id: string;
  author_email: string;
  author_name: string;
  address: string;
  address_detail: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: string;
  auth_file: string;
}