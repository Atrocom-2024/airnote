import { AiOutlineLoading } from "react-icons/ai";

export default function LoadingUI({ className }: React.ComponentProps<'main'>) {
  return (
    <main className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-white flex justify-center items-center z-50 ${className}`}>
      <div className="flex justify-center items-center">
        <AiOutlineLoading className="animate-spin" size="50" color="#4A68F5" />
      </div>
    </main>
  )
}