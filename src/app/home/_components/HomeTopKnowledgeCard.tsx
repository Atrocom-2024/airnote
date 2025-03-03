import Link from "next/link";
import { useEffect, useState } from "react";

import { getPreviewText, parseDate, stripHtml } from "@/utils/modules";
import DefaultProfile from "@/app/_components/DefaultProfile";
import ReactionContainer from "@/app/_components/ReactionContainer";

export default function HomeTopKnowledgeCard({ topKnowledge, isLast }: PropsType) {
  const [ previewText, setPreviewText ] = useState<string>('');

  useEffect(() => {
    const strippedText = stripHtml(topKnowledge.knowledge_content);
    const preview = getPreviewText(strippedText, 200);
    setPreviewText(preview);
  }, [topKnowledge.knowledge_content]);

  return (
    <Link
      className={`w-full px-5 py-3 flex ${isLast ? '' : 'border-b border-gray'}`}
      href={`/knowledges/${topKnowledge.knowledge_id}`}
    >
      <section>
        <DefaultProfile className="rounded-2xl" />
      </section>
      <section className="ml-3 w-full">
        <article className="text-sm">
          <div className="font-bold">{topKnowledge.knowledge_title}</div>
          <div className="flex items-center mt-1">
            <div className="text-default font-bold">{topKnowledge.author_nickname}</div>
            <div className="text-middle-gray flex items-center">
              <div>ㆍ</div>
              <div>{ parseDate(topKnowledge.create_at) }</div>
            </div>
          </div>
        </article>
        <article  className="bg-dark-white rounded-lg p-2 my-3 text-light-black text-sm">
          {previewText}
        </article>
        <ReactionContainer likes={topKnowledge.likes} dislikes={topKnowledge.dislikes} />
      </section>
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