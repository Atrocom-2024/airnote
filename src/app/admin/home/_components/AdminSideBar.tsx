'use client';

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaAngleRight } from "react-icons/fa6";

export default function AdminSideBar() {
  const searchParams = useSearchParams();
  const keyword = searchParams?.get('keyword');
  
  return (
    <article className="w-[270px] border border-gray rounded-lg">
      <Link
        className="border-b border-gray flex justify-between items-center px-4 py-5"
        href="/admin/home?keyword=user"
      >
        <div
          className={`${keyword === 'user' || !keyword ? 'font-semibold text-default' : ''}`}
        >사용자 검색</div>
        <FaAngleRight size="25" fill={keyword === 'user' || !keyword ? '#4A68F5' : ' gray'} />
      </Link>
      <Link
        className="border-b border-gray flex justify-between items-center px-4 py-5"
        href="/admin/home?keyword=record"
      >
        <div
          className={`${keyword === 'record' ? 'font-semibold text-default' : ''}`}
        >공간기록 관리</div>
        <FaAngleRight size="25" fill={keyword === 'record' ? '#4A68F5' : ' gray'} />
      </Link>
      <Link
        className="flex justify-between items-center px-4 py-5"
        href="/admin/home?keyword=knowledges"
      >
        <div
          className={`${keyword === 'knowledges' ? 'font-semibold text-default' : ''}`}
        >공간지식 관리</div>
        <FaAngleRight size="25" fill={keyword === 'knowledges' ? '#4A68F5' : ' gray'} />
      </Link>
    </article>
  );
}