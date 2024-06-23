'use client'

export default function ReviewAddBtn() {
  const reviewsBtnHandler = () => {
    return alert('로그인 후 이용하실 수 있습니다.');
  }
  
  return (
    <button
      type="button"
      onClick={reviewsBtnHandler}
    >기록작성</button>
  );
}