'use client'

import { useForm } from "react-hook-form";

import SubTitle from "@/app/_components/SubTitle";
import ReviewFormInput from "./ReviewFormInput";

export default function ReviewForm() {
  const { register, handleSubmit, watch, formState: { isSubmitting, errors } } = useForm();

  return (
    <form className="mt-10 px-5 grid grid-cols-1 text-sm md:px-16">
      <article className="mb-8">
        <SubTitle>주소</SubTitle>
        <section className="mt-5">
          <div className="grid grid-cols-4 gap-2 mb-3 md:grid-cols-5">
            <ReviewFormInput
              className="col-span-3 md:col-span-4"
              placeholder="주소를 입력해주세요."
              disabled={true}
            />
            <button
              className="bg-purple text-white rounded-md"
              type="button"
            >주소찾기</button>
          </div>
          <div>
            <ReviewFormInput placeholder="상세주소를 입력해주세요. ex) 1층 101호 김물주 부동산"/>
          </div>
        </section>
      </article>
      <article className="mb-8">
        <SubTitle>상세내용</SubTitle>
        <section className="mt-5">
          <textarea
            className="w-full h-[300px] border-[1.5px] border-gray rounded-md outline-none p-3 resize-none"
            placeholder="건물주에 대해 거짓없이 자유롭게 작성해주세요."
          />
        </section>
      </article>
      <article>
        <SubTitle>인증서류</SubTitle>
        <section className="mt-3">
          <ul className="list-disc ml-5">
            <li>해당 서류는 작성자 분이 실제로 건물을 사용했었던 인증 용도로만 사용됩니다.</li>
            <li>임대차 계약서 같이 인증 가능한 서류이면 모두 가능합니다.</li>
            <li>이 서류는 절대 공개되지 않고 건물주와 문제가 발생했을 때에만 사용됩니다.</li>
            <li>후기의 허위사실에 대한 불이익은 모두 후기 작성자 책임입니다.</li>
          </ul>
          <div className="mt-3">
            <ReviewFormInput className="border-[1.5px] rounded-md" type="file" />
          </div>
        </section>
      </article>
      <button className="bg-purple text-white rounded-md py-3 mt-5">후기등록</button>
    </form>
  );
}

interface FormInputs {
  address: string;
  address_detail: string;
  content: string;
  auth_file: File
}