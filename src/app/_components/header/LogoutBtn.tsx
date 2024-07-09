'use client'

import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  const logoutHandler = () => {
    signOut();
  }

  return (
    <button
      className="w-full border-[1.5px] border-gray px-5 py-2 rounded-md text-xs md:text-sm"
      type="button"
      onClick={logoutHandler}
    >로그아웃</button>
  );
}