import Image from "next/image";
import Link from "next/link";
import { FaAngleDown } from "react-icons/fa6";

export default async function Home() {
  return (
    <main className="w-[100vw] h-[100vh] px-4 md:px-10 py-4 bg-gradient-to-b from-default from-70% to-white">
      <section className="px-2 py-4 md:px-4 md:py-8">
        <Image className="w-[50px] md:w-[80px]" src="/landing-logo.svg" width={100} height={0} alt="로고" />
      </section>
      <section className="h-[70vh] px-4 scrollbar-hide overflow-y-scroll md:scrollbar-default" id="landing-container">
        <section className="h-full flex justify-center items-center" data-aos="fade-right">
          <article className="text-white md:mr-20">
            <div className="text-xl font-bold mb-2 md:text-2xl lg:text-3xl">남녀노소 누구든지</div>
            <div className="text-xl font-bold mb-5 md:text-2xl lg:text-3xl">공간에 대한 기록을 남길 수 있어요</div>
            <div className="text-sm mb-10 md:mb-16 md:text-base lg:text-lg">여러분들의 소중한 기록이 모든 사람에게 도움이 될 수 있어요</div>
            <Image
              className="w-full mx-auto mb-10 shadow-xl rounded-md md:hidden"
              src="/landing-bg-img-1.png"
              width={500}
              height={0}
              alt="예시 이미지"
              priority={true}
            />
            <Link className="bg-white text-default text-sm font-bold rounded-md px-6 py-2 md:text-xl" href="/home">시작하기</Link>
          </article>
          <article className="hidden md:block">
            <Image
              className="shadow-xl rounded-md md:w-[400px] lg:w-[800px]"
              src="/landing-bg-img-1.png"
              width={800}
              height={0}
              alt="예시 이미지"
              priority={true}
            />
          </article>
        </section>
        <section className="h-full flex justify-center items-center">
          <article className="hidden md:block">
            <Image
              className="shadow-xl rounded-md md:w-[400px] lg:w-[800px]"
              src="/landing-bg-img-2.png"
              width={800}
              height={0}
              alt="예시 이미지"
              priority={true}
            />
          </article>
          <article className="text-white md:ml-20">
            <div className="text-xl font-bold mb-5 md:text-2xl lg:text-3xl">공간 기록 구경하기</div>
            <div className="text-sm mb-10 md:mb-16 md:text-base lg:text-lg">지도의 마커를 클릭하면<br />다양한 사람들이 작성한 공간 기록을 구경할 수 있어요</div>
            <Image
              className="w-full mx-auto mb-10 shadow-xl rounded-md md:hidden"
              src="/landing-bg-img-2.png"
              width={500}
              height={0}
              alt="예시 이미지"
              priority={true}
            />
          </article>
        </section>
        <section className="h-full flex justify-center items-center">
          <article className="text-white md:mr-20">
            <div className="text-xl font-bold mb-5 md:text-2xl lg:text-3xl">공간 기록 작성하기</div>
            <div className="text-sm mb-10 md:mb-16 md:text-base lg:text-lg">기록작성 페이지에서 좋았던 경험, 안 좋았던 경험 등<br />자신이 경험했던 공간에 대해 자유롭게 기록을 남길 수 있어요<br />남들에게 편하게 할 수 없던 다양한 경험들을 공유해보세요<br />지도에서 기록을 남기고 싶은 건물을 클릭해보세요</div>
            <Image
              className="w-full mx-auto mb-10 shadow-xl rounded-md md:hidden"
              src="/landing-bg-img-3.png"
              width={500}
              height={0}
              alt="예시 이미지"
              priority={true}
            />
            <Link className="bg-white text-default text-sm font-bold rounded-md px-6 py-2 md:text-xl" href="/home">시작하기</Link>
          </article>
          <article className="hidden md:block">
            <Image
              className="shadow-xl rounded-md md:w-[400px] lg:w-[800px]"
              src="/landing-bg-img-3.png"
              width={800}
              height={0}
              alt="예시 이미지"
              priority={true}
            />
          </article>
        </section>
      </section>
      <section className="w-full text-lg text-default font-bold flex flex-col items-center absolute bottom-5 left-1/2 -translate-x-1/2">
        <div className="mb-5 text-sm md:text-base md:mb-4">더 알아보려면 아래로 스크롤하세요</div>
        <div id="landing-arrow-down">
          <FaAngleDown className="size-[30px] md:size-[35px]" size="50" fill="#4A68F5" />
        </div>
      </section>
    </main>
  );
}
