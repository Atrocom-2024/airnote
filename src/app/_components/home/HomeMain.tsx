'use client'

import { useCallback, useEffect, useState } from "react";

import { getLocation } from "@/utills/modules";
import HomeMapSection from "./HomeMapSection";
import PanelSection from "./PanelSection";

export default function HomeMain({ topReviews }: PropsType) {
  const [ markerInfo, setMarkerInfo ] = useState<MarkerInfoType[]>([]);
  const [ mapLoc, setMapLoc ] = useState<MapLocationType>({
    lat: 37.575184758466044,
    lng: 126.97517453354219
  });

  const updateMapLocHandler = (loc: MapLocationType) => {
    setMapLoc(loc);
  };

  const getAsyncLocationHandler = useCallback(async () => {
    const userLoc: MapLocationType = await getLocation();
    updateMapLocHandler(userLoc);
  }, []);

  useEffect(() => {
    getAsyncLocationHandler();
  }, [getAsyncLocationHandler]);

  return (
    <>
      <HomeMapSection
        mapLoc={{ lat: mapLoc.lat, lng: mapLoc.lng }}
        markerInfo={markerInfo}
        setMarkerInfo={setMarkerInfo}
      />
      <PanelSection
        topReviews={topReviews}
        updateMapLocHandler={updateMapLocHandler}
      />
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