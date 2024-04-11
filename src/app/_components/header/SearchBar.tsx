'use client'

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { debounce } from "lodash";

import { searchResultFetching } from "@/app/_lib/api";
import { useMapLocation } from "@/app/_lib/store";

export default function SearchBar() {
  const router = useRouter();
  const [ searchResults, setSearchResults ] = useState<SearchResult[]>([]);
  const [ query, setQuery ] = useState<string>('');
  const [ debouncedQuery, setDebouncedQuery ] = useState<string>(query);
  const { setMapLoc } = useMapLocation();

  const qeuryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  const debouncedQueryHandler = debounce((keyword: string) => {
    setDebouncedQuery(keyword)
  }, 500);

  const searchResultHandler = useCallback(async (keyword: string) => {
    const searchItems = await searchResultFetching(keyword);
    setSearchResults(searchItems);
  }, []);

  const searchResultClickHandler = (result: SearchResult) => {
    setQuery('');
    setDebouncedQuery('');
    setMapLoc({ lat: result.latitude, lng: result.longitude });
    router.push(`/?sidebar=true&lat=${result.latitude}&lng=${result.longitude}&address=${encodeURIComponent(result.address)}`)
  }

  useEffect(() => {
    debouncedQueryHandler(query);
    return () => {
      debouncedQueryHandler.cancel();
    }
  }, [query, debouncedQueryHandler]);

  useEffect(() => {
    if (debouncedQuery.length > 0) {
      searchResultHandler(debouncedQuery);
    } else {
      setSearchResults([]);
    }
  }, [debouncedQuery, searchResultHandler]);

  return (
    <article className={`relative border-[1.5px] border-default rounded-full `}>
      <input
        className="w-[170px] h-[6vh] px-5 rounded-full outline-none sm:w-[350px] sm:h-[4vh]"
        value={query}
        onChange={qeuryChangeHandler}
        placeholder="주소를 입력해주세요."
      />
      <IoSearch className="absolute top-1/2 right-3 -translate-y-1/2" size="30" color="#4A68F5" />
      {searchResults.length > 0 && (
        <ul className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto z-[30]">
          {searchResults.map((result) => (
            <li
              className="block px-4 py-2 hover:bg-gray-100 cursor-pointer hover:bg-gray"
              onClick={() => searchResultClickHandler(result)}
              key={result._id}
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
