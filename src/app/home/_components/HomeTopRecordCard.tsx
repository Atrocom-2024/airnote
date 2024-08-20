'use client';

import Link from "next/link";

import { parseDate } from "@/utils/modules";
import { useMapHandle, useSidebar } from "@/app/_lib/store";
import DefaultProfile from "@/app/_components/DefaultProfile";
import ReactionContainer from "@/app/_components/ReactionContainer";

export default function HomeTopRecordCard({ topRecord, isLast }: PropsType) {
  const { closeMap } = useMapHandle();
  const { openSidebar } = useSidebar();
  const recordContent = topRecord.content.split('\n');

  const linkClickHandler = () => {
    closeMap();
    openSidebar();
  }
  
  return (
    <Link
      className={`"w-full px-5 py-3 flex ${isLast ? '' : 'border-b border-gray'}`}
      href={`/record?sidebar=true&lat=${topRecord.latitude}&lng=${topRecord.longitude}&address=${topRecord.address}`}
      onClick={linkClickHandler}
    >
      <section>
        <DefaultProfile className="rounded-2xl" />
      </section>
      <section className="ml-3 w-full">
        <article className="text-sm">
          <div className="font-bold">{topRecord.address}</div>
          <div className="flex items-center mt-1">
            <div className="text-default font-bold">{topRecord.author_nickname}</div>
            <div className="text-middle-gray flex items-center">
              <div>ㆍ</div>
              <div>{ parseDate(topRecord.create_at) }</div>
            </div>
          </div>
        </article>
        <article  className="my-3 text-light-black text-sm">
          {recordContent.map((content, idx) => {
            if (!content) {
              return <br key={idx} />;
            }
            return <p className="break-words" key={idx}>{content}</p>;
          })}
        </article>
        <ReactionContainer likes={topRecord.likes} dislikes={topRecord.dislikes} />
      </section>
    </Link>
  );
}

interface PropsType {
  topRecord: TopRecordType;
  isLast: boolean;
}

interface TopRecordType {
  post_id: string;
  author_nickname: string;
  address: string;
  address_detail: string;
  latitude: string;
  longitude: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: Date;
};