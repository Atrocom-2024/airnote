'use client'

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { debounce } from "lodash";

import { getSearchSuggestions } from "@/app/_lib/api";
import { useMapLocation } from "@/app/_lib/store";

export default function SearchBar() {
  const router = useRouter();
  const [ searchSuggestions, setSearchSuggestions ] = useState<SearchResult[]>([]);
  const [ query, setQuery ] = useState<string>('');
  const [ debouncedQuery, setDebouncedQuery ] = useState<string>(query);
  const { setMapLoc } = useMapLocation();

  const qeuryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const debouncedQueryHandler = debounce((keyword: string) => {
    setDebouncedQuery(keyword)
  }, 500);

  const searchSuggestionHandler = useCallback(async (keyword: string) => {
    const searchItems = await getSearchSuggestions(keyword);
    setSearchSuggestions(searchItems);
  }, []);

  const searchResultClickHandler = (result: SearchResult) => {
    setQuery('');
    setDebouncedQuery('');
    setMapLoc({ lat: result.latitude, lng: result.longitude });
    router.push(`/home?sidebar=true&lat=${result.latitude}&lng=${result.longitude}&address=${encodeURIComponent(result.address)}`)
  }

  const searchKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setQuery('');
      setDebouncedQuery('');
      router.push(`/search?sidebar=true&q=${query}`);
    }
  }

  useEffect(() => {
    debouncedQueryHandler(query);
    return () => {
      debouncedQueryHandler.cancel();
    }
  }, [query, debouncedQueryHandler]);

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      searchSuggestionHandler(debouncedQuery);
    } else {
      setSearchSuggestions([]);
    }
  }, [debouncedQuery, searchSuggestionHandler]);

  return (
    <article className="relative border-[1.5px] border-default rounded-full">
      <input
        className="w-[170px] h-[6vh] px-5 rounded-full outline-none sm:w-[350px] sm:h-[4vh]"
        value={query}
        onChange={qeuryChangeHandler}
        onKeyDown={searchKeyPressHandler}
        placeholder="주소를 입력해주세요."
      />
      <IoSearch className="absolute top-1/2 right-3 -translate-y-1/2" size="30" color="#4A68F5" />
      {searchSuggestions.length > 0 && (
        <ul className="absolute top-full left-0 mt-2 w-full bg-white border-[1.5px] border-gray/50 rounded-md shadow-lg max-h-60 overflow-auto z-[30]">
          {searchSuggestions.map((result, idx) => (
            <li
              className="block px-4 py-2 cursor-pointer hover:bg-gray/25"
              onClick={() => searchResultClickHandler(result)}
              key={idx}
            >{ result.address }</li>
          ))}
        </ul>
      )}
    </article>
  );
}

interface SearchResult {
  _id: string;
  address: string;
  latitude: number;
  longitude: number;
}
