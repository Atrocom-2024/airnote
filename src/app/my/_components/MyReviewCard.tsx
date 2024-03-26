import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

export default function MyReviewCard({ myReview }: PropsType) {
  return (
    <article className="w-full bg-white shadow-lg rounded-md p-5 mt-8">
      <section className="flex items-center sm:items-end">
        <div className="text-sm text-purple font-bold sm:text-xl">{myReview.address}</div>
        <div className="text-xs text-purple ml-3 sm:text-sm">{myReview.address_detail}</div>
      </section>
      <section className="mt-5 text-sm sm:text-base">{ myReview.content }</section>
      <section className="flex justify-end items-center text-gray font-bold mt-5">
        <div className="flex items-center mr-5">
          <div className="flex items-center mr-2">
            <div>
              <AiOutlineLike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </div>
            <div className="text-xs sm:text-sm">{ myReview.likes }</div>
          </div>
          <div className="flex items-center">
            <div>
              <AiOutlineDislike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </div>
            <div className="text-xs sm:text-sm">{ myReview.dislikes }</div>
          </div>
        </div>
        {/* TODO: 날짜를 03 형태로 변경하는 과정 필요 */}
        <div className="text-xs sm:text-sm">{ myReview.create_at.substring(0, 12) }</div>
      </section>
    </article>
  );
}

interface PropsType {
  myReview: {
    _id: string;
    author_email: string;
    author_name: string;
    address: string;
    address_detail: string;
    content: string;
    likes: number;
    dislikes: number;
    create_at: string;
  }
}