import { AiOutlineLoading } from "react-icons/ai";

export default function PartLoadingUI() {
  return (
    <main className="w-full h-full bg-white/40 flex justify-center items-center z-50">
      <div className="flex justify-center items-center">
        <AiOutlineLoading className="animate-spin" size="50" color="#756AB6" />
      </div>
    </main>
  )
}