'use client';

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AddKnowledgeBtn() {
  const { data: session, status } = useSession();

  console.log(session);

  return (
    <article>
      <Link
        className="bg-default text-white text-sm px-4 py-3 rounded-lg md:text-base"
        href="/knowledges/add"
      >지식작성</Link>
    </article>
  );
}