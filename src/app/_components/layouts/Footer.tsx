import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-[100vw] h-[8vh] bg-light-default flex justify-evenly items-center">
      <section className="text-[0.6rem] md:text-[0.7rem] text-white space-y-1">
        <article>대표: 허무관</article>
        <article>주소: 서울특별시 강남구 테헤란로21길 5</article>
        <article>문의: info@atrocom.com</article>
        <article>© 2024 공간 기록 수첩 [공기수첩] Powered by Next.js, Vercel App</article>
      </section>
      <section>
        <Image className="size-[30px] md:size-[50px]" src="/logo.svg" width={50} height={50} alt="로고" priority={true} />
      </section>
    </footer>
  );
}