'use client'

export default function Sidebar({ children }: React.ComponentProps<'aside'>) {
  return (
    <aside
      id="sidebar"
      className="absolute top-[8vh] left-0 w-[400px] h-[84vh] bg-white border-r-[1.5px] border-default shadow-lg z-[29] overflow-y-auto"
    >{ children }</aside>
  );
}