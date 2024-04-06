'use client'

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";

export default function NavigationBar() {
  const { data: session } = useSession();
  const [isNavigationBar, setIsNavigationBar] = useState(false);

  const NavigationBarHandler = () => {
    setIsNavigationBar((prev) => !prev);
  }

  const linkClickHandler = () => {
    setIsNavigationBar(false);
  }

  const logoutHandler = () => {
    signOut();
  }

  const reviewsBtnHandler = () => {
    return alert('로그인 후 이용하실 수 있습니다.');
  }

  return (
    <section className="lg:hidden">
      <div
        className="ml-4 relative w-[25px] h-[25px] flex flex-col justify-evenly cursor-pointer z-40 sm:w-[30px] sm:h-[30px]"
        onClick={NavigationBarHandler}
      >
        <div
          className={`absolute transition-all w-[25px] h-[3px] bg-default rounded-md sm:w-[30px] sm:h-[4px] ${
            isNavigationBar ? 'top-1/2 -translate-y-1/2 rotate-45 bg-white' : 'top-2'
          }`}
        ></div>
        <div
          className={`absolute transition-all w-[25px] h-[3px] bg-default rounded-md sm:w-[30px] sm:h-[4px] ${
            isNavigationBar ? 'top-1/2 -translate-y-1/2 -rotate-45 bg-white' : 'top-4'
          }`}
        ></div>
      </div>
      <div className={`absolute top-0 right-0 duration-300 w-full h-[100vh] bg-default z-30 ${isNavigationBar ? "translate-y-0" : "-translate-y-[100%]"}`}>
        <div className="px-20 py-24 flex flex-col items-center text-white sm:text-xl">
          <Link
            className="mb-5"
            href="/"
            onClick={linkClickHandler}
          >홈</Link>
          {session ? (
            <Link
              className="mb-5"
              href="/reviews/add"
              onClick={linkClickHandler}
            >후기등록</Link>
          ) : (
            <button className="mb-5" type="button" onClick={reviewsBtnHandler}>후기등록</button>
          )}
          <Link
            className="mb-5"
            href="/howuse"
            onClick={linkClickHandler}
          >이용방법</Link>
          <Link
            className="mb-5"
            href="https://open.kakao.com/o/sAgQYPhg"
            onClick={linkClickHandler}
          >고객지원</Link>
          {session && <button type="button" onClick={logoutHandler}>로그아웃</button>}
        </div>
      </div>
    </section>
  );
}