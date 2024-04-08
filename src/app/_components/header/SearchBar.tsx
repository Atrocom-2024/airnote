'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
  const router = useRouter();
  const [ search, setSearch ] = useState('');

  const searchChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    router.push(`/?q=${e.target.value}`);
  }

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