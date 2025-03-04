'use client';

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { HiHandThumbUp, HiHandThumbDown } from "react-icons/hi2";

import { getPreviewText, parseDate, stripHtml } from "@/utils/modules";

export default function KnowledgeCard({ knowledgeInfo }: PropsType) {
  const [previewText, setPreviewText] = useState<string>('');

  useEffect(() => {
    const strippedText = stripHtml(knowledgeInfo.knowledge_content);
    const preview = getPreviewText(strippedText, 45);
    setPreviewText(preview);
  }, [knowledgeInfo.knowledge_content]);

  return (
    <Link
      className="mx-auto rounded-xl text-middle-gray group"
      href={`/knowledges/${knowledgeInfo.knowledge_id}`}
    >
      <article className="flex justify-between gap-10 py-5">
        <section>
          <section>
            <div className="text-base text-black font-semibold transition-all group-hover:text-default md:text-lg">{getPreviewText(knowledgeInfo.knowledge_title, 30)}</div>
          </section>
          <section className="mt-1">
            <div className="text-xs text-middle-gray md:text-sm">{previewText}</div>
          </section>
          <section className="flex justify-between items-center mt-5">
            <section className="flex items-center">
              <div className="flex items-center text-default text-xs ml-1 md:text-sm">
                <div className="font-bold">{knowledgeInfo.author_nickname}</div>
                <div className="text-middle-gray flex items-center">
                  <div>ㆍ</div>
                  <div>{parseDate(knowledgeInfo.create_at)}</div>
                </div>
              </div>
            </section>
            <section className="flex justify-end items-center">
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
            </section>
          </section>
        </section>
        <section className="overflow-hidden rounded-xl">
          <Image
            className="w-[130px] h-[90px] rounded-xl object-cover transition-all group-hover:scale-125"
            src={knowledgeInfo.thumbnail_url}
            width={130}
            height={90}
            alt="썸네일"
          />
        </section>
      </article>
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