import Image from "next/image";
import LogoutBtn from "../LogoutBtn";

export default function AdminHeader() {
  return (
    <header className="w-full h-[8vh] flex justify-around items-center bg-white border-b-[1.5px] border-default">
      <section className="flex items-center">
        <article className="mr-3">
          <Image src="/logo.svg" width={50} height={50} alt="로고" priority={true} />
        </article>
        <article className="font-bold text-default text-xl">관리자용</article>
      </section>
      <section>
        <LogoutBtn />
      </section>
    </header>
  );
}