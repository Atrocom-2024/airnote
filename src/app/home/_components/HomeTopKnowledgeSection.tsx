'use client'

import { useTopKnowledges } from "@/app/_lib/hooks";
import LoadingUI from "@/app/_components/LoadingUI";
import HomeTopKnowledgeCard from "./HomeTopKnowledgeCard";

export default function HomeTopKnowledgeSection() {
  const { data: topKnowledges, isPending } = useTopKnowledges(6);

  if (isPending || !topKnowledges) {
    return <LoadingUI />;
  }

  return (
    <section>
      <article className="w-full h-[60px] rounded-lg bg-default text-white text-lg font-semibold px-5 py-4">공간지식</article>
      <article className="mt-5">
        {topKnowledges.map((topKnowledge) => (
          <HomeTopKnowledgeCard topKnowledge={topKnowledge} key={topKnowledge.knowledge_id} />
        ))}
      </article>
    </section>
  );
}