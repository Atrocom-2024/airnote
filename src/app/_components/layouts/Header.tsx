import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import NavigationBar from "../header/NavigationBar";
import LoginBtn from "../header/LoginBtn";
import LogoutBtn from "../header/LogoutBtn";
import ReviewAddBtn from "../header/ReviewAddBtn";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="w-[100vw] h-[8vh] justify-between flex items-center border-b-[1.5px] border-purple px-5 sm:px-10">
      <section className="flex items-center">
        <article className="mr-5 sm:mr-10">
          <div className="w-[40px] h-[40px] bg-purple sm:w-[60px] sm:h-[60px]"></div>
        </article>
        <article className="relative">
          <input className="relative w-[170px] h-[5vh] border-[1.5px] border-purple rounded-full outline-none sm:w-[350px] sm:h-[4vh]" />
          <IoSearch className="absolute top-1/2 right-3 -translate-y-1/2" size="30" color="#756AB6" />
        </article>
      </section>
      <section className="flex text-sm text-purple">
        <article className="hidden space-x-10 items-center mr-10 lg:flex">
          {session ? (
            <Link
              className="bg-purple text-white px-5 py-2 rounded-md"
              href="/reviews/add"
            >후기등록</Link>
          ) : (
            <ReviewAddBtn />
          )}
          <Link href="/howuse">이용방법</Link>
          <Link href="https://open.kakao.com/o/sAgQYPhg">고객지원</Link>
          {session && <LogoutBtn />}
        </article>
        <article className="flex items-center">
          {session ? (
            <Link href="/my">
              <CgProfile size="40" color="#756AB6" />
            </Link>
          ) : (
            <LoginBtn />
          )}
          <NavigationBar />
        </article>
      </section>
    </header>
  );
}