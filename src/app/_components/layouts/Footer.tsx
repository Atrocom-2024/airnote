export default function Footer() {
  return (
    <footer className="w-[100vw] h-[8vh] bg-white border-t-[1.5px] border-default flex justify-evenly items-center fixed bottom-0 left-0 z-[29] text-[0.6rem] text-dark-gray md:text-[0.7rem]">
      <section className="space-y-1">
        <article>{'('}주{')'} 아트로컴</article>
        <article>주소: 서울특별시 강남구 테헤란로21길 5 | 대표: 허무관</article>
        <article>전자우편주소: info@atrocom.com</article>
      </section>
      <section>
        <article className="pt-7">© 2024 공간 기록 수첩 [공기수첩] Powered by Next.js, Vercel App</article>
      </section>
    </footer>
  );
}
