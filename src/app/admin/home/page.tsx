import AdminLayout from "../_components/layouts/AdminLayout";
import AdminSideBar from "./_components/AdminSideBar";
import SearchUserSection from "./_components/SearchUserSection";
import SearchRecordSection from "./_components/SearchRecordSection";
import SearchKnowledgeSection from "./_components/SearchKnowledgeSection";

export default function AdminHome({ searchParams }: PageProps) {
  const keyword = searchParams?.keyword;
  
  return (
    <AdminLayout className="flex justify-center">
      <article className="flex mt-20">
        <div>
          <AdminSideBar />
        </div>
        {!keyword && <SearchUserSection />}
        {keyword === 'user' && <SearchUserSection />}
        {keyword === 'record' && <SearchRecordSection />}
        {keyword === 'knowledges' && <SearchKnowledgeSection />}
      </article>
    </AdminLayout>
  );
}

interface PageProps {
  searchParams?: {
    keyword: 'user' | 'record' | 'knowledges';
  }
}