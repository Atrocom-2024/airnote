'use client'

export default function ReviewAddBtn() {
  const reviewsBtnHandler = () => {
    return alert('로그인 후 이용하실 수 있습니다.');
  }
  
  return (
    <button
      className="group relative"
      type="button"
      onClick={reviewsBtnHandler}
    >기록작성<div id="link-bar" className="w-full h-[2px] absolute left-1/2 -translate-x-1/2 bottom-[-6px] bg-gray rounded-full hidden group-hover:block" />
</button>
  );
}