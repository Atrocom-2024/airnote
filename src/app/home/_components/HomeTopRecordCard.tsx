'use client';

import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

import { parseDate } from "@/utils/modules";
import { useMapHandle, useSidebar } from "@/app/_lib/store";

export default function HomeTopRecordCard({ topRecord, isLast }: PropsType) {
  const { closeMap } = useMapHandle();
  const { openSidebar } = useSidebar();

  const linkClickHandler = () => {
    closeMap();
    openSidebar();
  }
  
  return (
    <Link
      className={`"w-full ${isLast ? '' : 'border-b border-gray'} px-5 py-3 block`}
      href={`/record?lat=${topRecord.latitude}&lng=${topRecord.longitude}&address=${topRecord.address}`}
      onClick={linkClickHandler}
    >
      <section className="flex justify-between items-center text-middle-gray">
        <div className="flex items-center">
          <div className="flex items-center">
            <div>
              <CgProfile size="30" color="#AFAFAF" />
            </div>
            <div className="text-sm ml-1">{topRecord.author_nickname}</div>
          </div>
          <div className="text-sm ml-3">{ parseDate(topRecord.create_at) }</div>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <div>
              <AiOutlineLike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </div>
            <div className="text-xs ml-1 sm:text-sm">{ topRecord.likes }</div>
          </div>
          <div className="flex items-center">
            <div>
              <AiOutlineDislike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </div>
            <div className="text-xs ml-1 sm:text-sm">{ topRecord.dislikes }</div>
          </div>
        </div>
      </section>
      <section className="mt-3 text-sm">{topRecord.content}</section>
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