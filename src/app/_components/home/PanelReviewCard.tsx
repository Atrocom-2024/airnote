import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

import { parseDate } from "@/utils/modules";
import Link from "next/link";

export default function PanelReviewCard({ topReview, updateMapLocHandler }: PropsType) {
  return (
    <article className="border-b-[1.5px] border-default p-3">
      <div className="flex justify-between items-center">
        <Link
          className="text-default font-bold"
          href={`/?sidebar=true&lat=${topReview.latitude}&lng=${topReview.longitude}&address=${encodeURIComponent(topReview.address)}`}
          onClick={() => updateMapLocHandler({ lat: Number(topReview.latitude), lng: Number(topReview.longitude) })}
        >{topReview.address}</Link>
        <div className="text-gray text-sm">{ parseDate(topReview.create_at) }</div>
      </div>
      <div className="px-2 my-5 text-sm">{ topReview.content }</div>
      <div className="flex justify-end items-center mr-5 text-gray">
        <div className="flex items-center mr-3">
          <div>
            <AiOutlineLike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
          </div>
          <div className="text-xs ml-1 sm:text-sm">{ topReview.likes }</div>
        </div>
        <div className="flex items-center">
          <div>
            <AiOutlineDislike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
          </div>
          <div className="text-xs ml-1 sm:text-sm">{ topReview.dislikes }</div>
        </div>
      </div>
    </article>
  );
}

interface PropsType {
  topReview: {
    _id: string;
    address: string;
    address_detail: string;
    latitude: string;
    longitude: string;
    content: string;
    likes: number;
    dislikes: number;
    create_at: string;
  };
  updateMapLocHandler: (loc: MapLocationType) => void;
}

interface MapLocationType {
  lat: number;
  lng: number;
}