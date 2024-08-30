'use client'

import Image from "next/image";
import { AiOutlineLoading } from "react-icons/ai";

import { parseDate } from "@/utils/modules";
import { useDeleteRecordAdmin } from "@/app/_lib/hooks";

export default function AdminRecordCard({ record }: PropsType) {
  const { mutate, isPending } = useDeleteRecordAdmin();
  const recordContent = record.content.split('\n');

  return (
    <article className="border-b border-middle-gray flex items-center p-5">
      <Image
        className="w-[200px] h-[250px] border border-gray rounded-md object-cover mr-5"
        src={record.auth_file_url ? record.auth_file_url : '/no-file-img.jpg'}
        width={400}
        height={0}
        alt="인증파일"
      />
      <section>
        <article className="text-sm">
          <div className="text-lg font-bold">{record.address}</div>
          <div className="flex items-center mt-1">
            <div className="text-default font-bold">{record.author_nickname}</div>
            <div className="text-middle-gray flex items-center">
              <div>ㆍ</div>
              <div>{ parseDate(record.create_at) }</div>
            </div>
          </div>
        </article>
        <article className="px-2 mt-5 mb-10 text-sm">
          {recordContent.map((content, idx) => {
            if (!content) {
              return <br key={idx} />;
            }
            return <p className="break-words" key={idx}>{content}</p>;
          })}
        </article>
        <article className="space-y-1 text-sm font-bold">
          <div>작성자 이메일: {record.author_email}</div>
          <div>작성자 이름: {record.author_name}</div>
        </article>
        <article className="text-end">
          <button
            className="w-[80px] h-[36px] bg-default rounded-lg text-white text-sm text-center py-2"
            onClick={() => mutate(record.post_id)}
            disabled={isPending}
          >{isPending ? <AiOutlineLoading className="animate-spin mx-auto" size="30" color="white" /> : '기록제거'}</button>
        </article>
      </section>
    </article>
  );
}

interface PropsType {
  record: RecordType
}

interface RecordType {
  post_id: string;
  author_email: string;
  author_name: string;
  author_nickname: string;
  address: string;
  address_detail: string;
  content: string;
  auth_file_url: string;
  likes: number;
  dislikes: number;
  create_at: Date;
};