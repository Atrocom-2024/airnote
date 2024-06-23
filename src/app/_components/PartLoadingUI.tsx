import { AiOutlineLoading } from "react-icons/ai";

export default function PartLoadingUI({ className }: React.ComponentProps<'main'>) {
  return (
    <main className={`w-full h-full bg-white/40 flex justify-center items-center z-50 ${className}`}>
      <div className="flex justify-center items-center">
        <AiOutlineLoading className="animate-spin" size="50" color="#4A68F5" />
      </div>
    </main>
  )
}