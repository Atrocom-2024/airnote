import AdminLoginForm from "./_components/AdminLoginForm";
import AdminLayout from "../_components/layouts/AdminLayout";

export default function Admin() {
  return (
    <AdminLayout className="flex justify-center items-center">
      <section className="mx-auto mb-20 flex flex-col justify-center items-center rounded-lg sm:py-32 sm:border-[1.5px] sm:border-default sm:px-20">
        <div className="text-2xl text-default font-bold mb-16">관리자 로그인</div>
        <AdminLoginForm />
      </section>
    </AdminLayout>
  );
}
