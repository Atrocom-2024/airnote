import Layout from "../_components/layouts/Layout";
import AdminLoginForm from "./_components/AdminLoginForm";

export default function Admin() {
  return (
    <Layout className="flex justify-center items-center">
      <section className="mx-auto mb-20 flex flex-col justify-center items-center rounded-lg sm:py-32 sm:border-[1.5px] sm:border-default sm:px-20">
        <div className="text-2xl text-default font-bold mb-16">관리자 로그인</div>
        <AdminLoginForm />
      </section>
    </Layout>
  );
}

async function tokenConfirm() {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const res = await fetch(`${domain}/api/admin/verify`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}
