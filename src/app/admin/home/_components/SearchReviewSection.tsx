'use client'

import { useState } from "react";
import { IoSearch } from "react-icons/io5";

import { useReviewSearch } from "@/app/_lib/hooks";
import PartLoadingUI from "@/app/_components/PartLoadingUI";
import AdminReviewCard from "./AdminReivewCard";

export default function SearchReviewSection() {
  const [keyword, setKeyword] = useState<string>('');
  const { data: reviews, isPending, refetch } = useReviewSearch(keyword);
  const keywordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const searchKeyPressHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      refetch();
    }
  }
  return (
    <section className="p-10 col-span-8 overflow-y-auto md:col-span-9 lg:col-span-10">
      <article className="flex items-center">
        <section className="font-bold text-default text-2xl mr-5">공간 기록 관리</section>
        <section className="w-[350px] relative border-[1.5px] border-default rounded-full">
          <input
            className="h-[5vh] px-5 rounded-full outline-none"
            value={keyword}
            onChange={keywordChangeHandler}
            onKeyDown={searchKeyPressHandler}
            placeholder="주소를 입력해주세요."
          />
          <IoSearch className="absolute top-1/2 right-3 -translate-y-1/2" size="30" color="#4A68F5" />
        </section>
      </article>
      <article className="min-h-[500px] mt-10 flex justify-center items-center">
        <div className="space-y-10">
          {isPending ? <PartLoadingUI /> : (
            reviews && reviews.length ? reviews.map((review) => (
              <AdminReviewCard review={review} key={review.post_id} />
            )) : (
              <section className="text-default font-bold text-xl">기록이 없습니다. 주소로 검색해주세요.</section>
            )
          )}
        </div>
      </article>
    </section>
  );
}
