'use client'

import { useProfileKnowledgeDetail } from "@/app/_lib/hooks";
import Title from "@/app/_components/Title";
import LoadingUI from "@/app/_components/LoadingUI";
import ProfileKnowledgeEditForm from "./ProfileKnowledgeEditForm";

export default function ProfileKnowledgeEditMain({ knowledgeId }: PropsType) {
  const { data: myKnowledgeDetail, isPending } = useProfileKnowledgeDetail(knowledgeId);

  if (isPending || !myKnowledgeDetail) {
    return <LoadingUI />;
  }

  return (
    <main className="px-5 md:px-0 md:w-[620px] md:ml-20">
      <Title>공간기록 수정</Title>
      <ProfileKnowledgeEditForm knowledgeInfo={myKnowledgeDetail}  />
    </main>
  );
}

interface PropsType {
  knowledgeId: string;
}