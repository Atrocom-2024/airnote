import Link from "next/link";
import { HiHandThumbUp, HiHandThumbDown } from "react-icons/hi2";

import { parseDate } from "@/utils/modules";
import { useMapLocation, useSidebar } from "@/app/_lib/store";
import Image from "next/image";
import DefaultProfile from "@/app/_components/DefaultProfile";

export default function PanelRecordCard({ topRecord, isLast }: PropsType) {
  const { setMapLoc } = useMapLocation();
  const { openSidebar } = useSidebar();
  const topRecordContent = topRecord.content.split('\n');

  const linkClickHandler = () => {
    setMapLoc({ lat: Number(topRecord.latitude), lng: Number(topRecord.longitude) });
    openSidebar();
  }

  return (
    <Link
      className={`"w-full p-3 flex ${isLast ? '' : 'border-b border-gray'}`}
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
        <article  className="bg-dark-white rounded-lg p-2 my-3 text-light-black text-sm">
          {topRecordContent.map((content, idx) => {
            if (!content) {
              return <br key={idx} />;
            }
            return <p className="break-words" key={idx}>{content}</p>;
          })}
        </article>
        <article className="flex justify-end items-center mr-5 text-gray">
          <div className="flex items-center mr-3">
            <HiHandThumbUp className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
          <div className="text-xs ml-1 sm:text-sm">{ topRecord.likes }</div>
          </div>
          <div className="flex items-center">
            <HiHandThumbDown className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            <div className="text-xs ml-1 sm:text-sm">{ topRecord.dislikes }</div>
          </div>
        </article>
      </section>
    </Link>
  );
}

interface PropsType {
  topRecord: {
    post_id: string;
    address: string;
    address_detail: string;
    author_nickname: string;
    latitude: string;
    longitude: string;
    content: string;
    likes: number;
    dislikes: number;
    create_at: Date;
  };
  isLast: boolean;
}
