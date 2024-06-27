'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaAngleLeft } from "react-icons/fa6";

import { getReviews } from "@/app/_lib/api";
import Sidebar from "@/app/_components/layouts/Sidebar";
import SideBarReviewCard from "./SideBarReviewCard";
import PartLoadingUI from "../../_components/PartLoadingUI";
import { Roadview, RoadviewMarker } from "react-kakao-maps-sdk";

// TODO: 좋아요/싫어요 기능 구현
export default function ReviewSideBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const address = searchParams?.get('address');
  const lat = searchParams?.get('lat');
  const lng = searchParams?.get('lng');
  const position = { lat: Number(lat), lng: Number(lng) };
  const { data: reviews, error, isLoading } = useQuery<ReviewType[]>({
    queryKey: ['reviews', { lat, lng }],
    queryFn: () => getReviews(lat!, lng!),
    // lat과 lng가 있을 때만 쿼리를 활성화합니다.
    enabled: !!lat && !!lng
  });

  // 에러 처리 로직 (옵셔널)
  useEffect(() => {
    if (error) {
      console.error(error);
      alert('알 수 없는 오류로 데이터 받아오기에 실패했습니다. 네트워크 상태를 확인해주세요.');
    }
  }, [error]);

  return (
    <Sidebar>
      {isLoading ? <PartLoadingUI /> : (
        <>
          <section className="flex items-center p-3">
            <button type="button" onClick={() => router.back()}>
              <FaAngleLeft size="25" fill="#4A68F5" />
            </button>
            <div className="text-xl text-default font-bold ml-2">{address}</div>
          </section>
          {lat && lng && (
            <section className=" border-y-[1.5px] border-default">
              <Roadview
                position={{ ...position, radius: 50 }}
                style={{
                  // 지도의 크기
                  width: "100%",
                  height: "300px",
                }}
              >
                <RoadviewMarker position={position}>
                  <div style={{ color: "#000", width: "100%", height: "max-content" }}>{address}</div>
                </RoadviewMarker>
              </Roadview>
            </section>
          )}
          <section>
            {reviews && reviews.map((review) => (
              <SideBarReviewCard review={review} key={review._id} />
            ))}
          </section>
        </>
      )}
    </Sidebar>
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
