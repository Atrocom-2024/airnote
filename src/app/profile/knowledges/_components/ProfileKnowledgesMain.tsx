import Title from "@/app/_components/Title";

export default function ProfileKnowledgesMain({ email }: PropsType) {

  return (
    <main className="ml-20">
      <Title>공간지식 관리</Title>
      <section className="mt-20">
        <article className="text-lg font-semibold mb-10">회원 정보</article>
      </section>
    </main>
  );
}

interface PropsType {
  email: string;
}