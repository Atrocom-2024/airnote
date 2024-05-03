// 위치에 따른 리뷰 데이터를 가져오는 함수
export const getReviews = async (lat: string, lng: string) => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const res = await fetch(`${domain}/api/reviews?lat=${lat}&lng=${lng}`);
  if (!res.ok) {
    throw new Error('Network response was not ok');
  }
  return res.json();
};

// 추천 검색어 요청
export const getSearchSuggestions = async (keyword: string) => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const res = await fetch(`${domain}/api/search/suggestions?q=${encodeURIComponent(keyword)}`, { 'cache': 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
};

// 검색 결과 요청
export const getSearchResults = async (keyword: string) => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const res = await fetch(`${domain}/api/search?q=${encodeURIComponent(keyword)}`, { 'cache': 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
};

// 관리자 로그아웃 요청
export const postLogout = async () => {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const res = await fetch(`${domain}/api/admin/logout`, { method: 'POST' });
  if (!res.ok) {
    throw new Error('Failed to logout');
  }
  return res.status;
}
