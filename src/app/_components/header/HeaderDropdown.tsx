'use client';

import { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";

import MoveLink from "./MoveLink";
import LoginBtn from "./LoginBtn";
import LogoutBtn from "./LogoutBtn";

export default function HeaderDropdown({ isLogin }: PropsType) {
  const [ isDropdown, setIsDropdown ] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const menuClickHandler = () => {
    setIsDropdown((prev) => !prev);
  };

  const outsideClickHandler = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdown(false);
    }
  };

  useEffect(() => {
    if (isDropdown) {
      document.addEventListener('mousedown', outsideClickHandler);
    } else {
      document.removeEventListener('mousedown', outsideClickHandler);
    }
    
    return () => {
      document.removeEventListener('mousedown', outsideClickHandler);
    }
  }, [isDropdown]);


  return (
    <section className="relative ml-1 md:ml-3" ref={dropdownRef}>
      <button className="p-1 rounded-md transition-all hover:bg-neutral-200" onClick={menuClickHandler}>
        <IoMenu className="size-[35px] md:size-[40px]" size={40} color="#4A68F5" />
      </button>
      {isDropdown && (
        <section className="bg-white absolute top-14 right-0 w-[200px] rounded-lg shadow-[0_0_10px_3px_rgba(0,0,0,0.05)] z-[30]">
          <ul className="space-y-5 border-b-[1.5px] border-neutral-200 px-5 pb-5 mt-5">
            <li>
              <MoveLink href="/record">공간기록</MoveLink>
            </li>
            <li>
              <MoveLink href="/knowledges">공간지식</MoveLink>
            </li>
            <li>
              <MoveLink href="https://open.kakao.com/o/sAgQYPhg" target="_blank">고객지원</MoveLink>
            </li>
            <li>
              <MoveLink href="/terms">이용약관</MoveLink>
            </li>
          </ul>
          {isLogin ? (
            <ul className="px-5 py-5 space-y-5">
              <li>
                <MoveLink href="/profile/info">내 정보 관리</MoveLink>
              </li>
              <li>
                <MoveLink href="/profile/record">공간기록 관리</MoveLink>
              </li>
              <li>
                <MoveLink href="/profile/knowledges">공간지식 관리</MoveLink>
              </li>
              <li>
                <LogoutBtn />
              </li>
            </ul>
          ) : (
            <div className="px-5 py-5 border-b-[1.5px] border-neutral-200 md:hidden">
              <LoginBtn />
            </div>
          )}
        </section>
      )}
    </section>
  );
}

interface PropsType {
  isLogin: boolean;
}