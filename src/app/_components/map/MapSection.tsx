'use client'

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { CustomOverlayMap, Map, MapMarker, MarkerClusterer, useKakaoLoader } from "react-kakao-maps-sdk";
import { debounce } from "lodash";

import { getLocation } from "@/utils/modules";
import { getAddress, getBuildingInfo, getMarkerInfo } from "@/app/_lib/api";
import { useMapHandle, useMapLocation, useSidebar } from "@/app/_lib/store";
import PartLoadingUI from "../PartLoadingUI";
import CustomOverlay from "./CustomOverlay";
import MapComponent from "./MapComponent";

export default function MapSection() {
  const searchParams = useSearchParams();
  const paramLat = searchParams?.get('lat');
  const paramLng = searchParams?.get('lng');
  const router = useRouter();
  const mapRef = useRef<any>(null);
  const [ overlayInfo, setOverlayInfo ] = useState<OverlayInfoType>({
    lat: 0,
    lng: 0,
    address: '',
    buildingName: null
  });
  const [ isOverlay, setIsOverlay ] = useState(false);
  const [ markerInfo, setMarkerInfo ] = useState<MarkerInfoType[]>([]);
  const { mapLoc, setMapLoc } = useMapLocation();
  const { closeMap } = useMapHandle();
  const { openSidebar } = useSidebar();
  const [ loading ] = useKakaoLoader({
    appkey: process.env.KAKAO_JS_KEY,
  });

  const mapIdleHandler = debounce(async (target: kakao.maps.Map) => {
    const bounds = target.getBounds();
    const center = target.getCenter();
    const params = {
      swLat: bounds.getSouthWest().getLat(),
      swLng: bounds.getSouthWest().getLng(),
      neLat: bounds.getNorthEast().getLat(),
      neLng: bounds.getNorthEast().getLng()
    };

    setMapLoc({ lat: center.getLat(), lng: center.getLng() });

    try {
      const res = await getMarkerInfo(params);
      setMarkerInfo(res);
    } catch (err) {
      console.error(err);
      return alert('알 수 없는 오류로 데이터 받아오기에 실패했습니다. 네트워크 상태를 확인해주세요.')
    }
  }, 500);

  const getUserLocation = useCallback(async () => {
    const userLoc: MapLocationType = await getLocation();
    setMapLoc(userLoc);
  }, [setMapLoc]);
  
  const markerClickHandler = (lat: number, lng: number, address: string) => {
    closeMap();
    openSidebar();
    router.push(`/record?sidebar=true&lat=${lat}&lng=${lng}&address=${encodeURIComponent(address)}`);
  };

  const buildingClickHandler = async (_: any, mouseEvent: any) => {
    const latlng = mouseEvent.latLng;
    const lat = latlng.getLat();
    const lng = latlng.getLng();
    const addressInfo = await getAddress(lat, lng);

    if (!addressInfo.documents[0]) {
      return;
    }

    const buildingInfo = await getBuildingInfo(addressInfo.documents[0].address.address_name);
    const buildingRoadAddress = buildingInfo.documents[0].road_address;
    const buildingName = buildingRoadAddress ? buildingRoadAddress.building_name : null;
    const result = {
      lat: buildingInfo.documents[0].address.y,
      lng: buildingInfo.documents[0].address.x,
      address: buildingRoadAddress.address_name ? buildingRoadAddress.address_name : buildingInfo.documents[0].address.address_name,
      buildingName: buildingName
    };
    setOverlayInfo(result);
    setIsOverlay(true);
  };

  // 모바일 터치 이벤트를 위한 useEffect
  useEffect(() => {
    const mapContainer = mapRef.current;
    if (mapContainer) {
      kakao.maps.event.addListener(mapContainer, 'touchend', buildingClickHandler);
      return () => {
        kakao.maps.event.removeListener(mapContainer, 'touchend', buildingClickHandler)
      }
    }
  }, []);

  // 쿼리 파라미터에 위도/경도가 있을 때를 위한 useEffect
  useEffect(() => {
    paramLat && paramLng && setMapLoc({ lat: Number(paramLat), lng: Number(paramLng) });
  }, [getUserLocation, paramLat, paramLng, setMapLoc]);

  return (
    <Map
      center={mapLoc}
      level={6}
      minLevel={11}
      style={{ width: "100%", height: "92vh" }}
      isPanto={true}
      onClick={buildingClickHandler}
      onIdle={mapIdleHandler}
      ref={mapRef}
    >
      {loading && <PartLoadingUI />}
      <MarkerClusterer
        averageCenter={true}
        minClusterSize={1}
        minLevel={5}
        styles={[
          {
            width: '60px',
            height: '60px',
            backgroundColor: '#4a69f5bd',
            backdropFilter: 'blur(1px)',
            borderRadius: '100%',
            fontSize: 'large',
            textAlign: 'center',
            lineHeight: '60px',
            color: 'white',
          }
        ]}>
        {markerInfo.map((marker) => (
          <MapMarker
            position={{ lat: marker.latitude, lng: marker.longitude }}
            clickable={true}
            onClick={() => markerClickHandler(marker.latitude, marker.longitude, marker.address)}
            key={marker.post_id}
          />
        ))}
      </MarkerClusterer>
      {isOverlay ? (
        <CustomOverlayMap
          position={{ lat: overlayInfo.lat, lng: overlayInfo.lng }}
          clickable={true}
          yAnchor={1.2}
        >
          <CustomOverlay
            address={overlayInfo.address}
            buildingName={overlayInfo.buildingName}
            setIsOverlay={setIsOverlay}
          />
        </CustomOverlayMap>
      ) : null}
      <MapComponent mapIdleHandler={mapIdleHandler} />
    </Map>
  );
}

interface MarkerInfoType {
  post_id: string;
  address: string;
  latitude: number;
  longitude: number;
};

interface MapLocationType {
  lat: number;
  lng: number;
};

interface OverlayInfoType {
  lat: number;
  lng: number;
  address: string;
  buildingName: string | null;
};