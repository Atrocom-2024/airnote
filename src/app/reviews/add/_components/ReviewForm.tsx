'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DaumPostcodeEmbed from "react-daum-postcode"

import LoadingUI from "@/app/_components/LoadingUI";
import SubTitle from "@/app/_components/SubTitle";
import ReviewFormInput from "./ReviewFormInput";
import { throttle } from "lodash";

export default function ReviewForm() {
  const router = useRouter();
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting }
  } = useForm<FormInputs>({
    defaultValues: {
      address: "",
      address_detail: "",
      content: "",
      auth_file: null,
      encoded_auth_file: ''
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
      if (e.target.files) {
        const fileType = e.target.files[0].type.split('/')[1];
        if (fileType !== 'png' && fileType !== 'jpg' && fileType !== 'jpeg') {
          setValue('auth_file', null);
          return alert('파일은 .png 또는 .jpg 형식의 파일만 지원합니다.');
        } else {
          // 인증서류 이미지 인코딩
          const reader = new FileReader();
          reader.readAsDataURL(e.target.files[0]);
          reader.onloadend = () => {
            typeof(reader.result) === 'string' && setValue('encoded_auth_file', reader.result);
          }
        }
      }
    }
  });
  
  const formSubmitHandler = throttle(async (data: FormInputs) => {
    // 폼 작성요소 검사
    if (!data.address) {
      return alert('리뷰를 작성할 주소를 입력해주세요.');
    } else if (!data.address_detail) {
      return alert('리뷰를 작성할 상세주소를 입력해주세요.');
    } else if (!data.content) {
      return alert('리뷰 내용을 입력해주세요.');
    } else if (!data.auth_file) {
      return alert('인증서류를 첨부해주세요.');
    }

    // 인증서류 이미지 인코딩
    const reader = new FileReader();
    reader.readAsDataURL(data.auth_file[0]);
    reader.onloadend = () => {
      typeof(reader.result) === 'string' && setValue('encoded_auth_file', reader.result);
    }
    
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        return router.push('/my');
      } else {
        return alert('리뷰 등록에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      return alert('리뷰 등록에 실패했습니다.');
    }
  }, 2000);

  if (isSubmitting) {
    return <LoadingUI />;
  }

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
              className="bg-default text-white rounded-md"
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
            placeholder={`공간에 대해 기록을 남겨주세요.(건물주, 추억, 등 공익을 위한 것 혹은 추억을 위한 것을 편히 써주세요)\n\n수정이 어려우니 신중히 작성해주세요.`}
            {...register('content')}
          />
        </section>
      </article>
      <article>
        <SubTitle>인증서류 & 유의사항</SubTitle>
        <section className="mt-3">
          <ul className="list-disc ml-5">
            <li>세입자는 임대차 계약서 사업자 등록증 중 하나를 인증할 수 있습니다.</li>
            <li>서류는 공개되지 않습니다.</li>
            <li>공익의 목적으로 리뷰를 써주세요.</li>
            <li>허위 및 조작 리뷰는 삭제 될 수 있습니다.</li>
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
      <button className="bg-default text-white rounded-md py-3 mt-5">리뷰등록</button>
    </form>
  );
}

interface FormInputs {
  address: string;
  address_detail: string;
  content: string;
  auth_file: FileList | null;
  encoded_auth_file: string;
}

interface AddressParam {
  address: string;
  zonecode: string;
}