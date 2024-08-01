'use client'

import { useRef, useState } from "react";
import { throttle } from "lodash";

import LoadingUI from "@/app/_components/LoadingUI";

export default function NicknameChange({ nickname }: { nickname: string; }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [changeName, setChangeName] = useState(nickname);
  const [isInputChange, setIsInputChange] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const nameInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangeName(e.target.value);
  }
  
  const onInputHandler = () => {
    setIsInputChange(false);
    if (inputRef.current) {
      inputRef.current.disabled = false;
      inputRef.current.focus();
    }
  }
  
  const offInputHandler = () => {
    setIsInputChange(true);
    if (inputRef.current) {
      inputRef.current.disabled = true;
    }
  }

  const nameUpdateHandler = throttle(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/profile/info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nickname: changeName })
      });
      if (res.ok) {
        alert('닉네임이 변경되었습니다.');
        window.location.reload();
      } else if (res.status === 409) {
        setIsLoading(false);
        return alert('닉네임이 중복되었거나 이전과 같은 닉네임입니다.');
      } else {
        setIsLoading(false);
        return alert('닉네임 변경에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      return alert('닉네임 변경에 실패했습니다.');
    }
  }, 2000)

  if (isLoading) {
    return <LoadingUI />;
  }

  return (
    <section>
      <div className="flex items-center mb-2">
        <div className="font-semibold text-middle-gray mr-2">닉네임</div>
        {isInputChange ? (
          <button
          className="font-semibold text-middle-gray text-xs border-b border-gray"
          onClick={onInputHandler}
          >닉네임 변경</button>
        ) : (
          <div className="flex items-center">
            <button
              className="font-semibold text-middle-gray text-xs border-b border-gray mr-1"
              onClick={nameUpdateHandler}
            >확인</button>
            <button
              className="font-semibold text-middle-gray text-xs border-b border-gray"
              onClick={offInputHandler}
            >취소</button>
          </div>
        )}
      </div>
      <input
        className="w-[300px] outline-none bg-white text-black border border-middle-gray rounded-md px-3 py-2 disabled:bg-white-gray disabled:text-middle-gray disabled:border-none"
        value={changeName}
        disabled={isInputChange}
        onChange={nameInputChangeHandler}
        ref={inputRef}
      />
    </section>
  );
}