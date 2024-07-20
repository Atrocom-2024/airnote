'use client'

import Link from "next/link";

import { useTopReviews } from "@/app/_lib/hooks";
import LoadingUI from "@/app/_components/LoadingUI";
import HomeTopRecordCard from "./HomeTopRecordCard";

export default function HomeTopRecordSection() {
  const { data: topReviews, isPending } = useTopReviews(6);

  if (isPending || !topReviews) {
    return <LoadingUI />;
  }

  return (
    <section>
      <article className="w-full h-[60px] rounded-lg border border-default text-default text-lg font-semibold px-5 py-4 transition-all hover:bg-default hover:text-white">
        <Link className="w-full h-full flex justify-between items-center" href="/record">
          <div>공간기록</div>
          <div className="text-sm font-medium">더보기</div>
        </Link>
      </article>
      <article className="mt-5">
        {topReviews.map((topReview) => (
          <HomeTopRecordCard topReview={topReview} key={topReview.post_id} />
        ))}
      </article>
    </section>
  );
}