'use client';

import { signOut } from "next-auth/react";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";

import MoveLink from "./MoveLink";
import ReviewAddBtn from "./ReviewAddBtn";
import LoginBtn from "./LoginBtn";

export default function HeaderDropdown({ isLogin }: PropsType) {
  const [ isDropdown, setIsDropdown ] = useState(false);

  const menuClickHandler = () => {
    setIsDropdown((prev) => !prev);
  }

  const menuCloseHandler = () => {
    setIsDropdown(false);
  }

  const logoutHandler = () => {
    signOut();
  }

  return (
    <section className="relative ml-1 md:ml-5">
      <button className="p-1 rounded-md transition-all hover:bg-neutral-200" onClick={menuClickHandler}>
        <IoMenu className="size-[35px] md:size-[40px]" size={40} color="#4A68F5" />
      </button>
      {isDropdown && (
        <ul className="bg-white absolute top-14 right-0 w-[200px] p-5 space-y-5 rounded-lg shadow-[0_0_10px_2px_rgba(0,0,0,0.05)] z-[30]">
          <li>
            <MoveLink href="/home">홈</MoveLink>
          </li>
          <li>
            {isLogin ? (
              <MoveLink href="/reviews/add">기록작성</MoveLink>
            ) : (
              <ReviewAddBtn />
            )}
          </li>
          <li>
            <MoveLink href="https://cafe.naver.com/airnote" target="_blank">커뮤니티</MoveLink>
          </li>
          <li>
            <MoveLink href="https://open.kakao.com/o/sAgQYPhg" target="_blank">고객지원</MoveLink>
          </li>
          {isLogin ? (
            <li>
              <button className="group relative" type="button" onClick={logoutHandler}>
                로그아웃
                <div id="link-bar" className="w-full h-[2px] absolute left-1/2 -translate-x-1/2 bottom-[-4px] bg-gray rounded-full hidden group-hover:block" />
              </button>
            </li>
          ) : (
            <li className="md:hidden">
              <LoginBtn />
            </li>
          )}
        </ul>
      )}
    </section>
  );
}

interface PropsType {
  isLogin: boolean;
}