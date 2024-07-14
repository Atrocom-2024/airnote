import Link from "next/link";

import Layout from "../_components/layouts/Layout";
import Title from "../_components/Title";

export default function Knowledge() {
  return (
    <Layout>
      <main className="w-full mx-auto mt-10 md:w-[1000px]">
        <section className="flex justify-between items-center">
          <Title>공간 지식</Title>
          <Link
            className="bg-default text-white px-4 py-3 rounded-md" href="/knowledge/add"
          >지식작성</Link>
        </section>
      </main>
    </Layout>
  );
}