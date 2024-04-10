import { debounce } from "lodash";

// 검색 결과 요청
export const searchResultFetching = debounce(async (keyword: string) => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const res = await fetch(`${domain}/api/search?q=${encodeURIComponent(keyword)}`, { 'cache': 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}, 1000);