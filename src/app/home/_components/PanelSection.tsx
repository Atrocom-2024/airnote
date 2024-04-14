import { FaArrowTrendUp } from "react-icons/fa6";
import { LuArrowUpRightSquare } from "react-icons/lu";

import PanelReviewCard from "./PanelReviewCard";
import MapMoveBtn from "./MapMoveBtn";

export default function PanelSection({ topReviews }: PropsType) {
  const locNameList: LocationListTypes = ['서울', '경기', '충남', '충북', '전북', '전남', '강원', '경북', '경남', '제주'];

  return (
    <section
      id="panel"
      className="absolute top-[10vh] left-5 w-[400px] h-[75vh] bg-white border-[1.5px] border-default shadow-lg overflow-y-auto z-[29] hidden sm:block"
    >
      <article className="mb-3">
        <section className="flex items-center p-3">
          <div>
            <FaArrowTrendUp size="25" color="#4A68F5" />
          </div>
          <div className="text-xl text-default font-bold ml-3">실시간 인기 리뷰</div>
        </section>
        <section>
          {topReviews.map((topReview) => (
            <PanelReviewCard topReview={topReview} key={topReview._id} />
          ))}
        </section>
      </article>
      <article>
        <section className="flex items-center p-3">
          <div>
            <LuArrowUpRightSquare size="25" color="#4A68F5" />
          </div>
          <div className="text-xl text-default font-bold ml-3">지도 위치 이동</div>
        </section>
        <section className="grid grid-cols-5 gap-4 px-5 py-3">
          {locNameList.map((locName) => (
            <MapMoveBtn locName={locName} key={locName} />
          ))}
        </section>
      </article>
    </section>
  );
}

interface PropsType {
  topReviews: TopReviewType[];
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

interface MapLocationType {
  lat: number;
  lng: number;
}

type LocationListTypes = ['서울', '경기', '충남', '충북', '전북', '전남', '강원', '경북', '경남', '제주'];