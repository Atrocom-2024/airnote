'use client';

import KnowledgeAddFormQuill from "./KnowledgeAddFormQuill";

export default function KnowledgeAddForm() {
  return (
    <form className="mt-10 text-light-black space-y-10">
      <section>
        <div>제목</div>
        <input
          className="block w-full h-[40px] border border-gray rounded-md outline-none px-3 mt-3"
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
          className="block w-full h-[40px] border border-gray rounded-md outline-none px-3 mt-3"
          type="file"
          placeholder="제목을 입력해주세요."
        />
      </section>
    </form>
  );
}