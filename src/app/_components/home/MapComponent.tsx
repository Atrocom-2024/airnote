'use client'

import { debounce } from "lodash";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { useMap } from "react-kakao-maps-sdk";

export default function MapComponent({ setMarkerInfo }: PropsType) {
  const map = useMap();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchReviews = useCallback(debounce(async (bounds: kakao.maps.LatLngBounds) => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const params = {
      swLat: bounds.getSouthWest().getLat(),
      swLng: bounds.getSouthWest().getLng(),
      neLat: bounds.getNorthEast().getLat(),
      neLng: bounds.getNorthEast().getLng()
    };
    const res = await fetch(`${domain}/api/markers?sw_lat=${params.swLat}&sw_lng=${params.swLng}&ne_lat=${params.neLat}&ne_lng=${params.neLng}`);
    const json = await res.json();
    if (res.ok) {
      setMarkerInfo(json);
    } else {
      return alert('알 수 없는 오류로 데이터 받아오기에 실패했습니다. 네트워크 상태를 확인해주세요.');
    }
  }, 500), []);

  useEffect(() => {
    if (!map) return;

    const handleBoundsChanged = () => {
      const bounds = map.getBounds();
      fetchReviews(bounds);
    };

    kakao.maps.event.addListener(map, 'bounds_changed', handleBoundsChanged);

    return () => {
      kakao.maps.event.removeListener(map, 'bounds_changed', handleBoundsChanged);
    };
  }, [fetchReviews, map]);

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