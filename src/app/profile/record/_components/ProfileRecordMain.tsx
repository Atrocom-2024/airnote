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
    <main className="md:w-[620px] md:ml-20">
      <Title>공간기록 관리</Title>
      <section className="mt-20">
        <article className="text-lg font-semibold mb-5">내가 쓴 공간기록</article>
        {myRecord.length ? (
          <article>
            {myRecord.map((recordInfo) => (
              <ProfileRecordCard recordInfo={recordInfo} key={recordInfo.post_id} />
            ))}
          </article>
        ) : (
          <article className="flex justify-center mt-20">
            <div className="text-default text-lg font-bold">작성된 공간기록이 없습니다.</div>
          </article>
        )}
      </section>
    </main>
  );
}
