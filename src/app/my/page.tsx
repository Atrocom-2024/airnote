import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Layout from "../_components/layouts/Layout";
import MyMain from "./_components/MyMain";

export default async function My() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return redirect('/home');
  }
  
  return (
    <Layout className="relative h-auto min-h-[84vh] bg-dark-white py-10 md:py-20">
      <MyMain email={session.user.email} />
    </Layout>
  );
}
