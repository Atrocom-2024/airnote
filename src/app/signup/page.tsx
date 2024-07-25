import Layout from "../_components/layouts/Layout";
import TermAgreeForm from "./_components/TermAgreeForm";

export default function Singup({ searchParams }: PageProps) {
  return (
    <Layout className="flex justify-center items-center">
      <TermAgreeForm userInfo={searchParams} />
    </Layout>
  );
}

interface PageProps {
  searchParams: {
    email: string;
    name: string;
    nickname: string;
    phone_number: string;
  }
}