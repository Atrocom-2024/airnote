'use client'

export default function Sidebar({ children }: React.ComponentProps<'aside'>) {
  return (
    <aside
      id="sidebar"
      className="absolute top-0 left-0 w-[100vw] md:w-[400px] h-[84vh] bg-white border-r border-default shadow-[10px_0_30px_-15px_rgba(0,0,0,0.2)] z-[29] overflow-y-auto"
    >{ children }</aside>
  );
}