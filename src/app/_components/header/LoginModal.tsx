'use client'

import Image from "next/image";
import { IoClose } from "react-icons/io5";

export default function LoginModal({ closeModalHandler, loginHandler }: PropsType) {
  return (
    <section className="w-[100vw] h-[100vh] absolute top-0 left-0 bg-black/30 z-30">
      <article className="absolute w-[100vw] h-[100vh] z-40" onClick={closeModalHandler}></article>
      <article className="w-[300px] h-[250px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-2xl p-5 z-50 md:w-[500px] md:h-[400px]">
        <section className="flex justify-between items-center">
          <div className="text-xl text-default font-bold md:text-3xl">로그인ㅣ회원가입</div>
          <div className="cursor-pointer" onClick={closeModalHandler}>
            <IoClose size="40" color="#4A68F5" />
          </div>
        </section>
        <Image
          className="w-[60px] mx-auto mt-5 md:w-[100px] md:mt-10"
          src="/logo.svg"
          width={100}
          height={0}
          alt="로고"
          priority={true}
        />
        <button
          className="w-[170px] mx-auto mt-7 block md:w-[200px] md:mt-14"
          type="button"
          onClick={loginHandler}
        >
          <Image
            className="w-full"
            src="/kakao_login_btn.png"
            width={500}
            height={0}
            alt="로그인 버튼"
            priority={true}
          />
        </button>
      </article>
    </section>
  );
}

interface PropsType {
  closeModalHandler: () => void;
  loginHandler: () => void;
}