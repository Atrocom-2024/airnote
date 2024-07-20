import { AiOutlineLoading } from "react-icons/ai";

export default function LoadingUI({ className }: React.ComponentProps<'main'>) {
  return (
    <main className={`fixed top-0 left-0 w-[100vw] h-[100vh] bg-white/50 flex justify-center items-center z-50 ${className}`}>
      <div className="flex justify-center items-center">
        <AiOutlineLoading className="animate-spin" size="50" color="#4A68F5" />
      </div>
    </main>
  )
}