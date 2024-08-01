import Layout from "@/app/_components/layouts/Layout";
import ProfileNavigation from "../_components/ProfileNavigation";
import ProfileRecordMain from "./_components/ProfileRecordMain";

export default async function ProfileRecord() {
  return (
    <Layout className="flex justify-center">
      <article className="flex mt-20">
        <div className="hidden md:block">
          <ProfileNavigation />
        </div>
        <ProfileRecordMain />
      </article>
    </Layout>
  );
}
