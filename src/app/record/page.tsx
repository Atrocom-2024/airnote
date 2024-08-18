import Layout from "../_components/layouts/Layout";
import RecordAddLink from "../_components/RecordAddLink";
import RecordMain from "./_components/RecordMain";

export default function Record() {
  return (
    <Layout className="relative">
      <RecordMain />
      <article className="fixed right-7 bottom-7 z-30 md:right-10 md:bottom-10">
        <RecordAddLink />
      </article>
    </Layout>
  );
}
