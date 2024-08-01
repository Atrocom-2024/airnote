import Layout from "@/app/_components/layouts/Layout";
import ProfileNavigation from "../../../_components/ProfileNavigation";
import ProfileKnowledgeEditMain from "./_components/ProfileKnowledgeEditMain";

export default async function ProfileRecordEdit({ params }: PageProps) {
  return (
    <Layout className="flex justify-center">
      <article className="flex mt-20">
        <div className="hidden md:block">
          <ProfileNavigation />
        </div>
        <ProfileKnowledgeEditMain knowledgeId={params.knowledge_id} />
      </article>
    </Layout>
  );
}

interface PageProps {
  params: { knowledge_id: string }
}
