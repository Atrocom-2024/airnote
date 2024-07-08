'use client'

import Link from "next/link";

import { parseDate } from "@/utils/modules";
import { useMapLocation } from "@/app/_lib/store";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

export default function SearchResultCard({ review }: PropsType) {
  const { setMapLoc } = useMapLocation();

  return (
    <article className="border-b-[1.5px] border-default p-3">
      <div className="flex justify-between items-center">
        <Link
          className="text-default font-bold"
          href={`/home?sidebar=true&lat=${review.latitude}&lng=${review.longitude}&address=${encodeURIComponent(review.address)}`}
          onClick={() => setMapLoc({ lat: Number(review.latitude), lng: Number(review.longitude) })}
        >{review.address}</Link>
        <div className="text-gray text-sm">{ parseDate(review.create_at) }</div>
      </div>
      <div className="px-2 my-5 text-sm">{ review.content }</div>
      <div className="flex justify-end items-center mr-5 text-gray">
        <div className="flex items-center mr-3">
          <div>
            <AiOutlineLike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
          </div>
          <div className="text-xs ml-1 sm:text-sm">{ review.likes }</div>
        </div>
        <div className="flex items-center">
          <div>
            <AiOutlineDislike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
          </div>
          <div className="text-xs ml-1 sm:text-sm">{ review.dislikes }</div>
        </div>
      </div>
    </article>
  );
}

interface PropsType {
  review: {
    post_id: string;
    address: string;
    address_detail: string;
    latitude: number;
    longitude: number;
    content: string;
    likes: number;
    dislikes: number;
    create_at: Date;
  };
}
