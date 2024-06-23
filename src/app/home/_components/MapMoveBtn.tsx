'use client'

import { useMapLocation } from "@/app/_lib/store";

export default function MapMoveBtn({ locName }: PropsType) {
  const { setMapLoc } = useMapLocation();
  const locInfo = {
    '서울': { lat: 37.563653668026305, lng: 126.98495761096676 },
    '경기': { lat: 37.4217854566562, lng: 127.05873408351113 },
    '충남': { lat: 36.71126829134976, lng: 126.88627501338131 },
    '충북': { lat: 36.897756366558255, lng: 127.80509100626485 },
    '전북': { lat: 35.96382570560019, lng: 127.06898741834691 },
    '전남': { lat: 35.003939150782735, lng: 126.89429670233493 },
    '강원': { lat: 37.34755180757277, lng: 128.09300313211617 },
    '경북': { lat: 36.52867326640402, lng: 128.6873141369812 },
    '경남': { lat: 35.30743115672184, lng: 128.90360697316004 },
    '제주': { lat: 33.40154434018067, lng: 126.55504780760168 }
  }

  const locBtnClickHandler = () => {
    setMapLoc(locInfo[locName]);
  }

  return (
    <button
      className="bg-default text-white text-sm px-3 py-1 rounded-full"
      onClick={locBtnClickHandler}
    >{ locName }</button>
  );
}

interface PropsType extends React.ComponentProps<'button'> {
  locName: '서울' | '경기' | '충남' | '충북' | '전북' | '전남' | '강원' | '경북' | '경남' | '제주';
}
