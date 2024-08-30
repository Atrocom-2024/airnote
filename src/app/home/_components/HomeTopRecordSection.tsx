'use client'

import Link from "next/link";

import { useTopRecords } from "@/app/_lib/hooks";
import LoadingUI from "@/app/_components/LoadingUI";
import HomeTopRecordCard from "./HomeTopRecordCard";
import { useSession } from "next-auth/react";

export default function HomeTopRecordSection() {
  const { data: session } = useSession();
  const { data: topRecords, isPending } = useTopRecords(6);

  const linkClickHandler = () => {
    if (!session) {
      return alert('로그인 후 이용 가능합니다.');
    }
  }

  if (isPending || !topRecords) {
    return <LoadingUI />;
  }

  return (
    <section>
      <article className="w-full block rounded-lg border border-default px-5 py-4">
        <div className="w-full h-full">
          <div className="text-default text-lg font-semibold">공간기록</div>
          <div className="text-sm text-dark-gray-gray my-3">지도 위에 건물에 대한 기록을 남길 수 있는 서비스입니다.</div>
          <div className="grid grid-cols-2 gap-5 text-center text-sm">
            <Link className="bg-white-gray rounded-lg py-3" href="/record">기록 보러가기</Link>
            <Link
              className="block bg-default text-white rounded-lg py-3"
              href="/record/add"
              onClick={linkClickHandler}
            >기록 작성하기</Link>
          </div>
        </div>
      </article>
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