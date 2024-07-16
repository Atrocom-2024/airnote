'use client'

import { CgProfile } from "react-icons/cg";

import { useMyInfo } from "@/app/_lib/hooks";
import Title from "@/app/_components/Title";
import PartLoadingUI from "@/app/_components/PartLoadingUI";
import NameContainer from "./NameContainer";
import MyReviewCard from "./MyReviewCard";

export default function MyMain({ email }: PropsType) {
  const { data: myInfo, isPending } = useMyInfo(email);

  if (!myInfo || isPending) {
    return <PartLoadingUI className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />;
  };

  return (
    <main className="w-full px-5 mx-auto md:w-[600px] md:px-0">
        <section className="mb-16 md:mb-24">
          <Title>내 정보</Title>
          <article className="w-full flex justify-center items-center bg-white rounded-lg py-10 mt-8 md:justify-start md:px-24">
            <section>
              <CgProfile size="60" color="#4A68F5" />
            </section>
            <section className="ml-5 text-dark-gray text-sm sm:text-base">
              <div className="mb-3">{myInfo.user_info.email}</div>
              <NameContainer nickname={myInfo.user_info.nickname} />
            </section>
          </article>
        </section>
        <section className="mb-20">
          <Title>내가 쓴 공간 기록</Title>
          {myInfo.reviews.length ? myInfo.reviews.map((myReview) => (
            <MyReviewCard myReview={myReview} key={myReview.post_id} />
          )) : (
            <article className="mt-36 text-lg text-center text-default font-bold">
              <div>아직 작성한 공간 기록이 없어요.</div>
              <div>첫 공간 기록을 남겨보세요.</div>
            </article>
          )}
        </section>
      </main>
  );
}

interface PropsType {
  email: string;
}