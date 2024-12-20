'use client'

import { useMemo, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { debounce } from "lodash";

import { useKnowledgeSearchAdmin } from "@/app/_lib/hooks";
import AdminKnowledgeCard from "./AdminKnowledgeCard";
import PartLoadingUI from "@/app/_components/PartLoadingUI";

export default function SearchKnowledgeSection() {
  const [keyword, setKeyword] = useState<string>('');
  const [debouncedKeyword, setDebouncedKeyword] = useState<string>('');
  const { data: knowledges, isPending } = useKnowledgeSearchAdmin(debouncedKeyword);

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
        <section className="font-bold text-default text-2xl mr-5">공간지식 관리</section>
        <section className="w-[350px] relative border-[1.5px] border-default rounded-full">
          <input
            className="h-[5vh] px-5 rounded-full outline-none"
            value={keyword}
            onChange={keywordChangeHandler}
            placeholder="제목을 입력해주세요."
          />
          <IoSearch className="absolute top-1/2 right-3 -translate-y-1/2" size="30" color="#4A68F5" />
        </section>
      </article>
      <article className="min-h-[500px] mt-10 flex justify-center items-center">
        <div className="w-full space-y-10">
          {isPending ? <PartLoadingUI /> : (
            knowledges && knowledges.length ? knowledges.map((knowledge) => (
              <AdminKnowledgeCard knowledge={knowledge} key={knowledge.knowledge_id} />
            )) : (
              <section className="text-default font-bold text-xl">지식이 없습니다. 제목으로 검색해주세요.</section>
            )
          )}
        </div>
      </article>
    </section>
  );
}