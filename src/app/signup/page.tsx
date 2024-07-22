import Image from "next/image";
import Link from "next/link";

import Layout from "../_components/layouts/Layout";

export default function Singup() {
  return (
    <Layout className="flex justify-center items-center">
      <main
        className="w-[300px] h-[250px] bg-white flex flex-col justify-between border border-default rounded-md p-5 z-50 md:w-[500px] md:h-[400px]"
      >
        <section>
          <div className="text-xl text-default font-bold md:text-3xl">약관동의</div>
        </section>
        <section>
          <Image
            className="w-[60px] mx-auto md:w-[100px]"
            src="/logo.svg"
            width={100}
            height={0}
            alt="로고"
            priority={true}
          />
        </section>
        <section>
          <article className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="flex items-center text-xs md:text-base">
                <div className="font-bold text-default mr-2">필수</div>
                <div className="font-bold">서비스 이용약관 동의</div>
              </div>
              <Link
                className="text-xs text-middle-gray ml-3 md:text-base"
                href="/terms"
              >자세히 보기</Link>
            </div>
            <div>
              <input className="w-4 h-4" type="checkbox" />
            </div>
          </article>
          <article className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex items-center text-xs md:text-base">
                <div className="font-bold text-default mr-2">필수</div>
                <div className="font-bold">개인정보 수집 및 이용 동의</div>
              </div>
              <Link
                className="text-xs text-middle-gray ml-3 md:text-base"
                href="/terms"
              >자세히 보기</Link>
            </div>
            <div>
              <input className="w-4 h-4" type="checkbox" />
            </div>
          </article>
          
        </section>
        <button
          className="bg-default w-full py-2 text-white text-sm font-bold rounded-md md:text-lg"
        >회원가입</button>
      </main>
    </Layout>
  );
}