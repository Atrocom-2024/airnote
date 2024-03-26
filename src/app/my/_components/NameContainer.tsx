'use client'

import { useRef, useState } from "react";

export default function NameContainer({ name }: { name: string; }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [changeName, setChangeName] = useState(name);
  const [isInputChange, setIsInputChange] = useState(true);

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

  const nameUpdateHandler = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/my/info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: changeName })
      });
      if (res.ok) {
        return alert('닉네임이 변경되었습니다.');
      } else {
        return alert('닉네임 변경에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      return alert('닉네임 변경에 실패했습니다.');
    }
  }

  return (
    <div>
      <input
        className="w-[120px] px-2 py-1 block rounded-md mb-2 bg-dark-white outline-gray disabled:bg-white disabled:p-0"
        value={changeName}
        disabled={true}
        onChange={nameInputChangeHandler}
        ref={inputRef}
      />
      {isInputChange ? (
        <button
          className="border-[1.5px] border-purple rounded-md px-3 py-1"
          onClick={onInputHandler}
        >닉네임 변경</button>
      ) : (
        <>
          <button
            className="border-[1.5px] border-purple rounded-md px-3 py-1 mr-1"
            onClick={nameUpdateHandler}
          >확인</button>
          <button
            className="border-[1.5px] border-purple rounded-md px-3 py-1"
            onClick={offInputHandler}
          >취소</button>
        </>
      )}
    </div>
  );
}