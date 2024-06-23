import Layout from "../_components/layouts/Layout";
import HomeMain from "./_components/HomeMain";

export default async function Home() {
  const topReviews: TopReviewType[] = await getTopReviews();
  
  return (
    <Layout className="relative">
      <HomeMain topReviews={topReviews} />
    </Layout>
  );
}

async function getTopReviews() {
  const domain = process.env.NEXT_PUBLIC_DOMAIN;
  const res = await fetch(`${domain}/api/reviews/top`, { cache: 'no-store' });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  
  return res.json();
}

interface TopReviewType {
  _id: string;
  address: string;
  address_detail: string;
  latitude: string;
  longitude: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: string;
}