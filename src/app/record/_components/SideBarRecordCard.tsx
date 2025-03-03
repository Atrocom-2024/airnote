'use client'

import { useSession } from "next-auth/react";
import { HiHandThumbUp, HiHandThumbDown } from "react-icons/hi2";

import { parseDate } from "@/utils/modules";
import { useRecordReaction } from "@/app/_lib/hooks";
import DefaultProfile from "@/app/_components/DefaultProfile";

export default function SideBarRecordCard({ record }: PropsType) {
  const { data: session } = useSession();
  const { mutate: postRecordLike } = useRecordReaction(record.post_id, 'like');
  const { mutate: postRecordDislike } = useRecordReaction(record.post_id, 'dislike');
  const recordContent = record.content.split('\n');

  const reactionClickHandler = (reactionType: 'like' | 'dislike') => {
    if (!session) {
      return alert('로그인 후 이용 가능합니다.');
    }
    if (reactionType === 'like') {
      postRecordLike();
    } else {
      postRecordDislike();
    }
  }

  return (
    <article className="w-full flex border-b border-default p-3">
      <section>
        <DefaultProfile className="rounded-2xl" />
      </section>
      <section className="ml-3 w-full">
        <article className="text-sm">
          <div className="font-bold">{record.address_detail}</div>
          <div className="flex items-center mt-1">
            <div className="text-default font-bold">{record.author_nickname}</div>
            <div className="text-middle-gray flex items-center">
              <div>ㆍ</div>
              <div>{ parseDate(record.create_at) }</div>
            </div>
          </div>
        </article>
        <article  className="bg-dark-white rounded-lg p-2 my-3 text-light-black text-sm">
          {recordContent.map((content, idx) => {
            if (!content) {
              return <br key={idx} />;
            }
            return <p className="break-words" key={idx}>{content}</p>;
          })}
        </article>
        <article className="flex justify-end items-center mr-5 text-gray">
          <div className="flex items-center mr-3">
            <button onClick={() => reactionClickHandler('like')}>
              <HiHandThumbUp className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </button>
            <div className="text-xs ml-1 sm:text-sm">{ record.likes }</div>
          </div>
          <div className="flex items-center">
            <button onClick={() => reactionClickHandler('dislike')}>
              <HiHandThumbDown className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </button>
            <div className="text-xs ml-1 sm:text-sm">{ record.dislikes }</div>
          </div>
        </article>
      </section>
    </article>
  );
}

interface PropsType {
  record: ReviewType;
}

interface ReviewType {
  post_id: string;
  author_nickname: string;
  address: string;
  address_detail: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: Date;
}