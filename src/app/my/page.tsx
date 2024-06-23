import { getServerSession } from "next-auth";
import { CgProfile } from "react-icons/cg";

import { encrypt } from "@/utils/modules";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Layout from "../_components/layouts/Layout";
import Title from "../_components/Title";
import MyReviewCard from "./_components/MyReviewCard";
import NameContainer from "./_components/NameContainer";

export default async function My() {
  const session = await getServerSession(authOptions);
  const myInfo: MyInfoTypes = await getReviews(session?.user.email);

  return (
    <Layout className="h-auto min-h-[84vh] bg-dark-white py-10 md:py-20">
      <main className="w-full px-5 mx-auto md:w-[600px] md:px-0">
        <section className="mb-16 md:mb-24">
          <Title>내 정보</Title>
          <article className="w-full flex justify-center items-center bg-white shadow-lg rounded-md py-10 mt-8 md:justify-start md:px-24">
            <section>
              <CgProfile size="60" color="#4A68F5" />
            </section>
            <section className="ml-5 text-dark-gray text-sm sm:text-base">
              <div className="mb-3">{myInfo.user_info.email}</div>
              <NameContainer nickname={myInfo.user_info.nickname} />
            </section>
          </article>
        </section>
        <section>
          <Title>내가 쓴 공간 기록</Title>
          {myInfo.reviews.map((myReview) => (
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
  const res = await fetch(`${domain}/api/my/info?user=${encryptedEmail}`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

interface MyInfoTypes {
  user_info: {
    _id: string;
    email: string;
    nickname: string;
  },
  reviews: MyReviewTypes[]
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