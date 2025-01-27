import AdminLayout from "../../_components/layouts/AdminLayout";
import AdminSideBar from "../_components/AdminSideBar";
import SearchKnowledgeSection from "./_components/SearchKnowledgeSection";

export default function ManagementKnowledges() {
  return (
    <AdminLayout className="flex justify-center">
      <article className="md:flex mt-20">
        <div>
          <AdminSideBar />
        </div>
        <SearchKnowledgeSection />
      </article>
    </AdminLayout>
  );
}