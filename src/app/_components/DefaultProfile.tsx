import Image from "next/image";

export default function DefaultProfile({ className, width }: PropsType) {
  return (
    <Image
      className={`${width ? width : 'w-[50px]'} object-cover border-2 border-middle-gray p-1 ${className}`}
      src="/airnote-character.svg"
      width={50}
      height={0}
      alt="기본 프로필 사진"
    />
  );
}

interface PropsType extends React.ComponentProps<'img'> {
  width?: string;
}