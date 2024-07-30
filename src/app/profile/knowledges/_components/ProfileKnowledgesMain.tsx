'use client';

import { useProfileKnowledges } from "@/app/_lib/hooks";
import Title from "@/app/_components/Title";
import LoadingUI from "@/app/_components/LoadingUI";
import ProfileKnowledgeCard from "./ProfileKnowledgeCard";

export default function ProfileKnowledgesMain() {
  const { data: myKnowledges, isPending } = useProfileKnowledges();

  if (isPending || !myKnowledges) {
    return <LoadingUI />;
  }

  return (
    <main className="w-[620px] ml-20">
      <Title>공간지식 관리</Title>
      <section className="mt-20">
        <article className="text-lg font-semibold mb-5">내가 쓴 공간지식</article>
        <article>
          {myKnowledges.map((knowledgeInfo) => (
            <ProfileKnowledgeCard knowledgeInfo={knowledgeInfo} key={knowledgeInfo.knowledge_id} />
          ))}
        </article>
      </section>
    </main>
  );
}
