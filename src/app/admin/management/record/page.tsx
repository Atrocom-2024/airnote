import AdminLayout from "../../_components/layouts/AdminLayout";
import AdminSideBar from "../_components/AdminSideBar";
import SearchRecordSection from "./_components/SearchRecordSection";

export default function ManagementRecord() {
  return (
    <AdminLayout className="flex justify-center">
      <article className="md:flex mt-20">
        <div>
          <AdminSideBar />
        </div>
        <SearchRecordSection />
      </article>
    </AdminLayout>
  );
}