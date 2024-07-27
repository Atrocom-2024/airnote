'use client'

import Link from "next/link";

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
      <Link
        className="w-full h-[60px] block rounded-lg border border-default text-lg text-default font-semibold px-5 py-4 transition-all hover:bg-default hover:text-white"
        href="/knowledges"
      >
        <div className="w-full h-full flex justify-between items-center">
          <div>공간지식</div>
          <div className="text-sm font-medium">더보기</div>
        </div>
      </Link>
      <article className="mt-5">
        {topKnowledges.map((topKnowledge, idx) => {
          if (topKnowledges.length - 1 === idx) {
            return <HomeTopKnowledgeCard topKnowledge={topKnowledge} isLast={true} key={topKnowledge.knowledge_id} />;
          } else {
            return <HomeTopKnowledgeCard topKnowledge={topKnowledge} isLast={false} key={topKnowledge.knowledge_id} />;
          }
        })}
      </article>
    </section>
  );
}