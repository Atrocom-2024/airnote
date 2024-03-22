'use client'

import { Map, useKakaoLoader } from "react-kakao-maps-sdk";

import PartLoadingUI from "./PartLoadingUI";

export default function HomeMapSection() {
  const [ loading ] = useKakaoLoader({
    appkey: process.env.KAKAO_JS_KEY,
  });

  if (loading) {
    return <PartLoadingUI />;
  }

  return (
    <Map
      center={{ lat: 33.5563, lng: 126.79581 }}
      style={{ width: "100%", height: "100%" }}
    ></Map>
  );
}