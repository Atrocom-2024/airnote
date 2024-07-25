'use client';

import { useRouter } from "next/navigation";

export default function BackBtn() {
  const router = useRouter();

  return (
    <button
      className="block bg-default w-full py-2 mt-5 text-white text-center text-lg font-bold rounded-md"
      onClick={() => router.back()}
    >돌아가기</button>
  );
}