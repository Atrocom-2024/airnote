'use client'

import { useSearchParams } from "next/navigation";

import MapSection from "@/app/_components/map/MapSection";
import SearchResults from "./SearchResults";

export default function SearchMain() {
  const searchParams = useSearchParams();
  const sidebar = Boolean(searchParams?.get('sidebar'));

  return (
    <>
      <MapSection />
      {sidebar && <SearchResults />}
    </>
  );
}