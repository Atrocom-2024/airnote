'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { CustomOverlayRoadview, Roadview } from "react-kakao-maps-sdk";
import { FaAngleLeft } from "react-icons/fa6";

import { getRecords } from "@/app/_lib/api";
import Sidebar from "@/app/_components/layouts/Sidebar";
import SideBarRecordCard from "./SideBarRecordCard";
import PartLoadingUI from "../../_components/PartLoadingUI";
import RoadviewCustomOverlay from "./RoadviewCustomOverlay";
import { useSidebar } from "@/app/_lib/store";

export default function RecordSideBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { closeSidebar } = useSidebar();
  const roadviewRef = useRef(null);
  const address = searchParams?.get('address');
  const lat = searchParams?.get('lat');
  const lng = searchParams?.get('lng');
  const position = { lat: Number(lat), lng: Number(lng) };
  const { data: records, error, isLoading } = useQuery<RecordType[]>({
    queryKey: ['records', { lat, lng }],
    queryFn: () => getRecords(lat!, lng!),
    // lat과 lng가 있을 때만 쿼리를 활성화합니다.
    enabled: !!lat && !!lng
  });

  const moveBackClickHandler = () => {
    closeSidebar();
    router.push(`/record`);
  }

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
            <button type="button" onClick={moveBackClickHandler}>
              <FaAngleLeft size="25" fill="#4A68F5" />
            </button>
            <div className="text-xl text-default font-bold ml-2">{address}</div>
          </section>
          {lat && lng && (
            <section className=" border-y border-default">
              <Roadview
                position={{ ...position, radius: 50 }}
                style={{
                  // 지도의 크기
                  width: "100%",
                  height: "300px",
                }}
                ref={roadviewRef}
              >
                <CustomOverlayRoadview
                  position={position}
                  onCreate={(overlay) => {
                    const roadview: any = roadviewRef.current;
                    const projection = roadview.getProjection();
                    const viewPoint = projection.viewpointFromCoords(
                      overlay.getPosition(),
                      overlay.getAltitude()
                    );
                    roadview.setViewpoint(viewPoint);
                  }}
                >
                  {address && <RoadviewCustomOverlay address={address} />}
                </CustomOverlayRoadview>
              </Roadview>
            </section>
          )}
          <section className="mb-20 md:mb-0">
            {records && records.map((record) => (
              <SideBarRecordCard record={record} key={record.post_id} />
            ))}
          </section>
        </>
      )}
    </Sidebar>
  );
}

interface RecordType {
  post_id: string;
  author_nickname: string;
  address: string;
  address_detail: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: Date;
}
