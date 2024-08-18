import Link from "next/link";

import Layout from "../_components/layouts/Layout";
import Title from "../_components/Title";
import TopKnowledgeSection from "./_components/TopKnowledgeSection";
import KnowledgeSection from "./_components/KnowledgesSection";

export default async function Knowledge() {
  return (
    <Layout className="pb-36">
      <main className="w-full mx-auto pt-10 px-10 lg:px-0 lg:w-[1000px]">
        <section className="flex justify-between items-center">
          <Title>공간지식</Title>
          <Link
            className="bg-default text-white text-sm px-4 py-3 rounded-lg md:text-base"
            href="/knowledges/add"
          >지식작성</Link>
        </section>
        <TopKnowledgeSection />
        <KnowledgeSection />
      </main>
    </Layout>
  );
}
