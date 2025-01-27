import Layout from "../_components/layouts/Layout";
import Title from "../_components/Title";
import TopKnowledgeSection from "./_components/TopKnowledgeSection";
import KnowledgeSection from "./_components/KnowledgesSection";
import AddKnowledgeBtn from "./_components/AddKnowledgeBtn";

export default async function Knowledge() {
  return (
    <Layout className="pb-36">
      <main className="w-full mx-auto mt-20 px-5 lg:px-0 lg:w-[1000px]">
        <section className="flex justify-between items-center">
          <Title>공간지식</Title>
          <AddKnowledgeBtn />
        </section>
        <TopKnowledgeSection />
        <KnowledgeSection />
      </main>
    </Layout>
  );
}
