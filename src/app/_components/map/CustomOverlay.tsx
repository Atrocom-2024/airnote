'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Dispatch, MouseEventHandler, ReactHTMLElement, SetStateAction } from "react";

export default function CustomOverlay({ address, buildingName, setIsOverlay }: PropsType) {
  const { data: session } = useSession();

  return (
    <div className="relative text-white bg-default px-4 pt-3 pb-5 rounded-lg shadow-lg">
      {buildingName ? <div className="font-bold mb-1">{buildingName}</div> : null}
      <div className="text-sm mb-4">{address}</div>
      {session ? (
        <Link
          className="bg-white text-black text-xs rounded-lg px-3 py-2"
          href={`/reviews/add?address=${encodeURIComponent(address)}`}
        >기록작성</Link>
      ) : (
        <button
          type="button"
          className="bg-white text-black text-xs rounded-lg px-3 py-2"
          onClick={(e) => {
            alert('로그인 후 이용하실 수 있습니다.');
            setIsOverlay(false);
          }}
        >기록작성</button>
      )}
      <div className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-default"></div>
    </div>
  );
}

interface PropsType {
  address: string;
  buildingName: string | null;
  setIsOverlay: Dispatch<SetStateAction<boolean>>;
}