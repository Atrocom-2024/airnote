'use client'

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function SideBar() {
  const [ reviews, setReviews ] = useState<ReviewType[]>([]);
  const searchParams = useSearchParams();
  const sidebar = Boolean(searchParams?.get('sidebar'));
  const address = searchParams?.get('address');
  const lat = searchParams?.get('lat');
  const lng = searchParams?.get('lng');

  const getReviewsHandler = useCallback(async (lat: string, lng: string) => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    try {
      const res = await fetch(`${domain}/api/reviews?lat=${lat}&lng=${lng}`);
      const json = await res.json();
      if (res.ok) {
        setReviews(json);
      } else {
        return alert('알 수 없는 오류로 데이터 받아오기에 실패했습니다. 네트워크 상태를 확인해주세요.');
      }
    } catch (err) {
      console.error(err);
      return alert('알 수 없는 오류로 데이터 받아오기에 실패했습니다. 네트워크 상태를 확인해주세요.');
    }
  }, []);

  useEffect(() => {
    if (sidebar && lat && lng) {
      getReviewsHandler(lat, lng);
    }
  }, [sidebar, getReviewsHandler, lat, lng])

  return (
    <article className="absolute top-[8vh] left-0 w-[400px] h-[84vh] bg-white border-r-[1.5px] border-purple shadow-lg z-[29]">
      <section className="p-3">
        <div className="text-xl text-purple font-bold">{address}</div>
      </section>
    </article>
  );
}

interface ReviewType {
  _id: string;
  author_name: string;
  address: string;
  address_detail: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: string;
}