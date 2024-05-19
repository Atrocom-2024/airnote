'use client'

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import MapSection from "../../_components/map/MapSection";
import PanelSection from "./PanelSection";
import ReviewSideBar from "./ReviewSideBar";
import TermsModal from "./TermsModal";

export default function HomeMain({ topReviews }: PropsType) {
  const [isTerms, setIsTerms] = useState(false);
  const searchParams = useSearchParams();
  const sidebar = Boolean(searchParams?.get('sidebar'));

  const termsConfirmHandler = () => {
    setIsTerms(false);
    sessionStorage.setItem('terms-agree', 'agree');
  }

  useEffect(() => {
    const sessionTermsAgree = sessionStorage.getItem('terms-agree');
    if (sessionTermsAgree !== 'agree') {
      return setIsTerms(true);
    }
  }, [])

  return (
    <>
      <MapSection />
      {sidebar ? (
        <ReviewSideBar />
      ) : (
        <PanelSection
          topReviews={topReviews}
        />
      )}
      {isTerms && <TermsModal termsConfirmHandler={termsConfirmHandler} />}
    </>
  );
}

interface PropsType {
  topReviews: TopReviewType[];
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
