'use client'

import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname === '/record') {
    return null;
  }

  return (
    <footer className="w-[100vw] h-[8vh] bg-white border-t border-light-gray flex flex-col justify-center z-[29] text-[0.5rem] text-gray pl-5 md:text-[0.7rem] md:flex-row md:justify-evenly md:items-center md:pl-0">
      <section className="space-y-1">
        <article>{'('}주{')'} 아트로컴</article>
        <article>주소: 서울특별시 강남구 테헤란로21길 5 | 대표: 허수현</article>
        <article>전자우편주소: info@atrocom.com</article>
      </section>
      <section>
        <article className="pt-1 md:pt-7">© 2024 공간 기록 수첩 [공기수첩] Powered by Next.js, Vercel App</article>
      </section>
    </footer>
  );
}
