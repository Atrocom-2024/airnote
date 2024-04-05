'use client'

import { debounce } from "lodash";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { useMap } from "react-kakao-maps-sdk";

export default function MapComponent({ setMarkerInfo }: PropsType) {
  const map = useMap();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchMarkers = debounce(async () => {
    const bounds = map.getBounds();
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const params = {
      swLat: bounds.getSouthWest().getLat(),
      swLng: bounds.getSouthWest().getLng(),
      neLat: bounds.getNorthEast().getLat(),
      neLng: bounds.getNorthEast().getLng()
    };
    try {
      const res = await fetch(`${domain}/api/reviews/markers?sw_lat=${params.swLat}&sw_lng=${params.swLng}&ne_lat=${params.neLat}&ne_lng=${params.neLng}`);
      const json = await res.json();
      if (res.ok) {
        setMarkerInfo(json);
      } else {
        return alert('알 수 없는 오류로 데이터 받아오기에 실패했습니다. 네트워크 상태를 확인해주세요.');
      }
    } catch (err) {
      console.error(err);
      return alert('알 수 없는 오류로 데이터 받아오기에 실패했습니다. 네트워크 상태를 확인해주세요.')
    }
  }, 500);

   // 처음 렌더 시에 실행되는 useEffect
  useEffect(() => {
    fetchMarkers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 지도 위치를 이동시켰을 때 실행되는 useEffect
  useEffect(() => {
    const handleBoundsChanged = () => {
      fetchMarkers();
    };

    kakao.maps.event.addListener(map, 'idle', handleBoundsChanged);

    return () => {
      kakao.maps.event.removeListener(map, 'idle', handleBoundsChanged);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  return (
    <div></div>
  );
}

interface PropsType {
  setMarkerInfo: Dispatch<SetStateAction<MarkerInfoType[]>>;
}

interface MarkerInfoType {
  _id: string;
  address: string;
  latitude: number;
  longitude: number;
}