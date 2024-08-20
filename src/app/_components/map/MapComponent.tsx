'use client';

import { useEffect } from "react";
import { useMap } from "react-kakao-maps-sdk";

import { useMapLocation } from "@/app/_lib/store";

export default function MapComponent({ mapIdleHandler }: PropsType) {
  const map = useMap();
  const { mapLoc } = useMapLocation();

  useEffect(() => {
    mapIdleHandler(map);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapLoc.lat]);

  return null;
}

interface PropsType {
  mapIdleHandler: (target: kakao.maps.Map) => void;
}