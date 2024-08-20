import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children, className }: PropsType) {
  return (
    <main className="bg-white">
      {/*  */}
      <Header />
      {/*  */}
      <section className={`w-[100vw] min-h-[92vh] pt-[8vh] ${className}`}>{ children }</section>
      {/*  */}
      <Footer />
      {/*  */}
    </main>
  );
}

interface PropsType {
  children: React.ReactNode;
  className?: React.ReactNode;
}