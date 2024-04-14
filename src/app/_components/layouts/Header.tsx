import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { CgProfile } from "react-icons/cg";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import NavigationBar from "../header/NavigationBar";
import LoginBtn from "../header/LoginBtn";
import LogoutBtn from "../header/LogoutBtn";
import ReviewAddBtn from "../header/ReviewAddBtn";
import MoveLink from "../header/MoveLink";
import SearchBar from "../header/SearchBar";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="w-[100vw] h-[8vh] justify-between flex items-center border-b-[1.5px] border-default px-5 sm:px-10">
      <section className="flex items-center">
        <article className="mr-5 sm:mr-10">
          <Link href="/">
            <Image src="/logo.svg" width={50} height={50} alt="로고" priority={true} />
          </Link>
        </article>
        <SearchBar />
      </section>
      <section className="flex text-sm text-default">
        <article className="hidden space-x-10 items-center mr-10 lg:flex">
          <MoveLink href="/home">홈</MoveLink>
          {session ? (
            <MoveLink
              href="/reviews/add"
            >기록작성</MoveLink>
          ) : (
            <ReviewAddBtn />
          )}
          <MoveLink href="https://cafe.naver.com/airnote" target="_blank">커뮤니티</MoveLink>
          <MoveLink href="https://open.kakao.com/o/sAgQYPhg" target="_blank">고객지원</MoveLink>
          {session && <LogoutBtn />}
        </article>
        <article className="flex items-center">
          {session ? (
            <Link href="/my">
              <CgProfile size="40" color="#4A68F5" />
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