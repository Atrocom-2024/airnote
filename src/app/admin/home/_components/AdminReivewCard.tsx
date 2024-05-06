import { parseDate } from "@/utils/modules";
import Image from "next/image";

export default function AdminReviewCard({ review }: PropsType) {
  return (
    <article className="rounded-md border-[1.5px] border-default flex items-center p-5">
      <section className="mr-3">
        <Image
          className="w-[200px] h-[250px] object-cover"
          src={review.auth_file}
          width={400}
          height={0}
          alt="인증파일"
        />
      </section>
      <section className="w-full">
        <div className="w-full flex justify-between">
          <div className="flex items-center">
            <div className="font-bold text-default text-lg">{review.address}</div>
            <div className="text-dark-gray font-bold ml-2">{review.address_detail}</div>
          </div>
          <div className="text-dark-gray text-sm">{ parseDate(review.create_at) }</div>
        </div>
        <div className="px-2 my-5 text-sm">{review.content}</div>
      </section>
    </article>
  );
}

interface PropsType {
  review: ReviewType
}

interface ReviewType {
  _id: string;
  author_email: string;
  author_name: string;
  address: string;
  address_detail: string;
  content: string;
  likes: number;
  dislikes: number;
  create_at: string;
  auth_file: string;
}