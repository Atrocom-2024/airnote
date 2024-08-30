'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { HiHandThumbUp, HiHandThumbDown } from "react-icons/hi2";

import { getPreviewText, parseDate, stripHtml } from "@/utils/modules";
import DefaultProfile from "@/app/_components/DefaultProfile";

export default function KnowledgeCard({ knowledgeInfo }: PropsType) {
  const [previewText, setPreviewText] = useState<string>('');

  useEffect(() => {
    const strippedText = stripHtml(knowledgeInfo.knowledge_content);
    const preview = getPreviewText(strippedText, 80);
    setPreviewText(preview);
  }, [knowledgeInfo.knowledge_content]);

  return (
    <Link
      className="w-full border border-gray shadow-sm mx-auto rounded-xl text-middle-gray"
      href={`/knowledges/${knowledgeInfo.knowledge_id}`}
    >
      <section className="px-5 py-3 space-y-2">
        <article className="flex items-center">
          <div>
            <DefaultProfile className="rounded-xl" width="w-[40px]" />
          </div>
          <div className="flex items-center text-default ml-1">
            <div className="ml-1 font-bold">{knowledgeInfo.author_nickname}</div>
            <div className="text-middle-gray flex items-center">
              <div>ㆍ</div>
              <div>{parseDate(knowledgeInfo.create_at)}</div>
            </div>
          </div>
        </article>
        <article>
          <div className="text-base text-black font-bold">{getPreviewText(knowledgeInfo.knowledge_title, 30)}</div>
          <div className="text-xs text-middle-gray mt-1">{previewText}</div>
        </article>
        <article className="flex justify-end items-center">
          <div className="flex items-center mr-2">
            <div>
              <HiHandThumbUp className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </div>
            <div className="ml-1">{knowledgeInfo.likes}</div>
          </div>
          <div className="flex items-center">
            <div>
              <HiHandThumbDown className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </div>
            <div className="ml-1">{knowledgeInfo.dislikes}</div>
          </div>
        </article>
      </section>
    </Link>
  );
}

interface PropsType {
  knowledgeInfo: topKnowledgeType;
}

interface topKnowledgeType {
  knowledge_id: string;
  author_nickname: string;
  knowledge_title: string;
  knowledge_content: string;
  likes: number;
  dislikes: number;
  thumbnail_url: string;
  create_at: Date;
}