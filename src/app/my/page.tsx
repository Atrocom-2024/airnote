import { getServerSession } from "next-auth";
import { CgProfile } from "react-icons/cg";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Layout from "../_components/layouts/Layout";
import Title from "../_components/Title";
import { encrypt } from "@/utills/modules";
import { ObjectId } from "mongodb";
import MyReviewCard from "./_components/MyReviewCard";

export default async function My() {
  const session = await getServerSession(authOptions);
  const myReviews: MyReviewTypes[] = await getReviews(session?.user.email);

  return (
    <Layout className="h-auto min-h-[84vh] bg-dark-white py-10">
      <main className="w-full mx-auto md:w-[600px]">
        <section className="mb-24">
          <Title>내 정보</Title>
          <article className="w-full flex justify-start items-center bg-white shadow-lg rounded-md px-24 py-10 mt-8">
            <section>
              <CgProfile size="50" color="#756AB6" />
            </section>
            <section className="ml-5 text-dark-gray">
              <div className="mb-3">{session?.user?.email}</div>
              <div>{session?.user?.name}</div>
            </section>
          </article>
        </section>
        <section>
          <Title>내가 쓴 후기</Title>
          {myReviews.map((myReview) => (
            <MyReviewCard myReview={myReview} key={myReview._id} />
          ))}
        </section>
      </main>
    </Layout>
  );
}

async function getReviews(email: string) {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const encryptedEmail = encodeURIComponent(encrypt(email, process.env.NEXT_PUBLIC_AES_EMAIL_SECRET_KEY));
  const res = await fetch(`${domain}/api/my/reviews?user=${encryptedEmail}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

interface MyReviewTypes {
  _id: string;
  author_email: string;
  author_name: string;
  address: string;
  address_detail: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: string;
}