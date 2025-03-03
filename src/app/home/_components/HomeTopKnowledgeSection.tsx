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
      <article className="w-full block rounded-lg border border-default px-5 py-4 transition-all">
        <div className="w-full h-full">
          <div className="text-default text-lg font-semibold">공간지식</div>
          <div className="text-sm text-dark-gray my-3">전문가 사용자가 일반 사용자들에게 지식을 공유할 수 있는 서비스입니다.</div>
          <Link className="block bg-dark-white text-center text-sm rounded-lg py-3" href="/knowledges">지식 보러가기</Link>
        </div>
      </article>
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