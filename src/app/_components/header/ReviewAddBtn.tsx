'use client'

export default function ReviewAddBtn() {
  const reviewsBtnHandler = () => {
    return alert('로그인 후 이용하실 수 있습니다.');
  }
  
  return (
    <button
      className="bg-default text-white px-5 py-2 rounded-md"
      type="button"
      onClick={reviewsBtnHandler}
    >후기등록</button>
  );
}