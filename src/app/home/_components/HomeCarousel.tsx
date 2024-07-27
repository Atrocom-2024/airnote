'use client';

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function HomeCarousel() {
  const carouselElCount = 3;
  const carouselWidth = `${carouselElCount * 100}vw`;
  const [current, setCurrent] = useState<number>(0);
  const moveStyle: {[key: number]: string;} = useMemo(() => ({
    0: 'translate-x-0',
    1: 'translate-x-[-100vw]',
    2: 'translate-x-[-200vw]',
  }), []);

  const arrowLeftClickHandler = () => {
    setCurrent((prev) => {
      if (prev <= 0) {
        return carouselElCount - 1;
      } else {
        return prev - 1;
      }
    })
  }

  const arrowRightClickHandler = () => {
    setCurrent((prev) => {
      if (prev >= carouselElCount - 1) {
        return 0;
      } else {
        return prev + 1;
      }
    })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === carouselElCount - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [current]);

  return (
    <section className="w-[100vw] h-[500px] relative bg-gradient-to-b from-default from-70% to-white md:h-[400px]">
      <div className={`h-full absolute top-0 left-0 flex duration-500 w-[${carouselWidth}] ${moveStyle[current]}`}>
        <section className="w-[100vw] h-full flex justify-center items-center px-5">
          <article className="text-white md:mr-10 lg:mr-20">
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
          </article>
          <article className="hidden md:block">
            <Image
              className="shadow-xl rounded-md md:w-[400px] lg:w-[500px]"
              src="/landing-bg-img-1.png"
              width={800}
              height={0}
              alt="예시 이미지"
              priority={true}
            />
          </article>
        </section>
        <section className="w-[100vw] h-full flex justify-center items-center px-5">
          <article className="text-white md:mr-10 lg:mr-20">
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
          <article className="hidden md:block">
            <Image
              className="shadow-xl rounded-md md:w-[400px] lg:w-[500px]"
              src="/landing-bg-img-2.png"
              width={800}
              height={0}
              alt="예시 이미지"
              priority={true}
            />
          </article>
        </section>
        <section className="w-[100vw] h-full flex justify-center items-center px-5">
          <article className="text-white md:mr-10 lg:mr-20">
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
          </article>
          <article className="hidden md:block">
            <Image
              className="shadow-xl rounded-md md:w-[400px] lg:w-[500px]"
              src="/landing-bg-img-3.png"
              width={800}
              height={0}
              alt="예시 이미지"
              priority={true}
            />
          </article>
        </section>
      </div>
      <div className="absolute top-1/2 left-10 -translate-y-1/2 arrowLeftContainer cursor-pointer hidden duration-300 lg:block hover:scale-[1.2]"
        onClick={arrowLeftClickHandler}
      >
        <FaAngleLeft size="40" color="white" />
      </div>
      <div className="absolute top-1/2 right-10 -translate-y-1/2 arrowRightContainer cursor-pointer hidden duration-300 lg:block hover:scale-[1.2]"
        onClick={arrowRightClickHandler}
      >
        <FaAngleRight size="40" color="white" />
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center">
        <div className="cursor-pointer lg:hidden" onClick={arrowLeftClickHandler}>
          <FaAngleLeft size="20" color="#6A6A6A" />
        </div>
        <div className="mx-3 text-dark-gray">{current + 1} / {carouselElCount}</div>
        <div className="cursor-pointer lg:hidden" onClick={arrowRightClickHandler}>
          <FaAngleRight size="20" color="#6A6A6A" />
        </div>
      </div>
    </section>
  );
}