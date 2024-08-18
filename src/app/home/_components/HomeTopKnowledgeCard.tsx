import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { HiHandThumbUp, HiHandThumbDown } from "react-icons/hi2";

import { parseDate } from "@/utils/modules";

export default function HomeTopKnowledgeCard({ topKnowledge, isLast }: PropsType) {
  return (
    <Link
      className={`w-full ${isLast ? '' : 'border-b border-gray'} px-5 py-3 block`}
      href={`/knowledges/${topKnowledge.knowledge_id}`}
    >
      <section className="flex justify-between items-center text-middle-gray">
        <div className="flex items-center">
          <div className="flex items-center">
            <div>
              <CgProfile size="30" color="#AFAFAF" />
            </div>
            <div className="text-sm ml-1">{topKnowledge.author_nickname}</div>
          </div>
          <div className="text-sm ml-3">{ parseDate(topKnowledge.create_at) }</div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <div>
              <HiHandThumbUp className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </div>
            <div className="text-xs ml-1 sm:text-sm">{ topKnowledge.likes }</div>
          </div>
          <div className="flex items-center">
            <div>
              <HiHandThumbDown className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </div>
            <div className="text-xs ml-1 sm:text-sm">{ topKnowledge.dislikes }</div>
          </div>
        </div>
      </section>
      <section className="mt-2 font-semibold">{topKnowledge.knowledge_title}</section>
    </Link>
  );
}

interface PropsType {
  topKnowledge: KnowledgeType;
  isLast: boolean;
}

interface KnowledgeType {
  knowledge_id: string;
  author_nickname: string;
  knowledge_title: string;
  knowledge_content: string;
  likes: number;
  dislikes: number;
  thumbnail_url: string;
  create_at: Date;
}