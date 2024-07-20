import Image from "next/image";

import Layout from "../_components/layouts/Layout";
import HomeTopKnowledgeSection from "./_components/HomeTopKnowledgeSection";
import HomeTopRecordSection from "./_components/HomeTopRecordSection";

export default function Home() {
  return (
    <Layout>
      <article>
        <Image
          className="w-full h-[300px] object-cover md:h-[400px]"
          src="/home-bg-img.jpg"
          width={1900}
          height={0}
          alt="배경이미지"
        />
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