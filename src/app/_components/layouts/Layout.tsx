import { Analytics } from "@vercel/analytics/next";

import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children, className }: PropsType) {
  return (
    <main className="bg-white">
      <Analytics />
      {/*  */}
      <Header />
      {/*  */}
      <section className={`w-[100vw] h-[84vh] ${className}`}>{ children }</section>
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