'use client'

import { useState } from "react";
import { useForm } from "react-hook-form";

import SubTitle from "@/app/_components/SubTitle";
import ReviewFormInput from "./ReviewFormInput";
import DaumPostcodeEmbed from "react-daum-postcode";

export default function ReviewForm() {
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const { register, handleSubmit, watch, setValue, formState: { isSubmitting, errors } } = useForm<FormInputs>({
    defaultValues: {
      address: "",
      address_detail: "",
      content: "",
    }
  });

  // 주소찾기 창 오픈 핸들러
  const openPostHandler = () => {
    setOpenPostcode((prev) => !prev); // 버튼을 재클릭하면 닫힘
  };

  // 주소 선택 후 상태 반영하는 함수
  const selectAddress = (address: AddressParam) => {
    setValue('address', address.address);
    setOpenPostcode(false);
  };

  const fileVerifyHandler = register('auth_file', {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileType = e.target.files ? e.target.files[0].type.split('/')[1] : '';
      if (fileType !== 'png' && fileType !== 'jpg' && fileType !== 'jpeg') {
        setValue('auth_file', null);
        return alert('파일은 .png 또는 .jpg 형식의 파일만 지원합니다.');
      }
    }
  });
  
  const formSubmitHandler = async (data: FormInputs) => {
    console.log(data);
  };

  return (
    <form className="mt-10 px-5 grid grid-cols-1 text-sm md:px-16" onSubmit={handleSubmit(formSubmitHandler)}>
      <article className="mb-8 relative">
        <SubTitle>주소</SubTitle>
        <section className="mt-5">
          <div className="grid grid-cols-4 gap-2 mb-3 md:grid-cols-5">
            <ReviewFormInput
              className="col-span-3 md:col-span-4"
              placeholder="주소를 입력해주세요."
              disabled={true}
              register={{...register('address')}}
            />
            <button
              className="bg-purple text-white rounded-md"
              type="button"
              onClick={openPostHandler}
            >주소찾기</button>
            {openPostcode && (
              <DaumPostcodeEmbed
                className="absolute top-24 border-[1px] border-black"
                onComplete={selectAddress}
                autoClose={false}
              />
            )}
          </div>
          <div>
            <ReviewFormInput
              placeholder="상세주소를 입력해주세요. ex) 1층 101호 김물주 부동산"
              register={{...register('address_detail')}}
            />
          </div>
        </section>
      </article>
      <article className="mb-8">
        <SubTitle>상세내용</SubTitle>
        <section className="mt-5">
          <textarea
            className="w-full h-[300px] border-[1.5px] border-gray rounded-md outline-none p-3 resize-none"
            placeholder="건물주에 대해 거짓없이 자유롭게 작성해주세요."
            {...register('content')}
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
            <ReviewFormInput
              className="border-[1.5px] rounded-md"
              type="file"
              accept=".png, .jpg"
              register={{...register('auth_file')}}
              onChange={fileVerifyHandler.onChange}
            />
            <label className="text-xs text-red ml-3">파일은 .png 또는 .jpg 형식의 파일만 지원합니다.</label>
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
  auth_file: File | null;
}

interface AddressParam {
  address: string;
  zonecode: string;
}