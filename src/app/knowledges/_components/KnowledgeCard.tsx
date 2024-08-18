'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { HiHandThumbUp, HiHandThumbDown } from "react-icons/hi2";

import { getPreviewText, parseDate, stripHtml } from "@/utils/modules";

export default function KnowledgeCard({ knowledgeInfo }: PropsType) {
  const [previewText, setPreviewText] = useState<string>('');

  useEffect(() => {
    const strippedText = stripHtml(knowledgeInfo.knowledge_content);
    const preview = getPreviewText(strippedText, 80);
    setPreviewText(preview);
  }, [knowledgeInfo.knowledge_content]);

  return (
    <Link
      className="w-full border border-gray shadow-sm mx-auto rounded-xl text-xs text-middle-gray transition-all"
      href={`/knowledges/${knowledgeInfo.knowledge_id}`}
    >
      <section className="px-5 py-3 space-y-2">
        <article className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <CgProfile className="size-[20px] md:size-[25px]" size="40" color="#C1C1C1" />
            </div>
            <div className="ml-1">{knowledgeInfo.author_nickname}</div>
          </div>
          <div>{parseDate(knowledgeInfo.create_at)}</div>
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
            <div className="font-bold">{knowledgeInfo.likes}</div>
          </div>
          <div className="flex items-center">
            <div>
              <HiHandThumbDown className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </div>
            <div className="font-bold">{knowledgeInfo.dislikes}</div>
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