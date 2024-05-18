import Image from "next/image";
import Link from "next/link";

export default function TermsModal() {
  return (
    <section className="w-[100vw] h-[100vh] absolute top-0 left-0 bg-black/30 z-30">
      <article
        className="w-[300px] h-[250px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white flex flex-col justify-between rounded-md shadow-2xl p-5 z-50 md:w-[500px] md:h-[400px]"
      >
        <section>
          <div className="text-xl text-default font-bold md:text-3xl">약관동의</div>
        </section>
        <Image
          className="w-[60px] mx-auto md:w-[100px]"
          src="/logo.svg"
          width={100}
          height={0}
          alt="로고"
          priority={true}
        />
        <section className="flex justify-between items-center">
          <div className="text-lg">(필수) 공기수첩 서비스 이용약관</div>
          <Link
            className="text-gray"
            href="/terms"
          >자세히 보기</Link>
        </section>
        <button
          className="bg-default w-full py-2 text-white text-lg font-bold rounded-md"
        >동의하기</button>
      </article>
    </section>
  );
}