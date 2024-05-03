'use client'

import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa6";
import { RiLock2Fill } from "react-icons/ri";

import { postLogin } from "@/app/_lib/api";
import LoadingUI from "@/app/_components/LoadingUI";

export default function AdminLoginForm() {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<FormInputs>({
    defaultValues: { id: '', password: ''}
  });
  
  return (
    <form className="grid grid-cols-1" onSubmit={handleSubmit(postLogin)}>
      {isSubmitting && <LoadingUI />}
      <section className="mb-3 flex justify-center items-center">
        <div className="mr-2">
          <FaUser size="20" color="#4A68F5" />
        </div>
        <input
          className={`px-1 py-2 mb-1 outline-none border-b-[1.5px] border-b-default`}
          type='text'
          placeholder="아이디"
          {...register('id')}
        />
      </section>
      <section className="flex justify-center items-center">
        <div className="mr-2">
          <RiLock2Fill size="20" color="#4A68F5" />
        </div>
        <input
          className={`px-1 py-2 mb-1 outline-none border-b-[1.5px] border-b-default`}
          type='password'
          placeholder="비밀번호"
          {...register('password')}
        />
      </section>
      <button className="mt-10 bg-default text-white px-5 py-2 rounded-md font-normal">로그인</button>
    </form>
  );
}

interface FormInputs {
  id: string;
  password: string;
}