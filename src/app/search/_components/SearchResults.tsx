'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { FaAngleLeft } from "react-icons/fa6";

import { useMapLocation } from "@/app/_lib/store";
import { getSearchResults } from "@/app/_lib/api";
import Sidebar from "@/app/_components/layouts/Sidebar";
import SearchResultCard from "./SearchResultCard";
import PartLoadingUI from "@/app/_components/PartLoadingUI";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q');
  const { setMapLoc } = useMapLocation();
  const { data: searchResults, refetch, isFetching } = useQuery<SearchResultType[]>({
    queryKey: ['searchResults'],
    queryFn: () => getSearchResults(query!),
    // query가 있을 때만 쿼리를 활성화합니다.
    enabled: !!query
  });

  useEffect(() => {
    refetch();
  }, [query, refetch]);

  useEffect(() => {
    if (!isFetching && searchResults && searchResults.length > 0) {
      setMapLoc({lat: searchResults[0].latitude, lng: searchResults[0].longitude});
    }
  }, [isFetching, searchResults, setMapLoc]);

  return (
    <Sidebar>
      {isFetching || !searchResults ? <PartLoadingUI /> : (
        <>
          <section className="flex items-center p-3">
            <Link href="/">
              <FaAngleLeft size="25" fill="#4A68F5" />
            </Link>
            <div className="text-xl text-default font-bold ml-2">검색결과</div>
          </section>
          <section>
            {searchResults.length ? (searchResults.map((review) => (
              <SearchResultCard review={review} key={review.post_id} />
            ))) : (
              <div className="text-default font-bold text-center mx-auto mt-52">
                <div className="mb-3">검색 결과가 없습니다.</div>
                <div>공간 리뷰를 작성해보세요.</div>
              </div>
            )}
          </section>
        </>
      )}
    </Sidebar>
  );
}

interface SearchResultType {
  post_id: string;
  address: string;
  address_detail: string;
  latitude: number;
  longitude: number;
  content: string;
  likes: number;
  dislikes: number;
  create_at: Date;
}