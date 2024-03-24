import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";

export default function MyReviewCard({ myReview }: PropsType) {
  return (
    <article className="w-full bg-white shadow-lg rounded-md p-5 mt-8">
      <section className="flex items-end">
        <div className="text-xl text-purple font-bold">{myReview.address}</div>
        <div className="text-sm text-purple ml-3">{myReview.address_detail}</div>
      </section>
      <section className="mt-5">{ myReview.content }</section>
      <section className="flex justify-end items-center text-gray font-bold mt-5">
        <div className="flex items-center mr-5">
          <div className="flex items-center mr-2">
            <div>
              <AiOutlineLike color="#AFAFAF" size="20" />
            </div>
            <div className="text-sm">{ myReview.likes }</div>
          </div>
          <div className="flex items-center">
            <div>
              <AiOutlineDislike color="#AFAFAF" size="20" />
            </div>
            <div className="text-sm">{ myReview.dislikes }</div>
          </div>
        </div>
        <div className="text-sm">{ myReview.create_at.substring(0, 12) }</div>
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