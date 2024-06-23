'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import MapSection from "../../_components/map/MapSection";
import PanelSection from "./PanelSection";
import ReviewSideBar from "./ReviewSideBar";
import TermsModal from "./TermsModal";

export default function HomeMain() {
  const [isMap, setIsMap] = useState(false);
  const [isTerms, setIsTerms] = useState(false);
  const searchParams = useSearchParams();
  const sidebar = Boolean(searchParams?.get('sidebar'));

  const termsConfirmHandler = () => {
    setIsTerms(false);
    sessionStorage.setItem('terms-agree', 'agree');
  };
  
  const isMapHandler = () => {
    setIsMap((prev) => !prev)
  }

  useEffect(() => {
    const sessionTermsAgree = sessionStorage.getItem('terms-agree');
    if (sessionTermsAgree !== 'agree') {
      return setIsTerms(true);
    }
  }, []);

  return (
    <>
      <button
        className="absolute top-5 right-5 bg-white border-[1.5px] border-default text-sm px-4 py-2 rounded-md z-[29] md:hidden"
        type="button"
        onClick={isMapHandler}
      >{isMap ? '목록으로 보기' : '지도로 보기'}</button>
      <MapSection />
      {sidebar ? (
        <ReviewSideBar />
      ) : (!isMap && (
        <PanelSection

        />
      ))}
      {isTerms && <TermsModal termsConfirmHandler={termsConfirmHandler} />}
    </>
  );
}


interface TopReviewType {
  _id: string;
  address: string;
  address_detail: string;
  latitude: string;
  longitude: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: string;
}
