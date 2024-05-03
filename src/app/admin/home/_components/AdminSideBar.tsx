import Link from "next/link";

export default function AdminSideBar() {
  return (
    <aside className="border-r-[1.5px] border-default col-span-3 flex flex-col justify-start items-center space-y-10 font-bold text-default text-lg pt-10">
      <Link href="/admin/home?keyword=user">사용자 정보 찾기</Link>
      <Link href="/admin/home?keyword=review">공간 기록 관리</Link>
    </aside>
  );
}