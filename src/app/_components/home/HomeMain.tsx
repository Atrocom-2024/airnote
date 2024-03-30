'use client'

import { useCallback, useEffect, useState } from "react";

import { getLocation } from "@/utills/modules";
import HomeMapSection from "./HomeMapSection";
import PanelSection from "./PanelSection";
import LoadingUI from "../LoadingUI";

export default function HomeMain({ topReviews }: PropsType) {
  const [ mapLoc, setMapLoc ] = useState<MapLocationType>({ lat: null, lng: null });

  const updateMapLocHandler = (loc: MapLocationType) => {
    setMapLoc(loc);
  }

  const getAsyncLocationHandler = useCallback(async () => {
    const userLoc: MapLocationType = await getLocation();
    updateMapLocHandler(userLoc);
  }, []);

  useEffect(() => {
    getAsyncLocationHandler();
  }, [getAsyncLocationHandler]);

  return (
    <>
      {mapLoc.lat && mapLoc.lng ? <HomeMapSection mapLoc={{ lat: mapLoc.lat, lng: mapLoc.lng }} /> : <LoadingUI />}
      <PanelSection topReviews={topReviews} />
    </>
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

interface MapLocationType {
  lat: number | null;
  lng: number | null;
}