export default function Footer() {
  return (
    <footer className="w-[100vw] h-[8vh] bg-light-default flex justify-evenly items-center">
      <section className="text-xs text-white space-y-1">
        <article>대표자: 공기수첩</article>
        <article>문의: gongan@hanmail.net</article>
        <article>© 2024 공기수첩 Powered by Next.js, Vercel App</article>
      </section>
      <section>
        <div className="w-[50px] h-[50px] bg-default">로고</div>
      </section>
    </footer>
  );
}