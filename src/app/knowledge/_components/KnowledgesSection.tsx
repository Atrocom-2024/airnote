'use client';

import { useKnowledges } from "@/app/_lib/hooks";
import LoadingUI from "@/app/_components/LoadingUI";
import KnowledgeCard from "./KnowledgeCard";

export default function KnowledgeSection() {
  const { data: knowledges, isPending } = useKnowledges();
  console.log(knowledges);
  if (isPending || !knowledges) {
    return <LoadingUI />;
  }

  return (
    <section className="mt-10">
      <section className="text-default text-xl font-bold">전체 지식</section>
      <section className="w-full grid grid-cols-2 gap-5 mt-5">
        {knowledges.map((knowledgeInfo) => (
          <KnowledgeCard knowledgeInfo={knowledgeInfo} key={knowledgeInfo.knowledge_id} />
        ))}
      </section>
    </section>
  );
}