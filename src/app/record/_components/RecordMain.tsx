'use client'

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import MapSection from "../../_components/map/MapSection";
import PanelSection from "./PanelSection";
import RecordSideBar from "./RecordSideBar";

export default function RecordMain() {
  const [isMap, setIsMap] = useState(false);
  const searchParams = useSearchParams();
  const sidebar = Boolean(searchParams?.get('sidebar'));
  
  const isMapHandler = () => {
    setIsMap((prev) => !prev)
  }

  return (
    <>
      <button
        className="absolute top-5 right-5 bg-white border-[1.5px] border-default text-sm px-4 py-2 rounded-md z-[29] md:hidden"
        type="button"
        onClick={isMapHandler}
      >{isMap ? '목록으로 보기' : '지도로 보기'}</button>
      <MapSection />
      {sidebar ? (
        <RecordSideBar />
      ) : (!isMap && (
        <PanelSection />
      ))}
    </>
  );
}
