'use client';

import Link from "next/link";
import { HiHandThumbUp, HiHandThumbDown } from "react-icons/hi2";

export default function TopKnowledgeCard({ knowledgeInfo }: PropsType) {

  return (
    <Link
      className="w-full mx-auto text-xs text-middle-gray transition-all group"
      href={`/knowledges/${knowledgeInfo.knowledge_id}`}
    >
      <article className="space-y-3">
        <section>
          <h3 className="text-base text-black font-semibold transition-all group-hover:text-default">{getPreviewText(knowledgeInfo.knowledge_title, 20)}</h3>
        </section>
        <section className="flex justify-between items-center">
          <section>
            <span className="font-bold text-default">{knowledgeInfo.author_nickname}</span>
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
      </article>
    </Link>
  );
}

const getPreviewText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
};

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