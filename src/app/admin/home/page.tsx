import AdminLayout from "../_components/layouts/AdminLayout";
import AdminSideBar from "./_components/AdminSideBar";
import SearchReviewSection from "./_components/SearchReviewSection";
import SearchUserSection from "./_components/SearchUserSection";

export default function AdminHome({ searchParams }: PageProps) {
  const keyword = searchParams?.keyword;

  return (
    <AdminLayout className="grid grid-cols-12 gap-5">
      <AdminSideBar />
      {keyword === 'review' ? (
        <SearchReviewSection />
      ) : (
        <SearchUserSection />
      )}
    </AdminLayout>
  );
}

interface PageProps {
  searchParams?: {
    keyword: 'user' | 'review';
  }
}