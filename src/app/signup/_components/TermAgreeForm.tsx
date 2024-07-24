'use client';

import Link from "next/link";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { FieldErrors, useForm } from "react-hook-form";

import { postSignup } from "@/app/_lib/api";
import LoadingUI from "@/app/_components/LoadingUI";

export default function TermAgreeForm({ userInfo }: PropsType) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormType>({
    defaultValues: { isTermAgree: false, isPrivacyAgree: false }
  });

  const signupHandler = async () => {
    try {
      const res = await postSignup(userInfo);
      if (res.success) {
        signIn('kakao');
      }
    } catch (err) {
      console.error(err);
      alert('회원가입에 실패했습니다. 잠시 후 다시 시도해주세요.');
    }
  }

  const submitErrorHandler = (err: FieldErrors<FormType>) => {
    if (err.isTermAgree) {
      return alert(err.isTermAgree.message);
    } else if (err.isPrivacyAgree) {
      return alert(err.isPrivacyAgree.message);
    }
  }

  if (isSubmitting) {
    return <LoadingUI />
  }

  return (
    <form
      className="w-[300px] h-[250px] bg-white flex flex-col justify-between border border-default rounded-md p-5 z-50 md:w-[600px] md:h-[500px] md:p-10"
      onSubmit={handleSubmit(signupHandler, submitErrorHandler)}
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
            <input
              className="w-4 h-4"
              type="checkbox"
              {...register('isTermAgree', { required: '서비스 이용약관에 동의해야 합니다.' })}
            />
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
            <input
              className="w-4 h-4"
              type="checkbox"
              {...register('isPrivacyAgree', { required: '개인정보 수집 및 이용에 동의해야 합니다.' })}
            />
          </div>
        </article>
        
      </section>
      <button
        className="bg-default w-full py-2 text-white text-sm rounded-md md:text-lg"
      >회원가입</button>
    </form>
  );
}

interface PropsType {
  userInfo: {
    email: string;
    name: string;
    nickname: string;
    phone_number: string;
  }
}

interface FormType {
  isTermAgree: boolean;
  isPrivacyAgree: boolean;
}