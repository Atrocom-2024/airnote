'use client'

import { usePathname } from "next/navigation";

export default function LogoutBtn() {
  const pathname = usePathname();
  
  if (pathname?.startsWith('/admin') && pathname == '/admin') {
    return null;
  }

  return (
    <button className="bg-default px-3 py-2 text-white rounded-md" type="button">로그아웃</button>
  );
}