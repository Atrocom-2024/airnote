import Image from "next/image";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa6";

export default async function Home() {
  return (
    <main className="w-[100vw] h-[100vh] px-10 py-4 flex flex-col justify-between bg-gradient-to-b from-default from-60% to-white">
      <section className="py-4 md:px-4 md:py-8">
        <Image className="w-[50px] md:w-[80px]" src="/landing-logo.svg" width={100} height={0} alt="로고" />
      </section>
      <section className="flex justify-center items-center">
        <article className="text-white md:mr-20">
          <div className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">남녀노소 누구든지</div>
          <div className="text-xl font-bold mb-5 md:text-2xl lg:text-3xl">공간에 대한 기록을 남길 수 있어요</div>
          <div className="text-sm mb-10 md:mb-16 md:text-base lg:text-lg">여러분들의 소중한 기록이 모든 사람에게 도움이 될 수 있어요</div>
          <Image
            className="w-full mx-auto mb-10 shadow-2xl rounded-md md:hidden"
            src="/landing-bg-img.png"
            width={500}
            height={0}
            alt="예시 이미지"
          />
          <Link className="bg-white text-default text-sm font-bold rounded-md px-6 py-2 md:text-xl" href="/home">시작하기</Link>
        </article>
        <article className="hidden md:block">
          <Image
            className="shadow-2xl rounded-md md:w-[400px] lg:w-[800px]"
            src="/landing-bg-img.png"
            width={800}
            height={0}
            alt="예시 이미지"
          />
        </article>
      </section>
      <section className="text-lg text-default font-bold flex flex-col items-center md:text-2xl">
        <div>더 알아보려면 아래로 스크롤하세요</div>
        <div>
          <FaAngleDown className=" size-[30px] md:size-[50px]" size="50" fill="#4A68F5" />
        </div>
      </section>
    </main>
  );
}
