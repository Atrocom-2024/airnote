'use client'

import LoadingUI from "@/app/_components/LoadingUI";
import { useAdminLogout } from "@/app/_lib/hooks";
import { usePathname } from "next/navigation";

export default function LogoutBtn() {
  const pathname = usePathname();
  const { mutate: logoutHandler, isPending } = useAdminLogout();
  
  if (pathname?.startsWith('/admin') && pathname == '/admin') {
    return null;
  }

  return (
    <>
      {isPending && <LoadingUI />}
      <button
        className="bg-default px-3 py-2 text-white rounded-md"
        type="button"
        onClick={() => logoutHandler()}
      >로그아웃</button>
    </>
  );
}