'use client'

import { useCallback, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

import { searchResultFetching } from "@/app/_lib/api";
import { debounce } from "lodash";

export default function SearchBar() {
  const [ searchResults, setSearchResults ] = useState<SearchResult[]>([]);
  const [ search, setSearch ] = useState('');

  const searchChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e.target.value);
  }
  // const searchChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(e.target.value);
  //   console.log(e.target.value);
  //   const searchItems: SearchResult[] = await searchResultFetching(e.target.value);
  //   setSearchResults(searchItems);
  // }

  const searchResultHandler = useCallback(debounce(async () => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const res = await fetch(`${domain}/api/search?q=${encodeURIComponent(search)}`, { 'cache': 'no-store' });
    const json = await res.json();
    setSearchResults(json);
  }, 1000), [search]);

  useEffect(() => {
    if (search) {
      searchResultHandler();
    } else {
      setSearchResults([]);
    }
  }, [search, searchResultHandler]);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults])

  return (
    <article className={`relative border-[1.5px] border-default rounded-full `}>
      <input
        className="w-[170px] h-[6vh] px-5 rounded-full outline-none sm:w-[350px] sm:h-[4vh]"
        value={search}
        onChange={searchChangeHandler}
        placeholder="주소를 입력해주세요."
      />
      <IoSearch className="absolute top-1/2 right-3 -translate-y-1/2" size="30" color="#4A68F5" />

        <ul className="absolute bottom-0 left-0">
          {searchResults && searchResults.length ? searchResults.map((result) => (
            <li key={result._id}>{ result.address }</li>
          )) : ''}
        </ul>

    </article>
  );
}

interface SearchResult {
  _id: string;
  address: string;
  latitude: number;
  longitude: number;
}