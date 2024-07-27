import Layout from "../_components/layouts/Layout";
import HomeTopKnowledgeSection from "./_components/HomeTopKnowledgeSection";
import HomeTopRecordSection from "./_components/HomeTopRecordSection";
import HomeCarousel from "./_components/HomeCarousel";

export default function Home() {
  return (
    <Layout>
      <article>
        <HomeCarousel />
      </article>
      <main className="w-full mx-auto px-5 pt-10 pb-20 md:w-[1000px]">
        <article className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <HomeTopRecordSection />
          <HomeTopKnowledgeSection />
        </article>
      </main>
    </Layout>
  );
}