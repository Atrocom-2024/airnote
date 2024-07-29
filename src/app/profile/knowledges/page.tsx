import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Layout from "@/app/_components/layouts/Layout";
import ProfileNavigation from "../_components/ProfileNavigation";
import ProfileKnowledgesMain from "./_components/ProfileKnowledgesMain";

export default async function ProfileKnowledges() {
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
        <ProfileKnowledgesMain email={session.user.email} />
      </article>
    </Layout>
  );
}
