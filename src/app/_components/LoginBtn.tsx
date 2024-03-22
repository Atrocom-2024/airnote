'use client'

import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

import { IoClose } from "react-icons/io5";

export default function LoginBtn() {
  const [isLoginModal, setIsLoginModal] = useState(false);

  const openModalHandler = () => {
    setIsLoginModal(true);
  }

  const closeModalHandler = () => {
    setIsLoginModal(false);
  }

  const loginHandler = () => {
    signIn("kakao");
  }

  return (
    <>
      <button
        className="border-[1.5px] border-purple px-5 py-2 rounded-md"
        type="button"
        onClick={openModalHandler}
      >로그인</button>
      {isLoginModal && (
        <section className="w-[100vw] h-[100vh] absolute top-0 left-0 bg-black/30 z-30">
          <article className="absolute w-[100vw] h-[100vh] z-40" onClick={closeModalHandler}></article>
          <article className="w-[500px] h-[400px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-2xl p-5 z-50">
            <section className="flex justify-between items-center">
              <div className="text-3xl text-purple font-bold">로그인 | 회원가입</div>
              <div className="cursor-pointer" onClick={closeModalHandler}>
                <IoClose size="40" color="#756AB6" />
              </div>
            </section>
            <section className="w-[200px] h-[100px] bg-purple mx-auto mt-10">
              <div>로고</div>
            </section>
            <button
              className="w-[200px] mx-auto mt-10 block"
              type="button"
              onClick={loginHandler}
            >
              <Image
                className="w-full"
                src="/kakao_login_btn.png"
                width={500}
                height={0}
                alt="로그인 버튼"
              />
            </button>
          </article>
        </section>
      )}
    </>
  );
}