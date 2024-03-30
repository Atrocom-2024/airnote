'use client'

import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

import PartLoadingUI from "../PartLoadingUI";

export default function HomeMapSection({ mapLoc }: PropsType) {
  const [ loading ] = useKakaoLoader({
    appkey: process.env.KAKAO_JS_KEY,
  });

  if (loading) {
    return <PartLoadingUI />;
  }

  return (
    <Map
      center={mapLoc}
      level={9}
      style={{ width: "100%", height: "100%" }}
    ></Map>
  );
}

interface PropsType {
  mapLoc: {
    lat: number;
    lng: number;
  };
}
