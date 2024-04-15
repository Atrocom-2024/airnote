'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

import { getLocation } from "@/utils/modules";
import { useMapLocation } from "@/app/_lib/store";
import PartLoadingUI from "../PartLoadingUI";
import MapComponent from "./MapComponent";

export default function MapSection() {
  const searchParams = useSearchParams();
  const paramLat = searchParams?.get('lat');
  const paramLng = searchParams?.get('lng');
  const router = useRouter();
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
    setMapLoc({ lat, lng });
    router.push(`/home?sidebar=true&lat=${lat}&lng=${lng}&address=${encodeURIComponent(address)}`);
  }

  useEffect(() => {
    paramLat && paramLng ? setMapLoc({ lat: Number(paramLat), lng: Number(paramLng) }) : getAsyncLocationHandler();
  }, [getAsyncLocationHandler, paramLat, paramLng, setMapLoc]);


  if (loading) {
    return <PartLoadingUI />;
  };

  return (
    <Map
      center={mapLoc}
      level={9}
      style={{ width: "100%", height: "100%" }}
      isPanto={true}
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