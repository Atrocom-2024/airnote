'use client'

import { useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { debounce } from "lodash";

import { parseDate } from "@/utils/modules";
import { useUserSearch } from "@/app/_lib/hooks";
import PartLoadingUI from "@/app/_components/PartLoadingUI";

export default function SearchUserSection() {
  const [keyword, setKeyword] = useState<string>('');
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>('');
  const { data: users, isPending } = useUserSearch(debouncedKeyword);

  const debouncedKeywordChangeHandler = useMemo(() => debounce((keyword: string) => {
    setDebouncedKeyword(keyword);
  }, 500), []);
  
  const keywordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    debouncedKeywordChangeHandler(e.target.value);
  };


  return (
    <section className="px-10 col-span-8 md:w-[700px] md:col-span-9 lg:col-span-10">
      <article className="flex items-center">
        <section className="font-bold text-default text-2xl mr-5">사용자 정보 찾기</section>
        <section className="w-[350px] relative border-[1.5px] border-default rounded-full">
          <input
            className="h-[5vh] px-5 rounded-full outline-none"
            value={keyword}
            onChange={keywordChangeHandler}
            placeholder="사용자 닉네임을 입력해주세요."
          />
          <IoSearch className="absolute top-1/2 right-3 -translate-y-1/2" size="30" color="#4A68F5" />
        </section>
      </article>
      <article className="w-full mt-10">
        {isPending ? <PartLoadingUI className="mt-64" /> : (
          users ? users.map((userInfo) => (
            <article className="flex justify-center items-center border border-middle-gray rounded-lg py-10 mt-8 md:justify-start md:px-24" key={userInfo.id}>
              <section>
                <CgProfile size="60" color="#4A68F5" />
                <div className="text-default text-center text-xl font-bold mt-1">{userInfo.nickname}</div>
              </section>
              <section className="ml-5 text-dark-gray text-sm sm:text-base">
                <div>이메일: {userInfo.email}</div>
                <div>이름: {userInfo.name}</div>
                <div>전화번호: {`0${userInfo.phone_number.split(' ')[1]}`}</div>
                <div>가입날짜: {parseDate(userInfo.create_at)}</div>
              </section>
            </article>
          )) : (
            <section className="text-default font-bold text-xl">유저 정보가 없습니다. 사용자 닉네임으로 검색해주세요.</section>
          )
        )}
      </article>
    </section>
  );
}
