'use client'

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { FaAngleLeft } from "react-icons/fa6";

import { getSearchResults } from "@/app/_lib/api";
import Sidebar from "@/app/_components/layouts/Sidebar";
import PartLoadingUI from "@/app/_components/PartLoadingUI";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q');
  const { data: searchResults, error, isLoading } = useQuery<ReviewType[]>({
    queryKey: ['searchResults'],
    queryFn: () => getSearchResults(query!),
    // query가 있을 때만 쿼리를 활성화합니다.
    enabled: !!query
  });
  // TODO: 패널 제목 클릭시 해당 주소 사이드바 열기
  return (
    <Sidebar>
      {isLoading ? <PartLoadingUI /> : (
        <>
          <section className="flex items-center p-3">
            <Link href="/">
              <FaAngleLeft size="25" fill="#4A68F5" />
            </Link>
            <div className="text-xl text-default font-bold ml-2">검색결과</div>
          </section>
        </>
      )}
    </Sidebar>
  );
}

interface ReviewType {
  _id: string;
  author_name: string;
  address: string;
  address_detail: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: string;
}
