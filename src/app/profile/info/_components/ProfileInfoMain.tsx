'use client';

import { parsePhoneNumber } from "@/utils/modules";
import { useProfileInfo, useUserDelete } from "@/app/_lib/hooks";
import Title from "@/app/_components/Title";
import NicknameChange from "./NicknameChange";
import LoadingUI from "@/app/_components/LoadingUI";

export default function ProfileInfoMain() {
  const { data: profileInfo, isPending: getProfileInfoPending } = useProfileInfo();
  const { mutate: deleteUser, isPending: deleteUserPending } = useUserDelete(profileInfo?.id)

  const userDeleteClickHandler = () => {
    const userConfirm = confirm('정말 탈퇴하시겠습니까?\n탈퇴시 기존 작성했던 기록은 삭제되지 않습니다.');
    if (userConfirm) {
      deleteUser();
    }
  }
  
  if (!profileInfo || getProfileInfoPending || deleteUserPending) {
    return <LoadingUI />;
  };

  return (
    <main className="md:ml-20">
      <Title>내 정보 관리</Title>
      <section className="mt-20">
        <article className="text-lg font-semibold mb-10">회원 정보</article>
        <article className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <section>
            <div className="font-semibold text-middle-gray mr-2 mb-2">이메일</div>
            <input
              className="w-[300px] outline-none bg-white-gray text-middle-gray rounded-md px-3 py-2"
              value={profileInfo.email}
              disabled={true}
            />
          </section>
          <NicknameChange nickname={profileInfo.nickname} />
          <section>
            <div className="font-semibold text-middle-gray mr-2 mb-2">전화번호</div>
            <input
              className="w-[300px] outline-none bg-white-gray text-middle-gray rounded-md px-3 py-2"
              value={parsePhoneNumber(profileInfo.phone_number)}
              disabled={true}
            />
          </section>
          <section>
            <div className="font-semibold text-middle-gray mr-2 mb-2">이름</div>
            <input
              className="w-[300px] outline-none bg-white-gray text-middle-gray rounded-md px-3 py-2"
              value={profileInfo.name}
              disabled={true}
            />
          </section>
        </article>
      </section>
      <section className="flex items-center text-sm mt-20">
        <div className="text-gray">더 이상 공기수첩 이용을 원하지 않으신가요?</div>
        <button
          className="text-middle-gray font-semibold ml-2"
          type="button"
          onClick={userDeleteClickHandler}
        >회원탈퇴</button>
      </section>
    </main>
  );
}
