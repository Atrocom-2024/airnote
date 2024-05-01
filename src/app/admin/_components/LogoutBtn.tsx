'use client'

import { usePathname, useRouter } from "next/navigation";

export default function LogoutBtn() {
  const router = useRouter();
  const pathname = usePathname();

  const logoutHandler = async () => {
    try {
      const domain = process.env.NEXT_PUBLIC_DOMAIN;
      const res = await fetch(`${domain}/api/admin/logout`, { method: 'POST' });
      if (res.ok) {
        router.push('/admin');
      } else {
        alert('로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    } catch (err) {
      console.error(err);
      alert('로그아웃에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  }
  
  if (pathname?.startsWith('/admin') && pathname == '/admin') {
    return null;
  }

  return (
    <button
      className="bg-default px-3 py-2 text-white rounded-md"
      type="button"
      onClick={logoutHandler}
    >로그아웃</button>
  );
}