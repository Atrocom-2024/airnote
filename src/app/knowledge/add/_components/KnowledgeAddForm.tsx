'use client';

import KnowledgeAddFormQuill from "./KnowledgeAddFormQuill";

export default function KnowledgeAddForm() {
  return (
    <form className="mt-10 text-light-black space-y-10 grid grid-cols-1">
      <section>
        <div>제목</div>
        <input
          className="block w-full h-[40px] border border-gray rounded-md outline-none text-sm px-3 mt-3"
          type="text"
          placeholder="제목을 입력해주세요."
        />
      </section>
      <section>
        <div>본문</div>
        <KnowledgeAddFormQuill />
      </section>
      <section>
        <div>대표사진</div>
        <input
          className="block w-full border border-gray rounded-md outline-none text-sm px-3 py-2 mt-3"
          type="file"
        />
      </section>
      <button className="px-6 py-3 mx-auto bg-default rounded-xl text-sm text-white">작성완료</button>
    </form>
  );
}