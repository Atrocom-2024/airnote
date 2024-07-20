'use client';

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import { IoClose } from "react-icons/io5";

export default function CustomOverlay({ address, buildingName, setIsOverlay }: PropsType) {
  const { data: session } = useSession();

  const overlayCloseHandler = () => {
    setIsOverlay(false);
  }

  const addReviewClickHandler = () => {
    alert('로그인 후 이용하실 수 있습니다.');
  }

  return (
    <div className="relative text-white bg-default pl-5 pr-12 pt-3 pb-5 rounded-lg shadow-lg">
      <button
        className="absolute top-1 right-1"
        type="button"
        onClick={overlayCloseHandler}
      >
        <IoClose size="35" />
      </button>
      {buildingName ? <div className="font-bold mb-1">{buildingName}</div> : null}
      <div className="text-sm mb-4">{address}</div>
      {session ? (
        <Link
          className="bg-white text-black text-xs rounded-lg px-3 py-2"
          href={`/record/add?address=${encodeURIComponent(address)}`}
        >기록작성</Link>
      ) : (
        <button
          type="button"
          className="bg-white text-black text-xs rounded-lg px-3 py-2"
          onClick={addReviewClickHandler}
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