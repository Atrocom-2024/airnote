'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaAngleRight } from "react-icons/fa6";

export default function AdminSideBar() {
  const pathname = usePathname();
  const currentPath = pathname?.substring(18);

  return (
    <article className="w-[270px] border border-gray rounded-lg">
      <Link
        className="border-b border-gray flex justify-between items-center px-4 py-5"
        href="/admin/management/user"
      >
        <div
          className={`${currentPath === 'user' ? 'font-semibold text-default' : ''}`}
        >사용자 관리</div>
        <FaAngleRight size="25" fill={currentPath === 'user' ? '#4A68F5' : ' gray'} />
      </Link>
      <Link
        className="border-b border-gray flex justify-between items-center px-4 py-5"
        href="/admin/management/record"
      >
        <div
          className={`${currentPath === 'record' ? 'font-semibold text-default' : ''}`}
        >공간기록 관리</div>
        <FaAngleRight size="25" fill={currentPath === 'record' ? '#4A68F5' : ' gray'} />
      </Link>
      <Link
        className="flex justify-between items-center px-4 py-5"
        href="/admin/management/knowledges"
      >
        <div
          className={`${currentPath === 'knowledges' ? 'font-semibold text-default' : ''}`}
        >공간지식 관리</div>
        <FaAngleRight size="25" fill={currentPath === 'knowledges' ? '#4A68F5' : ' gray'} />
      </Link>
    </article>
  );
}