'use client';

import { useTopKnowledges } from "@/app/_lib/hooks";
import TopKnowledgeCard from "./TopKnowledgeCard";
import LoadingUI from "@/app/_components/LoadingUI";

export default function TopKnowledgeSection() {
  const { data: topKnowledges, isPending } = useTopKnowledges(3);

  if (isPending) {
    return <LoadingUI />;
  }

  return (
    <section className="min-h-full basis-[30%] flex-1 border-l border-light-gray mt-10 pl-5">
      <section className="text-light-black text-sm">인기있는 글</section>
      <section className="mt-5">
        {topKnowledges && topKnowledges.map((knowledgeInfo) => (
          <TopKnowledgeCard knowledgeInfo={knowledgeInfo} key={knowledgeInfo.knowledge_id} />
        ))}
      </section>
    </section>
  );
}