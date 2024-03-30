import { FaArrowTrendUp } from "react-icons/fa6";

import PanelReviewCard from "./PanelReviewCard";

export default function PanelSection({ topReviews }: PropsType) {
  return (
    <section className="absolute top-[10vh] left-5 w-[400px] h-[75vh] bg-white shadow-lg z-50">
        <article>
          <section className="flex items-center p-3">
            <div>
              <FaArrowTrendUp size="25" color="#756AB6" />
            </div>
            <div className="text-xl text-purple font-bold ml-3">실시간 인기 후기</div>
          </section>
          <section>
            {topReviews.map((topReview) => (
              <PanelReviewCard topReview={topReview} key={topReview._id} />
            ))}
          </section>
        </article>
        <article>
          <section></section>
          <section></section>
        </article>
      </section>
  );
}

interface PropsType {
  topReviews: TopReviewType[]
}

interface TopReviewType {
  _id: string;
  address: string;
  address_detail: string;
  latitude: string;
  longitude: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: string;
}