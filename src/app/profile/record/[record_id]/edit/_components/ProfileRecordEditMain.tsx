'use client'

import { useProfileRecordDetail } from "@/app/_lib/hooks";
import Title from "@/app/_components/Title";
import ProfileRecordEditForm from "./ProfileRecordEditForm";
import LoadingUI from "@/app/_components/LoadingUI";

export default function ProfileRecordEditMain({ recordId }: PropsType) {
  const { data: myRecordDetail, isPending } = useProfileRecordDetail(recordId);

  if (isPending || !myRecordDetail) {
    return <LoadingUI />;
  }

  return (
    <main className="px-5 md:px-0 md:w-[620px] md:ml-20">
      <Title>공간기록 수정</Title>
      <ProfileRecordEditForm recordInfo={myRecordDetail}  />
    </main>
  );
}

interface PropsType {
  recordId: string;
}