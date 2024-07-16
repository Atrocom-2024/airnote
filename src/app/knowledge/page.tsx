import Link from "next/link";

import { getTopKnowledges } from "../_lib/api";
import Layout from "../_components/layouts/Layout";
import Title from "../_components/Title";
import TopKnowledgeCard from "./_components/TopKnowledgeCard";

export default async function Knowledge() {
  const topKnowledges: topKnowledgeType[] = await getTopKnowledges();

  return (
    <Layout>
      <main className="w-full mx-auto mt-10 space-y-10 md:w-[1000px]">
        <section className="flex justify-between items-center">
          <Title>공간 지식</Title>
          <Link
            className="bg-default text-white px-4 py-3 rounded-md" href="/knowledge/add"
          >지식작성</Link>
        </section>
        <section>
          <section className="text-default text-xl font-bold">실시간 인기 지식</section>
          <section className="w-full grid grid-cols-3 mt-5">
            {topKnowledges.map((knowledgeInfo) => (
              <TopKnowledgeCard knowledgeInfo={knowledgeInfo} key={knowledgeInfo.knowledge_id} />
            ))}
          </section>
        </section>
      </main>
    </Layout>
  );
}

interface topKnowledgeType {
  knowledge_id: string;
  author_nickname: string;
  knowledge_title: string;
  knowledge_content: string;
  thumbnail_url: string;
  create_at: Date;
}