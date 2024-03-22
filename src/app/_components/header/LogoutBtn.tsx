'use client'

import { signOut } from "next-auth/react";

export default function LogoutBtn() {
  const logoutHandler = () => {
    signOut();
  }

  return (
    <button
      className="border-[1.5px] border-purple px-5 py-2 rounded-md"
      type="button"
      onClick={logoutHandler}
    >로그아웃</button>
  );
}