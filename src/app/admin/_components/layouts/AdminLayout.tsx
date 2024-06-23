import AdminHeader from "./AdminHeader";

export default function AdminLayout({ children, className}: PropsType) {
  return (
    <main className="bg-white">
      <AdminHeader />
      <section className={`w-[100vw] h-[92vh] ${className}`}>{ children }</section>
    </main>
  );
}

interface PropsType {
  children: React.ReactNode;
  className?: React.ReactNode;
}