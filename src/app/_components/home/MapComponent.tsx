'use client'

import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import { useMap } from "react-kakao-maps-sdk";

export default function MapComponent() {
  const map = useMap();

  const fetchReviews = useCallback(debounce(async (bounds: kakao.maps.LatLngBounds) => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const params = {
      swLat: bounds.getSouthWest().getLat(),
      swLng: bounds.getSouthWest().getLng(),
      neLat: bounds.getNorthEast().getLat(),
      neLng: bounds.getNorthEast().getLng()
    };
    const res = fetch(`${domain}/api/reviews?sw_lat=${params.swLat}&sw_lng=${params.swLng}&ne_lat=${params.neLat}&ne_lng=${params.neLng}`);
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
  }, [map]);

  return (
    <div></div>
  );
}