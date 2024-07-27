'use client'

import Link from "next/link";

import { useTopRecords } from "@/app/_lib/hooks";
import LoadingUI from "@/app/_components/LoadingUI";
import HomeTopRecordCard from "./HomeTopRecordCard";

export default function HomeTopRecordSection() {
  const { data: topRecords, isPending } = useTopRecords(6);

  if (isPending || !topRecords) {
    return <LoadingUI />;
  }

  return (
    <section>
      <Link
        className="w-full h-[60px] block rounded-lg border border-default text-default text-lg font-semibold px-5 py-4 transition-all hover:bg-default hover:text-white"
        href="/record"
      >
        <div className="w-full h-full flex justify-between items-center">
          <div>공간기록</div>
          <div className="text-sm font-medium">더보기</div>
        </div>
      </Link>
      <article className="mt-5">
        {topRecords.map((topRecord, idx) => {
          if (topRecords.length - 1 === idx) {
            return <HomeTopRecordCard topRecord={topRecord} isLast={true} key={topRecord.post_id} />;
          } else {
            return <HomeTopRecordCard topRecord={topRecord} isLast={false} key={topRecord.post_id} />;
          }
        })}
      </article>
    </section>
  );
}