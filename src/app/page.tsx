import Layout from "./_components/layouts/Layout";
import HomeMapSection from "./_components/HomeMapSection";

export default function Home() {
  return (
    <Layout>
      <HomeMapSection />
      <div className="absolute top-[10vh] left-5 w-[400px] h-[75vh] bg-white shadow-lg z-50">
        안녕
      </div>
    </Layout>
  );
}
