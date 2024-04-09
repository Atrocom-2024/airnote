'use client'

import { debounce } from "lodash";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
  const router = useRouter();
  const [ search, setSearch ] = useState('');

  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }

  const searchFetching = debounce(async (keyword: string) => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const res = await fetch(`${domain}/api/search?q=${keyword}`);
  }, 500);

  // TODO: 디바운스 적용
  useEffect(() => {
    if (search) {
      router.push(`/?q=${search}`);
      searchFetching(search);
    } else {
      router.push('/');
    }
  }, [router, search, searchFetching]);

  return (
    <article className="relative">
      <input
        className="w-[170px] h-[6vh] px-5 border-[1.5px] border-default rounded-full outline-none sm:w-[350px] sm:h-[4vh]"
        value={search}
        onChange={searchChangeHandler}
      />
      <IoSearch className="absolute top-1/2 right-3 -translate-y-1/2" size="30" color="#4A68F5" />
    </article>
  );
}