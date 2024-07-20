import { CgProfile } from "react-icons/cg";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

import { parseDate } from "@/utils/modules";

export default function HomeTopRecordCard({ topReview }: PropsType) {
  return (
    <article className="w-full border-b border-gray px-5 py-3">
      <section className="flex justify-between items-center text-middle-gray">
        <div className="flex items-center">
          <div className="flex items-center">
            <div>
              <CgProfile size="30" color="#AFAFAF" />
            </div>
            <div className="text-sm ml-1">{topReview.author_nickname}</div>
          </div>
          <div className="text-sm ml-3">{ parseDate(topReview.create_at) }</div>
        </div>
        <div className="flex items-center">
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
      </section>
      <section className="mt-3 text-sm">{topReview.content}</section>
    </article>
  );
}

interface PropsType {
  topReview: TopReviewType;
}

interface TopReviewType {
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