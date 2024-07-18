'use client';

import Link from "next/link";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaArrowRightLong } from "react-icons/fa6";

import { parseDate } from "@/utils/modules";
import { useKnowledge } from "@/app/_lib/hooks";
import LoadingUI from "@/app/_components/LoadingUI";

export default function KnowledgeDetailMain({ knowledgeId }: PropsType) {
  const {data: knowledge, isPending} = useKnowledge(knowledgeId);

  if (!knowledge || isPending) {
    return <LoadingUI />;
  }
  
  return (
    <main className="w-full mx-auto mt-10 md:w-[1000px]">
      {/* <section className="flex justify-center items-center mb-10">
        <Image
          className="w-[400px] h-[400px] object-cover rounded-lg"
          src={knowledge.thumbnail_url}
          width={400}
          height={0}
          alt="썸네일"
        />
      </section> */}
      <section className="flex justify-between items-center text-middle-gray text-sm border-b-[1.5px] border-middle-gray pb-2">
        <article className="flex justify-center items-center">
          <div>
            <CgProfile className="size-[30px] md:size-[35px]" size="40" color="#C1C1C1" />
          </div>
          <div className="ml-1 text-base">{knowledge.author_nickname}</div>
        </article>
        <article className="flex justify-center items-center">
          <section className="flex justify-center items-center mr-5">
            <div className="flex items-center mr-2">
              <div>
                <AiOutlineLike className="size-[20px] sm:size-[25px]" color="#AFAFAF" size="20" />
              </div>
              <div className="font-bold">{knowledge.likes}</div>
            </div>
            <div className="flex items-center">
              <div> 
                <AiOutlineDislike className="size-[20px] sm:size-[25px]" color="#AFAFAF" size="20" />
              </div>
              <div className="font-bold">{knowledge.dislikes}</div>
            </div>
          </section>
          <section>{parseDate(knowledge.create_at)}</section>
        </article>
      </section>
      <section className="flex justify-center items-center mt-10">
        <Image
          className="w-[400px] h-[400px] object-cover rounded-lg"
          src={knowledge.thumbnail_url}
          width={400}
          height={0}
          alt="썸네일"
        />
      </section>
      <section className="mt-10">
        <article className="text-3xl font-bold mb-5">{knowledge.knowledge_title}</article>
        <article dangerouslySetInnerHTML={{ __html: knowledge.knowledge_content }} />
      </section>
      <section className="mt-10 pb-20 text-sm">
        <article className="flex justify-center items-center">
          <button className="border-[1.5px] border-gray rounded-lg px-4 py-2 flex justify-center items-center">
            <div>
              <AiOutlineLike className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </div>
            <div>추천</div>
          </button>
          <button className="bg-default rounded-lg text-white px-4 py-2 mx-3 flex justify-center items-center">
            <div className="mr-1">
              <IoShareSocialSharp className="size-[15px] sm:size-[20px]" size={30} color="white" />
            </div>
            <div>공유</div>
          </button>
          <button className="border-[1.5px] border-gray rounded-lg px-5 py-2">비추천</button>
        </article>
        <article>
          <Link className="flex justify-end items-center" href="/home">
            <div className="text-default mr-1">공간기록 보러가기</div>
            <div>
              <FaArrowRightLong className="size-[15px]" size={30} color="#4A68F5" />
            </div>
          </Link>
        </article>
      </section>
    </main>
  );
}

interface PropsType {
  knowledgeId: string;
}