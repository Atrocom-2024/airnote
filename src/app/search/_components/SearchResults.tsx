'use client'

import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getSearchResults } from "@/app/_lib/api";
import Sidebar from "@/app/_components/layouts/Sidebar";

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q');
  console.log(query);
  const { data: searchResults, error, isLoading } = useQuery<ReviewType[]>({
    queryKey: ['searchResults'],
    queryFn: () => getSearchResults(query!),
    // query가 있을 때만 쿼리를 활성화합니다.
    enabled: !!query
  });

  console.log(searchResults);

  return (
    <Sidebar>
      사이드바
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
