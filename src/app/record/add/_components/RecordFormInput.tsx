'ues client'

import { UseFormRegisterReturn } from "react-hook-form";

export default function RecordFormInput({ className, type, placeholder, disabled, register, accept, onChange }: InputProps) {
  return (
    <input
      className={`w-full border-b-[1.5px] border-gray p-3 outline-none ${className}`}
      type={type ? type : "text"}
      placeholder={placeholder}
      disabled={disabled}
      accept={accept ? accept : ''}
      {...register}
      onChange={onChange}
    />
  );
}

interface InputProps extends React.ComponentProps<'input'> {
  register: UseFormRegisterReturn;
}