import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Layout from "@/app/_components/layouts/Layout";
import ProfileNavigation from "../_components/ProfileNavigation";
import ProfileInfoMain from "./_components/ProfileInfoMain";

export default async function ProfileInfo() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect('/home');
  }

  return (
    <Layout className="flex justify-center">
      <article className="flex mt-20">
        <div>
          <ProfileNavigation />
        </div>
        <ProfileInfoMain email={session.user.email} />
      </article>
    </Layout>
  );
}
