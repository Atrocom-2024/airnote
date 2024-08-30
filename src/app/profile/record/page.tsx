import Layout from "@/app/_components/layouts/Layout";
import ProfileNavigation from "../_components/ProfileNavigation";
import ProfileRecordMain from "./_components/ProfileRecordMain";

export default async function ProfileRecord() {
  return (
    <Layout className="px-5 md:flex md:justify-center md:px-0">
      <article className="md:flex mt-20">
        <div className="hidden md:block">
          <ProfileNavigation />
        </div>
        <ProfileRecordMain />
      </article>
    </Layout>
  );
}
