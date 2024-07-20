import Layout from "@/app/_components/layouts/Layout";
import KnowledgeDetailMain from "./_components/KnowledgeDetailMain";

export default function KnowledgeDetail({ params }: PageProps) {
  return (
    <Layout className="pb-20 px-5 lg:px-0">
      <KnowledgeDetailMain knowledgeId={params.knowledge_id} />
    </Layout>
  );
}

interface PageProps {
  params: { knowledge_id: string }
}