import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { CgProfile } from "react-icons/cg";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import LoginBtn from "../header/LoginBtn";
import SearchBar from "../header/SearchBar";
import HeaderDropdown from "../header/HeaderDropdown";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="w-[100vw] h-[8vh] bg-white justify-between flex items-center z-[30] border-b-[1.5px] border-default px-5 sm:px-10 md:justify-evenly">
      <section className="flex items-center">
        <article className="mr-5 sm:mr-10">
          <Link href="/home">
            <Image className="w-[35px] md:w-[50px]" src="/logo.svg" width={50} height={50} alt="로고" priority={true} />
          </Link>
        </article>
        <SearchBar />
      </section>
      <section className="flex text-sm">
        <article className="flex items-center">
          {session ? (
            <Link href="/my">
              <CgProfile className="size-[30px] md:size-[35px]" size="40" color="#4A68F5" />
            </Link>
          ) : (
            <div className="hidden md:block">
              <LoginBtn />
            </div>
          )}
          <HeaderDropdown isLogin={session ? true : false} />
        </article>
      </section>
    </header>
  );
}