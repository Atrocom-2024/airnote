import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

export default function MyReviewCard({ myReview }: PropsType) {
  // 날짜 월, 일 2자리로 고정
  const reviewCreateAtSplit = myReview.create_at.split('. ');
  reviewCreateAtSplit[2] = reviewCreateAtSplit[2].padStart(2, '0');
  reviewCreateAtSplit[1] = reviewCreateAtSplit[1].padStart(2, '0');
  const reviewCreateAt = reviewCreateAtSplit.join('. ')

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
        <div className="text-xs sm:text-sm">{ reviewCreateAt.substring(0, 13) }</div>
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