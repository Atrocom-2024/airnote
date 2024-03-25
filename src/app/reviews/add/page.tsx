import Layout from "@/app/_components/layouts/Layout";
import Title from "@/app/_components/Title";
import ReviewForm from "./_components/ReviewForm";

export default function ReviewAdd() {
  return (
    <Layout className="h-auto px-5 my-20 md:px-0">
      <main className="w-full mx-auto md:w-[600px]">
        <Title>건물주 후기 작성</Title>
        <ReviewForm />
      </main>
    </Layout>
  );
}