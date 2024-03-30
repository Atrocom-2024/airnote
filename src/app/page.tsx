import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { FaArrowTrendUp } from "react-icons/fa6";

import { parseDate } from "@/utills/modules";
import Layout from "./_components/layouts/Layout";
import HomeMapSection from "./_components/home/HomeMapSection";

export default async function Home() {
  const topReviews: TopReviewType[] = await getTopReviews();
  
  return (
    <Layout>
      <HomeMapSection />
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
              <article className="border-b-[1.5px] border-purple p-3" key={topReview._id}>
                <div className="flex justify-between items-center">
                  <div className="text-purple font-bold">{topReview.address}</div>
                  <div className="text-gray text-sm">{ parseDate(topReview.create_at) }</div>
                </div>
                <div className="my-5">{ topReview.content }</div>
                <div className="flex justify-end items-center mr-5 text-gray">
                  <div className="flex items-center mr-2">
                    <div>
                      <AiOutlineLike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
                    </div>
                    <div className="text-xs sm:text-sm">{ topReview.likes }</div>
                  </div>
                  <div className="flex items-center">
                    <div>
                      <AiOutlineDislike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
                    </div>
                    <div className="text-xs sm:text-sm">{ topReview.dislikes }</div>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </article>
        <article>
          <section></section>
          <section></section>
        </article>
      </section>
    </Layout>
  );
}

async function getTopReviews() {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const res = await fetch(`${domain}/api/reviews/top`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
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