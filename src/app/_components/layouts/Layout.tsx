import Header from "./Header";

export default function Layout({ children, className }: PropsType) {
  return (
    <main>
      {/*  */}
      <Header />
      {/*  */}
      <section className="w-[100vw] h-[92vh]">{ children }</section>
      {/*  */}
    </main>
  );
}

interface PropsType {
  children: React.ReactNode;
  className?: React.ReactNode;
}