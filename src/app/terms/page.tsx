import Layout from "../_components/layouts/Layout";
import Title from "../_components/Title";
import TermsDetail from "./_components/TermsDetail";
import PrivacyDetail from "./_components/PrivacyDetail";
import BackBtn from "./_components/BackBtn";

export default function TermsPage() {
  return (
    <Layout>
      <main className="w-full px-5 pt-10 pb-10 md:mx-auto md:w-[600px]">
        <section>
          <Title>공기수첩 이용약관</Title>
          <article className="mt-5">
            <TermsDetail />
          </article>
        </section>
        <section className="mt-10">
          <Title>공기수첩 개인정보처리방침</Title>
          <article className="mt-5">
            <PrivacyDetail />
          </article>
        </section>
        <BackBtn />
      </main>
    </Layout>
  );
}