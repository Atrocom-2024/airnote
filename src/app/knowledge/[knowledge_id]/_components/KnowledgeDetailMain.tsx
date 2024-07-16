'use client';

import { useKnowledge } from "@/app/_lib/hooks";

export default function KnowledgeDetailMain({ knowledgeId }: PropsType) {
  const {data: knowledge, isPending} = useKnowledge(knowledgeId);

  return (
    <main>
      
    </main>
  );
}

interface PropsType {
  knowledgeId: string;
}