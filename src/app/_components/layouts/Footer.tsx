export default function Footer() {
  return (
    <footer className="w-[100vw] h-[8vh] bg-light-default flex justify-evenly items-center">
      <section className="text-xs text-white space-y-1">
        <article>대표자: 김물주</article>
        <article>문의: kimmulju@hanmail.net</article>
        <article>© 2024 kimmulju Powered by Next.js, Vercel App</article>
      </section>
      <section>
        <div className="w-[50px] h-[50px] bg-default">로고</div>
      </section>
    </footer>
  );
}