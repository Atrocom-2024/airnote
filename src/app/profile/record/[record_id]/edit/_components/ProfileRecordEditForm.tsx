'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DaumPostcodeEmbed from "react-daum-postcode"
import { throttle } from "lodash";

import LoadingUI from "@/app/_components/LoadingUI";
import SubTitle from "@/app/_components/SubTitle";
import RecordFormInput from "@/app/record/add/_components/RecordFormInput";

export default function ProfileRecordEditForm({ recordInfo }: PropsType) {
  const router = useRouter();
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting }
  } = useForm<FormInputs>({
    defaultValues: {
      address: recordInfo.address,
      address_detail: recordInfo.address_detail,
      content: recordInfo.content,
      auth_file: null,
      auth_file_url: ''
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
        const limitsize = 1024 ** 2 * 3; // 3MB
        if (e.target.files[0].size > limitsize) {
          setValue('auth_file', null);
          return alert('파일은 최대 3MB까지만 업로드 할 수 있습니다.');
        }
        const fileType = e.target.files[0].type.split('/')[1];
        if (fileType !== 'png' && fileType !== 'jpg' && fileType !== 'jpeg') {
          setValue('auth_file', null);
          return alert('파일은 .png 또는 .jpg 형식의 파일만 지원합니다.');
        }
      }
    }
  });
  
  const formSubmitHandler = throttle(async (data: FormInputs) => {
    // 폼 작성요소 검사
    if (!data.address) {
      return alert('기록을 작성할 주소를 입력해주세요.');
    } else if (!data.address_detail) {
      return alert('기록을 작성할 상세주소를 입력해주세요.');
    } else if (!data.content) {
      return alert('기록 내용을 입력해주세요.');
    }

    // 인증서류 S3 업로드 요청
    if (data.auth_file) {
      try {
        const form = new FormData();
        form.append('auth_file', data.auth_file[0]);

        const res = await fetch('/api/records/auth-file', {
          method: 'POST',
          body: form
        });
        const json = await res.json();
        setValue('auth_file_url', json.auth_file_url);
      } catch (err) {
        console.error(err);
      }
    }
    
    // 기록 작성 요청
    try {
      const res = await fetch(`/api/profile/record/${recordInfo.post_id}`, {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify({
          address: data.address,
          address_detail: data.address_detail,
          content: data.content,
          auth_file_url: watch('auth_file_url')
        })
      });
      if (res.ok) {
        return router.push('/profile/record');
      } else {
        return alert('기록 수정에 실패했습니다.');
      }
    } catch (err) {
      console.error(err);
      return alert('기록 수정에 실패했습니다.');
    }
  }, 2000);

  if (isSubmitting) {
    return <LoadingUI />;
  }

  return (
    <form className="mt-10 grid grid-cols-1 text-sm" onSubmit={handleSubmit(formSubmitHandler)}>
      <article className="mb-8 relative">
        <SubTitle>주소</SubTitle>
        <section className="mt-5">
          <div className="grid grid-cols-4 gap-2 mb-3 md:grid-cols-5">
            <RecordFormInput
              className="text-dark-gray col-span-3 md:col-span-4"
              placeholder="주소를 입력해주세요."
              disabled={true}
              register={{...register('address')}}
            />
            <button
              className="bg-default text-white rounded-xl"
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
            <RecordFormInput
              placeholder="상세주소를 입력해주세요. ex) 1층 101호 독도는 우리땅 부동산"
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
            placeholder={`공간에 대해 기록을 남겨주세요.(건물주, 추억, 등 공익을 위한 것 혹은 추억을 위한 것을 편히 써주세요)\n\n공간 기록 수첩은 사실만을 써야 합니다.\n다수의 이익을 위해 공익적으로 사용되는 기록입니다.\n비방 혹은 비난 등 공익에 벗어난 글은 모니터링 됩니다.\n공간의 다음사람을 위한 기록을 남겨주세요.`}
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
            <li>공익의 목적으로 기록을 써주세요.</li>
            <li>허위 및 조작 기록은 삭제 될 수 있습니다.</li>
          </ul>
          <div className="mt-3">
            <RecordFormInput
              className="border-[1.5px] rounded-md"
              type="file"
              accept=".png, .jpg"
              register={{...register('auth_file')}}
              onChange={fileVerifyHandler.onChange}
            />
            <label className="text-xs text-red ml-3">파일은 .png 또는 .jpg 형식의 파일만 지원하고 최대 용량은 3MB입니다.</label>
          </div>
        </section>
      </article>
      <button className="w-full bg-default text-white rounded-xl py-3 mx-auto mt-10 mb-20">기록수정</button>
    </form>
  );
}

interface PropsType {
  recordInfo: MyRecordTypes;
}

interface MyRecordTypes {
  post_id: string;
  address: string;
  address_detail: string;
  content: string;
  create_at: Date;
};

interface FormInputs {
  address: string;
  address_detail: string;
  content: string;
  auth_file: FileList | null;
  auth_file_url: string;
}

interface AddressParam {
  address: string;
  zonecode: string;
}