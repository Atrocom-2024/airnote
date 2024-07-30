'use client';

import { useProfileRecord } from "@/app/_lib/hooks";
import Title from "@/app/_components/Title";
import ProfileRecordCard from "./ProfileRecordCard";
import LoadingUI from "@/app/_components/LoadingUI";

export default function ProfileRecordMain() {
  const { data: myRecord, isPending } = useProfileRecord();

  if (isPending || !myRecord) {
    return <LoadingUI />
  }

  return (
    <main className="w-[620px] ml-20">
      <Title>공간기록 관리</Title>
      <section className="mt-20">
        <article className="text-lg font-semibold mb-5">내가 쓴 공간기록</article>
        <article>
          {myRecord.map((recordInfo) => (
            <ProfileRecordCard recordInfo={recordInfo} key={recordInfo.post_id} />
          ))}
        </article>
      </section>
    </main>
  );
}
