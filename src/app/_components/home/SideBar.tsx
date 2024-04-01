'use client'

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import SideBarReviewCard from "./SideBarReviewCard";
import PartLoadingUI from "../PartLoadingUI";

// 리뷰 데이터를 가져오는 함수
const getReviews = async (lat: string, lng: string) => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const res = await fetch(`${domain}/api/reviews?lat=${lat}&lng=${lng}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

export default function SideBar() {
  const searchParams = useSearchParams();
  const sidebar = Boolean(searchParams?.get('sidebar'));
  const address = searchParams?.get('address');
  const lat = searchParams?.get('lat');
  const lng = searchParams?.get('lng');

  // useQuery를 사용하여 리뷰 데이터 가져오기
  const { data: reviews, error, isLoading } = useQuery<ReviewType[]>({
    queryKey: ['reviews', { lat, lng }],
    queryFn: () => getReviews(lat!, lng!),
    // lat과 lng가 있을 때만 쿼리를 활성화합니다.
    enabled: !!lat && !!lng
  });

  // 에러 처리 로직 (옵셔널)
  useEffect(() => {
    if (error) {
      alert('알 수 없는 오류로 데이터 받아오기에 실패했습니다. 네트워크 상태를 확인해주세요.');
      console.error(error);
    }
  }, [error]);

  return (
    <article className="absolute top-[8vh] left-0 w-[400px] h-[84vh] bg-white border-r-[1.5px] border-purple shadow-lg z-[29]">
      {isLoading ? <PartLoadingUI /> : (
        <>
          <section className="p-3">
            <div className="text-xl text-purple font-bold">{address}</div>
          </section>
          <section>
            {reviews && reviews.map((review) => (
              <SideBarReviewCard review={review} key={review._id} />
            ))}
          </section>
        </>
      )}
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

// import { useSearchParams } from "next/navigation";
// import { useCallback, useEffect, useState } from "react";
// import SideBarReviewCard from "./SideBarReviewCard";

// export default function SideBar() {
//   const [ reviews, setReviews ] = useState<ReviewType[]>([]);
//   const searchParams = useSearchParams();
//   const sidebar = Boolean(searchParams?.get('sidebar'));
//   const address = searchParams?.get('address');
//   const lat = searchParams?.get('lat');
//   const lng = searchParams?.get('lng');

//   const getReviewsHandler = useCallback(async (lat: string, lng: string) => {
//     const domain = process.env.NEXT_PUBLIC_DOMAIN;
//     try {
//       const res = await fetch(`${domain}/api/reviews?lat=${lat}&lng=${lng}`);
//       const json = await res.json();
//       if (res.ok) {
//         setReviews(json);
//       } else {
//         return alert('알 수 없는 오류로 데이터 받아오기에 실패했습니다. 네트워크 상태를 확인해주세요.');
//       }
//     } catch (err) {
//       console.error(err);
//       return alert('알 수 없는 오류로 데이터 받아오기에 실패했습니다. 네트워크 상태를 확인해주세요.');
//     }
//   }, []);

//   useEffect(() => {
//     if (sidebar && lat && lng) {
//       getReviewsHandler(lat, lng);
//     }
//   }, [sidebar, getReviewsHandler, lat, lng])

//   return (
//     <article className="absolute top-[8vh] left-0 w-[400px] h-[84vh] bg-white border-r-[1.5px] border-purple shadow-lg z-[29]">
//       <section className="p-3">
//         <div className="text-xl text-purple font-bold">{address}</div>
//       </section>
//       <section>
//         {reviews && reviews.map((review) => (
//           <SideBarReviewCard review={review} key={review._id} />
//         ))}
//       </section>
//     </article>
//   );
// }

// interface ReviewType {
//   _id: string;
//   author_name: string;
//   address: string;
//   address_detail: string;
//   content: string;
//   likes: number;
//   dislikes: number;
//   create_at: string;
// }