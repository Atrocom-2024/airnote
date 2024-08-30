import AdminHeader from "./AdminHeader";

export default function AdminLayout({ children, className}: PropsType) {
  return (
    <main className="bg-white pb-20">
      <AdminHeader />
      <section className={`w-[100vw] min-h-[92vh] ${className}`}>{ children }</section>
    </main>
  );
}

interface PropsType {
  children: React.ReactNode;
  className?: React.ReactNode;
}