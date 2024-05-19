import Layout from "../_components/layouts/Layout";
import Title from "../_components/Title";
import TermsDetail from "./_components/TermsDetail";

export default function TermsPage() {
  return (
    <Layout>
      <main className="w-full mx-auto py-10 md:w-[600px]">
        <Title>공기수첩 이용약관</Title>
        <article className="mt-10">
          <TermsDetail />
        </article>
      </main>
    </Layout>
  );
}