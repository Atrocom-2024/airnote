'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleRight } from "react-icons/fa6";

export default function ProfileNavigation() {
  const pathname = usePathname();
  
  return (
    <article className="w-[270px] border border-light-gray rounded-lg">
      <Link
        className="border-b border-light-gray flex justify-between items-center px-4 py-5"
        href="/profile/info"
      >
        <div
          className={`${pathname === '/profile/info' ? 'font-bold text-default' : ''}`}
        >내 정보 관리</div>
        <FaAngleRight size="25" fill={pathname?.startsWith('/profile/info') ? '#0064FF' : ' gray'} />
      </Link>
      <Link
        className="border-b border-light-gray flex justify-between items-center px-4 py-5"
        href="/profile/record"
      >
        <div
          className={`${pathname?.startsWith('/profile/record') ? 'font-bold text-default' : ''}`}
        >공간기록 관리</div>
        <FaAngleRight size="25" fill={pathname?.startsWith('/profile/record') ? '#0064FF' : ' gray'} />
      </Link>
      <Link
        className="flex justify-between items-center px-4 py-5"
        href="/profile/knowledges"
      >
        <div
          className={`${pathname?.startsWith('/profile/knowledges') ? 'font-bold text-default' : ''}`}
        >공간지식 관리</div>
        <FaAngleRight size="25" fill={pathname?.startsWith('/profile/knowledges') ? '#0064FF' : ' gray'} />
      </Link>
    </article>
  );
}
