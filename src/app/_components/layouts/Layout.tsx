import Header from "./Header";

export default function Layout({ children, className }: PropsType) {
  return (
    <main>
      {/*  */}
      <Header />
      {/*  */}
      <section>안녕하세요</section>
      {/*  */}
    </main>
  );
}

interface PropsType {
  children: React.ReactNode;
  className?: React.ReactNode;
}