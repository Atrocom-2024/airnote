import Layout from "@/app/_components/layouts/Layout";
import ProfileNavigation from "../_components/ProfileNavigation";
import ProfileInfoMain from "./_components/ProfileInfoMain";

export default async function ProfileInfo() {
  return (
    <Layout className="flex justify-center">
      <article className="flex mt-20">
        <div>
          <ProfileNavigation />
        </div>
        <ProfileInfoMain />
      </article>
    </Layout>
  );
}
