import Title from "@/app/_components/Title";

export default function ProfileRecordMain({ email }: PropsType) {
  return (
    <main className="ml-20">
      <Title>공간기록 관리</Title>
      <section className="mt-20">
        <article className="text-lg font-semibold mb-10">내가 쓴 공간기록</article>
      </section>
    </main>
  );
}

interface PropsType {
  email: string;
}