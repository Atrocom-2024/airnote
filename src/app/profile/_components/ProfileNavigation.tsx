'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleRight } from "react-icons/fa6";

export default function ProfileNavigation() {
  const pathname = usePathname();
  
  return (
    <article className="w-[270px] border border-gray rounded-lg">
      <Link
        className="border-b border-gray flex justify-between items-center px-4 py-5"
        href="/profile/info"
      >
        <div
          className={`${pathname === '/profile/info' ? 'font-semibold text-default' : ''}`}
        >내 정보 관리</div>
        <FaAngleRight size="25" fill={pathname?.startsWith('/profile/info') ? '#4A68F5' : ' gray'} />
      </Link>
      <Link
        className="border-b border-gray flex justify-between items-center px-4 py-5"
        href="/profile/record"
      >
        <div
          className={`${pathname?.startsWith('/profile/record') ? 'font-semibold text-default' : ''}`}
        >공간기록 관리</div>
        <FaAngleRight size="25" fill={pathname?.startsWith('/profile/record') ? '#4A68F5' : ' gray'} />
      </Link>
      <Link
        className="flex justify-between items-center px-4 py-5"
        href="/profile/knowledges"
      >
        <div
          className={`${pathname === '/profile/knowledges' ? 'font-semibold text-default' : ''}`}
        >공간지식 관리</div>
        <FaAngleRight size="25" fill={pathname?.startsWith('/profile/knowledges') ? '#4A68F5' : ' gray'} />
      </Link>
    </article>
  );
}
