'use client'

import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

import { getLocation } from "@/utils/modules";
import { useMapLocation } from "@/app/_lib/store";
import PartLoadingUI from "../PartLoadingUI";
import MapComponent from "./MapComponent";

export default function MapSection() {
  const router = useRouter();
  const pathname = usePathname();
  const [ markerInfo, setMarkerInfo ] = useState<MarkerInfoType[]>([]);
  const { mapLoc, setMapLoc } = useMapLocation();
  const [ loading ] = useKakaoLoader({
    appkey: process.env.KAKAO_JS_KEY,
  });

  const getAsyncLocationHandler = useCallback(async () => {
    const userLoc: MapLocationType = await getLocation();
    setMapLoc(userLoc);
  }, [setMapLoc]);
  
  const markerClickHandler = (lat: number, lng: number, address: string) => {
    router.push(`/home?sidebar=true&lat=${lat}&lng=${lng}&address=${encodeURIComponent(address)}`);
  }

  useEffect(() => {
    getAsyncLocationHandler();
  }, [getAsyncLocationHandler]);


  if (loading) {
    return <PartLoadingUI />;
  };

  return (
    <Map
      center={mapLoc}
      level={9}
      style={{ width: "100%", height: "100%" }}
    >
      <MapComponent setMarkerInfo={setMarkerInfo} />
      {markerInfo.map((marker) => (
        <MapMarker
          position={{ lat: marker.latitude, lng: marker.longitude }}
          clickable={true}
          onClick={() => markerClickHandler(marker.latitude, marker.longitude, marker.address)}
          key={marker._id}
        />
      ))}
    </Map>
  );
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