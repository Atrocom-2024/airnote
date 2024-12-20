'use client'

import { useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { debounce } from "lodash";

import { useRecordSearchAdmin } from "@/app/_lib/hooks";
import AdminRecordCard from "./AdminRecordCard";
import PartLoadingUI from "@/app/_components/PartLoadingUI";

export default function SearchRecordSection() {
  const [keyword, setKeyword] = useState<string>('');
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>('');
  const { data: recordList, isPending } = useRecordSearchAdmin(debouncedKeyword);
  
  const debouncedKeywordChangeHandler = useMemo(() => debounce((keyword: string) => {
    setDebouncedKeyword(keyword);
  }, 500), []);
  
  const keywordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    debouncedKeywordChangeHandler(e.target.value);
  };

  return (
    <section className="px-10 col-span-8 overflow-y-auto md:w-[700px] md:col-span-9 lg:col-span-10">
      <article className="flex items-center">
        <section className="font-bold text-default text-2xl mr-5">공간기록 관리</section>
        <section className="w-[350px] relative border-[1.5px] border-default rounded-full">
          <input
            className="h-[5vh] px-5 rounded-full outline-none"
            value={keyword}
            onChange={keywordChangeHandler}
            placeholder="주소를 입력해주세요."
          />
          <IoSearch className="absolute top-1/2 right-3 -translate-y-1/2" size="30" color="#4A68F5" />
        </section>
      </article>
      <article className="min-h-[500px] mt-10 flex justify-center items-center">
        <div className="space-y-10">
          {isPending ? <PartLoadingUI /> : (
            recordList && recordList.length ? recordList.map((record) => (
              <AdminRecordCard record={record} key={record.post_id} />
            )) : (
              <section className="text-default font-bold text-xl">기록이 없습니다. 주소로 검색해주세요.</section>
            )
          )}
        </div>
      </article>
    </section>
  );
}
