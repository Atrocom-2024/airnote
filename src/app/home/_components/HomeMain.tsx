'use client'

import { useSearchParams } from "next/navigation";

import MapSection from "../../_components/map/MapSection";
import PanelSection from "./PanelSection";
import ReviewSideBar from "./ReviewSideBar";

export default function HomeMain({ topReviews }: PropsType) {
  const searchParams = useSearchParams();
  const sidebar = Boolean(searchParams?.get('sidebar'));

  return (
    <>
      <MapSection />
      {sidebar ? (
        <ReviewSideBar />
      ) : (
        <PanelSection
          topReviews={topReviews}
        />
      )}
    </>
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
