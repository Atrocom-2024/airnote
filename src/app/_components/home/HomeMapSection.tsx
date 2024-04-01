'use client'

import { usePathname, useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Map, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";

import PartLoadingUI from "../PartLoadingUI";
import MapComponent from "./MapComponent";

export default function HomeMapSection({ mapLoc, markerInfo, setMarkerInfo }: PropsType) {
  const router = useRouter();
  const pathname = usePathname();
  const [ loading ] = useKakaoLoader({
    appkey: process.env.KAKAO_JS_KEY,
  });

  const moveRouterHandler = (lat: number, lng: number, address: string) => {
    router.push(`${pathname}?sidebar=true&lat=${lat}&lng=${lng}&address=${encodeURIComponent(address)}`);
  }

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
          onClick={() => moveRouterHandler(marker.latitude, marker.longitude, marker.address)}
          key={marker._id}
        />
      ))}
    </Map>
  );
}

interface PropsType {
  mapLoc: {
    lat: number;
    lng: number;
  };
  markerInfo: MarkerInfoType[];
  setMarkerInfo: Dispatch<SetStateAction<MarkerInfoType[]>>;
}

interface MarkerInfoType {
  _id: string;
  address: string;
  latitude: number;
  longitude: number;
}