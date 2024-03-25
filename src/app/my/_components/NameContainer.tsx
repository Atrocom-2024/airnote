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