'use client'

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
      <article className="w-full h-[60px] rounded-lg bg-default text-white text-lg font-semibold px-5 py-4">공간기록</article>
      <article className="mt-5">
        {topReviews.map((topReview) => (
          <HomeTopRecordCard topReview={topReview} key={topReview.post_id} />
        ))}
      </article>
    </section>
  );
}