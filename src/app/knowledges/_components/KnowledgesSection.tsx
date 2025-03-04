'use client';

import Link from "next/link";

import { useKnowledges } from "@/app/_lib/hooks";
import LoadingUI from "@/app/_components/LoadingUI";
import KnowledgeCard from "./KnowledgeCard";

export default function KnowledgeSection() {
  const { data: knowledges, isPending } = useKnowledges();
  
  if (isPending || !knowledges) {
    return <LoadingUI />;
  }

  return (
    <section className="basis-[70%] flex-2 mt-10">
      <section className="flex border-b border-light-gray text-gray text-lg font-semibold">
        <Link className="px-5 py-2 border-b-2 border-black text-black" href="/knowledges">전체</Link>
      </section>
      <section className="mt-5">
        {knowledges.map((knowledgeInfo) => (
          <KnowledgeCard knowledgeInfo={knowledgeInfo} key={knowledgeInfo.knowledge_id} />
        ))}
      </section>
    </section>
  );
}