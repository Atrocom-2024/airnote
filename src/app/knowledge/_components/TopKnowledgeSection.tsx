'use client';

import { useTopKnowledges } from "@/app/_lib/hooks";
import TopKnowledgeCard from "./TopKnowledgeCard";
import LoadingUI from "@/app/_components/LoadingUI";

export default function TopKnowledgeSection() {
  const {data: topKnowledges, isPending} = useTopKnowledges();

  if (isPending) {
    return <LoadingUI />;
  }

  return (
    <section className="mt-10">
      <section className="text-default text-xl font-bold">실시간 인기 지식</section>
      <section className="w-full grid grid-cols-3 mt-5">
        {topKnowledges && topKnowledges.map((knowledgeInfo) => (
          <TopKnowledgeCard knowledgeInfo={knowledgeInfo} key={knowledgeInfo.knowledge_id} />
        ))}
      </section>
    </section>
  );
}