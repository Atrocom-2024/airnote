import Link from "next/link";
import { HiHandThumbUp, HiHandThumbDown } from "react-icons/hi2";

import { parseDate } from "@/utils/modules";
import { useDeleteRecord } from "@/app/_lib/hooks";
import LoadingUI from "@/app/_components/LoadingUI";

export default function ProfileRecordCard({ recordInfo }: PropsType) {
  const { mutate: deleteRecord, isPending } = useDeleteRecord(recordInfo.post_id);
  const myRecordContent = recordInfo.content.split('\n');

  const recordDeleteClickHandler = () => {
    const confirmDeleteRecord = confirm('정말 기록을 삭제하시겠습니까?');
    if (confirmDeleteRecord) {
      deleteRecord();
    }
  }

  if (isPending) {
    return <LoadingUI />;
  }

  return (
    <article className="border-b border-gray py-5">
      <section className="flex justify-between items-center">
        <div className="mr-5 md:mr-0 md:flex md:items-center">
          <div className="text-sm text-default font-bold sm:text-lg">{recordInfo.address}</div>
          <div className="text-xs text-default md:ml-3 sm:text-sm">{recordInfo.address_detail}</div>
        </div>
        <div>
          <Link
            className="bg-white-gray text-xs px-4 py-2 rounded-lg mr-2 md:text-sm"
            href={`/profile/record/${recordInfo.post_id}/edit`}
          >기록수정</Link>
          <button
            className="bg-white-gray text-xs px-4 py-2 rounded-lg md:text-sm"
            type="button"
            onClick={recordDeleteClickHandler}
          >기록삭제</button>
        </div>
      </section>
      <section className="mt-2 text-xs sm:text-sm md:mt-5">
        {myRecordContent.map((content, idx) => {
          if (!content) {
            return <br key={idx} />;
          }
          return <p className="break-words" key={idx}>{content}</p>;
        })}
      </section>
      <section className="flex justify-end items-center text-middle-gray mt-2 md:mt-5">
        <div className="flex items-center mr-5">
          <div className="flex items-center mr-2">
            <div>
              <HiHandThumbUp className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </div>
            <div className="text-xs ml-1 sm:text-sm">{ recordInfo.likes }</div>
          </div>
          <div className="flex items-center">
            <div>
              <HiHandThumbDown className="size-[15px] sm:size-[20px]" color="#AFAFAF" size="20" />
            </div>
            <div className="text-xs ml-1 sm:text-sm">{ recordInfo.dislikes }</div>
          </div>
        </div>
        <div className="text-xs sm:text-sm">{ parseDate(recordInfo.create_at) }</div>
      </section>
    </article>
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
  likes: number;
  dislikes: number;
  create_at: Date;
};