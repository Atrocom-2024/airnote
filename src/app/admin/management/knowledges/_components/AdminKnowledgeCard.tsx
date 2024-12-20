'use client'

import Image from "next/image";
import { AiOutlineLoading } from "react-icons/ai";

import { parseDate } from "@/utils/modules";
import { useDeleteKnowledgeAdmin } from "@/app/_lib/hooks";

export default function AdminKnowledgeCard({ knowledge }: PropsType) {
  const { mutate, isPending } = useDeleteKnowledgeAdmin();

  return (
    <article className="w-full border-b border-middle-gray flex items-center py-5">
      <Image
        className="w-[200px] h-[250px] border border-gray rounded-md object-cover mr-5"
        src={knowledge.thumbnail_url ? knowledge.thumbnail_url : '/no-file-img.jpg'}
        width={400}
        height={0}
        alt="인증파일"
      />
      <section>
        <article className="text-sm">
          <div className="text-lg font-bold">{knowledge.knowledge_title}</div>
          <div className="flex items-center mt-1">
            <div className="text-default font-bold">{knowledge.author_nickname}</div>
            <div className="text-middle-gray flex items-center">
              <div>ㆍ</div>
              <div>{ parseDate(knowledge.create_at) }</div>
            </div>
          </div>
        </article>
        {/* <article className="px-2 mt-5 mb-10 text-sm">
          {recordContent.map((content, idx) => {
            if (!content) {
              return <br key={idx} />;
            }
            return <p className="break-words" key={idx}>{content}</p>;
          })}
        </article> */}
        <article className="space-y-1 text-sm font-bold">
          <div>작성자 이메일: {knowledge.author_email}</div>
          <div>작성자 이름: {knowledge.author_name}</div>
        </article>
        <article className="text-end">
          <button
            className="w-[80px] h-[36px] bg-default rounded-lg text-white text-sm text-center py-2"
            onClick={() => mutate(knowledge.knowledge_id)}
            disabled={isPending}
          >{isPending ? <AiOutlineLoading className="animate-spin mx-auto" size="30" color="white" /> : '지식제거'}</button>
        </article>
      </section>
    </article>
  );
}

interface PropsType {
  knowledge: AdminKnowledgeType
}

interface AdminKnowledgeType {
  knowledge_id: string;
  author_email: string;
  author_nickname: string;
  author_name: string;
  knowledge_title: string;
  knowledge_content: string;
  likes: number;
  dislikes: number;
  thumbnail_url: string;
  create_at: Date;
}