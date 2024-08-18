'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";
import { LuPencil } from "react-icons/lu";

export default function RecordAddLink() {
  const { data: session } = useSession();

  const LinkClickHandler = () => {
    if (!session) {
      return alert('로그인 후 이용 가능합니다.');
    }
  }

  return (
    <Link
      className="block rounded-full bg-default p-4" href="/record/add"
      onClick={LinkClickHandler}
    >
      <LuPencil className="size-[25px] md:size-[30px]" size="30" color="white" />
    </Link>
  );
}