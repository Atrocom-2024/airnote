import Layout from "../_components/layouts/Layout";
import Title from "../_components/Title";
import TermsDetail from "./_components/TermsDetail";
import BackBtn from "./_components/BackBtn";

export default function TermsPage() {
  return (
    <Layout>
      <main className="w-full px-5 pt-10 pb-10 md:mx-auto md:w-[600px]">
        <Title>공기수첩 이용약관</Title>
        <article className="mt-10">
          <TermsDetail />
        </article>
        <BackBtn />
      </main>
    </Layout>
  );
}