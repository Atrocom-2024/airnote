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
      <article className="w-full h-[60px] rounded-lg border border-default text-lg text-default font-semibold px-5 py-4 transition-all hover:bg-default hover:text-white">
        <Link className="w-full h-full flex justify-between items-center" href="/knowledges">
          <div>공간지식</div>
          <div className="text-sm font-medium">더보기</div>
        </Link>
      </article>
      <article className="mt-5">
        {topKnowledges.map((topKnowledge) => (
          <HomeTopKnowledgeCard topKnowledge={topKnowledge} key={topKnowledge.knowledge_id} />
        ))}
      </article>
    </section>
  );
}