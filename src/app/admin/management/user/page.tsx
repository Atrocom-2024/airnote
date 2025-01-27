import AdminLayout from "../../_components/layouts/AdminLayout";
import AdminSideBar from "../_components/AdminSideBar";
import SearchUserSection from "./_components/SearchUserSection";

export default function ManagementUser() {
  return (
    <AdminLayout className="flex justify-center">
      <article className="md:flex mt-20">
        <div>
          <AdminSideBar />
        </div>
        <SearchUserSection />
      </article>
    </AdminLayout>
  );
}