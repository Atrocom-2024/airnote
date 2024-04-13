'use client'

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { getLocation } from "@/utils/modules";
import { useMapLocation } from "@/app/_lib/store";
import MapSection from "../../_components/map/MapSection";
import PanelSection from "./PanelSection";
import ReviewSideBar from "./ReviewSideBar";

export default function HomeMain({ topReviews }: PropsType) {
  const searchParams = useSearchParams();
  const sidebar = Boolean(searchParams?.get('sidebar'));
  const [ markerInfo, setMarkerInfo ] = useState<MarkerInfoType[]>([]);
  const { setMapLoc } = useMapLocation();

  const getAsyncLocationHandler = useCallback(async () => {
    const userLoc: MapLocationType = await getLocation();
    setMapLoc(userLoc);
  }, [setMapLoc]);

  useEffect(() => {
    getAsyncLocationHandler();
  }, [getAsyncLocationHandler]);

  return (
    <>
      <MapSection
        markerInfo={markerInfo}
        setMarkerInfo={setMarkerInfo}
      />
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

interface MarkerInfoType {
  _id: string;
  address: string;
  latitude: number;
  longitude: number;
}

interface MapLocationType {
  lat: number;
  lng: number;
}