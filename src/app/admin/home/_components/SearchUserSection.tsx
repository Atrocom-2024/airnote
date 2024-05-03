import { IoSearch } from "react-icons/io5";

export default function SearchUserSection() {
  return (
    <section className="p-10 col-span-9">
      <article className="flex items-center">
        <section className="font-bold text-default text-2xl mr-5">사용자 정보 찾기</section>
        <section className="w-[350px] relative border-[1.5px] border-default rounded-full">
          <input
            className="h-[5vh] px-5 rounded-full outline-none"
            // value={query}
            // onChange={qeuryChangeHandler}
            // onKeyDown={searchKeyPressHandler}
            placeholder="사용자 닉네임을 입력해주세요."
          />
          <IoSearch className="absolute top-1/2 right-3 -translate-y-1/2" size="30" color="#4A68F5" />
        </section>
      </article>
    </section>
  );
}