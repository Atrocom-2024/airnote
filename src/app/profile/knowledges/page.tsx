import Layout from "@/app/_components/layouts/Layout";
import ProfileNavigation from "../_components/ProfileNavigation";
import ProfileKnowledgesMain from "./_components/ProfileKnowledgesMain";

export default async function ProfileKnowledges() {
  return (
    <Layout className="flex justify-center">
      <article className="flex mt-20">
        <div className="hidden md:block">
          <ProfileNavigation />
        </div>
        <ProfileKnowledgesMain />
      </article>
    </Layout>
  );
}
