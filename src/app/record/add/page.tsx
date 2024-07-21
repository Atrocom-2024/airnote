import Layout from "@/app/_components/layouts/Layout";
import Title from "@/app/_components/Title";
import RecordForm from "./_components/RecordForm";

export default function ReviewAdd({ searchParams }: PageProps) {
  const address = searchParams.address;
  
  return (
    <Layout className="h-auto px-5 my-20 md:px-0">
      <main className="w-full mx-auto md:w-[600px]">
        <Title>공간 기록 작성</Title>
        <RecordForm address={address} />
      </main>
    </Layout>
  );
}

interface PageProps {
  searchParams: { [key: string]: string };
}