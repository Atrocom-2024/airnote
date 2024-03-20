'use client'

import Link from "next/link";
import { useState } from "react";

export default function NavigationBar() {
  const [isNavigationBar, setIsNavigationBar] = useState(false);

  const NavigationBarHandler = () => {
    setIsNavigationBar((prev) => !prev);
  }

  const linkClickHandler = () => {
    setIsNavigationBar(false);
  }

  return (
    <section className="lg:hidden">
      <div
        className="ml-4 relative w-[25px] h-[25px] flex flex-col justify-evenly cursor-pointer z-40 sm:w-[30px] sm:h-[30px]"
        onClick={NavigationBarHandler}
      >
        <div
          className={`absolute transition-all w-[25px] h-[3px] bg-purple rounded-md sm:w-[30px] sm:h-[4px] ${
            isNavigationBar ? 'top-1/2 -translate-y-1/2 rotate-45 bg-white' : 'top-2'
          }`}
        ></div>
        <div
          className={`absolute transition-all w-[25px] h-[3px] bg-purple rounded-md sm:w-[30px] sm:h-[4px] ${
            isNavigationBar ? 'top-1/2 -translate-y-1/2 -rotate-45 bg-white' : 'top-4'
          }`}
        ></div>
      </div>
      <div className={`absolute top-0 right-0 duration-300 w-full h-[100vh] bg-purple z-30 ${isNavigationBar ? "translate-y-0" : "-translate-y-[100%]"}`}>
        <div className="px-20 py-24 flex flex-col items-center text-white sm:text-xl">
          <Link
            className="mb-5"
            href="/home"
            onClick={linkClickHandler}
          >홈</Link>
          <Link
            className="mb-5"
            href="/reviews/add"
            onClick={linkClickHandler}
          >후기등록</Link>
          <Link
            className="mb-5"
            href="/howuse"
            onClick={linkClickHandler}
          >이용방법</Link>
          <Link
            className="mb-5"
            href="https://open.kakao.com/o/srTkVkcg"
            onClick={linkClickHandler}
          >고객지원</Link>
        </div>
      </div>
    </section>
  );
}