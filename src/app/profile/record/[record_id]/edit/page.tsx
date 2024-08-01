import Layout from "@/app/_components/layouts/Layout";
import ProfileNavigation from "../../../_components/ProfileNavigation";
import ProfileRecordEditMain from "./_components/ProfileRecordEditMain";

export default async function ProfileRecordEdit({ params }: PageProps) {
  return (
    <Layout className="flex justify-center">
      <article className="flex mt-20">
        <div className="hidden md:block">
          <ProfileNavigation />
        </div>
        <ProfileRecordEditMain recordId={params.record_id} />
      </article>
    </Layout>
  );
}

interface PageProps {
  params: { record_id: string }
}
