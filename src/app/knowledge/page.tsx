import Link from "next/link";

import Layout from "../_components/layouts/Layout";
import Title from "../_components/Title";
import TopKnowledgeSection from "./_components/TopKnowledgeSection";

export default async function Knowledge() {
  return (
    <Layout className="bg-dark-white">
      <main className="w-full mx-auto pt-10 md:w-[1000px]">
        <section className="flex justify-between items-center">
          <Title>공간 지식</Title>
          <Link
            className="bg-default text-white px-4 py-3 rounded-md"
            href="/knowledge/add"
          >지식작성</Link>
        </section>
        <TopKnowledgeSection />
      </main>
    </Layout>
  );
}
