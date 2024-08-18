'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiHandThumbUp, HiHandThumbDown } from "react-icons/hi2";

import { getPreviewText, parseDate, stripHtml } from "@/utils/modules";
import { useDeleteKnowledge } from "@/app/_lib/hooks";
import LoadingUI from "@/app/_components/LoadingUI";

export default function ProfileKnowledgeCard({ knowledgeInfo }: PropsType) {
  const [ previewText, setPreviewText ] = useState<string>('');
  const { mutate: deleteknowledge, isPending } = useDeleteKnowledge(knowledgeInfo.knowledge_id);

  const knowledgeDeleteClickHandler = () => {
    const confirmDeleteknowledge = confirm('정말 지식을 삭제하시겠습니까?');
    if (confirmDeleteknowledge) {
      deleteknowledge();
    }
  }

  useEffect(() => {
    const strippedText = stripHtml(knowledgeInfo.knowledge_content);
    const preview = getPreviewText(strippedText, 100);
    setPreviewText(preview);
  }, [knowledgeInfo.knowledge_content]);

  if (isPending) {
    return <LoadingUI />;
  }

  return (
    <article className="border-b border-gray py-5 flex items-center">
      <section>
        <section className="w-[120px] md:w-[150px]">
          <Image
            className="w-[120px] h-[120px] object-cover border border-gray rounded-lg md:w-[150px] md:h-[150px]"
            src={knowledgeInfo.thumbnail_url ? knowledgeInfo.thumbnail_url : '/airnote-thumbnail.jpg'}
            width={300}
            height={300}
            alt="썸네일"
          />
        </section>
      </section>
      <section className="ml-5">
        <section className="flex justify-between items-center">
          <div className="text-sm font-bold sm:text-lg">{getPreviewText(knowledgeInfo.knowledge_title, 18)}</div>
          <div className="hidden md:block">
            <Link
              className="bg-white-gray px-4 py-2 rounded-lg mr-2 text-sm"
              href={`/profile/knowledges/${knowledgeInfo.knowledge_id}/edit`}
            >지식수정</Link>
            <button
              className="bg-white-gray px-4 py-2 rounded-lg text-sm"
              type="button"
              onClick={knowledgeDeleteClickHandler}
            >지식삭제</button>
          </div>
        </section>
        <section className="mt-2 text-xs sm:text-sm md:mt-5">{previewText}</section>
        <section className="flex justify-end items-center mt-2 text-middle-gray md:mt-5">
          <div className="flex items-center mr-5">
            <div className="flex items-center mr-2">
              <div>
                <HiHandThumbUp className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
              </div>
              <div className="text-xs ml-1 sm:text-sm">{ knowledgeInfo.likes }</div>
            </div>
            <div className="flex items-center">
              <div>
                <HiHandThumbDown className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
              </div>
              <div className="text-xs ml-1 sm:text-sm">{ knowledgeInfo.dislikes }</div>
            </div>
          </div>
          <div className="text-xs sm:text-sm">{ parseDate(knowledgeInfo.create_at) }</div>
        </section>
        <div className="text-end block mt-2 md:hidden">
            <Link
              className="text-xs bg-white-gray px-4 py-2 rounded-lg mr-2 md:text-sm"
              href={`/profile/knowledges/${knowledgeInfo.knowledge_id}/edit`}
            >지식수정</Link>
            <button
              className="text-xs bg-white-gray px-4 py-2 rounded-lg md:text-sm"
              type="button"
              onClick={knowledgeDeleteClickHandler}
            >지식삭제</button>
          </div>
      </section>
    </article>
  );
}

interface PropsType {
  knowledgeInfo: MyKnowledgesType;
}

interface MyKnowledgesType {
  knowledge_id: string;
  knowledge_title: string;
  knowledge_content: string;
  likes: number;
  dislikes: number;
  thumbnail_url: string;
  create_at: Date;
}