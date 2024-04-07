import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col justify-start items-center w-full h-full pt-32">
      <Image className="w-[300px]" src="/logo.svg" width={400} height={0} alt="로고" />
      <h1 className="text-2xl font-bold mt-20">404 Not Found: 존재하지 않는 페이지입니다.</h1>
      <Link className="mt-32 px-5 py-3 bg-default text-white rounded-md" href="/">홈으로 이동</Link>
    </main>
  );
}