'use client';

import { useProfileInfo } from "@/app/_lib/hooks";
import Title from "@/app/_components/Title";
import LoadingUI from "@/app/_components/LoadingUI";
import NicknameChange from "./NicknameChange";

export default function ProfileInfoMain({ email }: PropsType) {
  const { data: profileInfo, isPending } = useProfileInfo(email);
  
  if (!profileInfo || isPending) {
    return <LoadingUI />;
  };

  return (
    <main className="ml-20">
      <Title>내 정보 관리</Title>
      <section className="mt-20">
        <article className="text-lg font-semibold mb-10">회원 정보</article>
        <article className="grid grid-cols-2 gap-5">
          <section>
            <div className="font-semibold text-middle-gray mr-2 mb-2">이메일</div>
            <input
              className="w-[300px] outline-none bg-white-gray text-middle-gray rounded-md p-2"
              value={profileInfo.email}
              disabled={true}
            />
          </section>
          <NicknameChange nickname={profileInfo.nickname} />
          <section>
            <div className="font-semibold text-middle-gray mr-2 mb-2">전화번호</div>
            <input
              className="w-[300px] outline-none bg-white-gray text-middle-gray rounded-md p-2"
              value={profileInfo.phone_number}
              disabled={true}
            />
          </section>
          <section>
            <div className="font-semibold text-middle-gray mr-2 mb-2">이름</div>
            <input
              className="w-[300px] outline-none bg-white-gray text-middle-gray rounded-md p-2"
              value={profileInfo.name}
              disabled={true}
            />
          </section>
        </article>
      </section>
      <section className="flex items-center text-sm mt-20">
        <div className="text-gray">더 이상 공기수첩 이용을 원하지 않으신가요?</div>
        <button className="text-middle-gray font-semibold ml-2" type="button">회원탈퇴</button>
      </section>
    </main>
  );
}

interface PropsType {
  email: string;
}