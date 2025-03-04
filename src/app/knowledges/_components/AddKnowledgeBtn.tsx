'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AddKnowledgeBtn() {
  const { data: session, status } = useSession();

  if (status == "loading" || status == "unauthenticated" || !session || session.user.role == 'general') {
    return null;
  }

  return (
    <article>
      <Link
        className="bg-default text-white text-sm px-5 py-2 rounded-lg md:text-base"
        href="/knowledges/add"
      >지식작성</Link>
    </article>
  );
}