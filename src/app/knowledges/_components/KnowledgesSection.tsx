'use client';

import { useKnowledges } from "@/app/_lib/hooks";
import LoadingUI from "@/app/_components/LoadingUI";
import KnowledgeCard from "./KnowledgeCard";

export default function KnowledgeSection() {
  const { data: knowledges, isPending } = useKnowledges();
  
  if (isPending || !knowledges) {
    return <LoadingUI />;
  }

  return (
    <section className="mt-10">
      <section className="text-light-black text-xl font-bold">전체 지식</section>
      {/* <section className="w-full grid grid-cols-1 gap-5 mt-5 md:grid-cols-2"> */}
      <section className="w-full grid grid-cols-1 gap-5 mt-5">
        {knowledges.map((knowledgeInfo) => (
          <KnowledgeCard knowledgeInfo={knowledgeInfo} key={knowledgeInfo.knowledge_id} />
        ))}
      </section>
    </section>
  );
}