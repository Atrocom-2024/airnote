'use client'

export default function Sidebar({ children }: React.ComponentProps<'aside'>) {
  return (
    <aside
      id="sidebar"
      className="absolute top-0 left-0 w-[400px] h-[84vh] bg-white border-r-[1.5px] border-default shadow-[10px_0_30px_-15px_rgba(0,0,0,0.2)] z-[1] overflow-y-auto"
    >{ children }</aside>
  );
}