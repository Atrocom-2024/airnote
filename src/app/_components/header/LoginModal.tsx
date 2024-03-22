'use client'

import Image from "next/image";
import { IoClose } from "react-icons/io5";

export default function LoginModal({ closeModalHandler, loginHandler }: PropsType) {
  return (
    <section className="w-[100vw] h-[100vh] absolute top-0 left-0 bg-black/30 z-30">
      <article className="absolute w-[100vw] h-[100vh] z-40" onClick={closeModalHandler}></article>
      <article className="w-[300px] h-[250px] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-2xl p-5 z-50 md:w-[500px] md:h-[400px]">
        <section className="flex justify-between items-center">
          <div className="text-xl text-purple font-bold md:text-3xl">로그인ㅣ회원가입</div>
          <div className="cursor-pointer" onClick={closeModalHandler}>
            <IoClose size="40" color="#756AB6" />
          </div>
        </section>
        <section className="w-[100px] h-[50px] bg-purple mx-auto mt-7 md:w-[200px] md:h-[100px] md:mt-10">
          <div>로고</div>
        </section>
        <button
          className="w-[170px] mx-auto mt-7 block md:w-[200px] md:mt-10"
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
  );
}

interface PropsType {
  closeModalHandler: () => void;
  loginHandler: () => void;
}