import Layout from "../_components/layouts/Layout";
import Title from "../_components/Title";
import TopKnowledgeSection from "./_components/TopKnowledgeSection";
import KnowledgeSection from "./_components/KnowledgesSection";
import AddKnowledgeBtn from "./_components/AddKnowledgeBtn";

export default async function Knowledge() {
  return (
    <Layout className="pb-36">
      <main className="mx-auto mt-20 px-5 lg:px-0 lg:w-[1000px]">
        <section className="flex justify-between items-center">
          <Title>공간지식</Title>
          <div className="hidden lg:block">
            <AddKnowledgeBtn />
          </div>
        </section>
        <section>
          <div className="font-semibold text-middle-gray mt-3">부동산에 대한 각종 지식과 팁을 전해드려요</div>
        </section>
        <section className="mt-10 lg:hidden">
          <AddKnowledgeBtn />
        </section>
        <section className="lg:hidden">
          <TopKnowledgeSection />
        </section>
        <section className="lg:flex lg:gap-10">
          <div>
            <KnowledgeSection />
          </div>
          <div className="hidden lg:block">
            <TopKnowledgeSection />
          </div>
        </section>
      </main>
    </Layout>
  );
}
