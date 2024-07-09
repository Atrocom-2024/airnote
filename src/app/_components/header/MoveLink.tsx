'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MoveLink({ className, href, children, target }: PropsType) {
  const path = usePathname();

  return (
    <Link
      className="group relative"
      href={href}
      target={target ? target : "_self"}
    >
      <span className={`py-1 ${path === href ? 'font-bold' : (
        path === '/search' && href === '/home' ? 'font-bold' : null
      )}`}>{ children }</span>
      <span id="link-bar" className="w-full h-[2px] absolute left-1/2 -translate-x-1/2 bottom-[-5px] bg-gray rounded-full hidden group-hover:block" />
    </Link>
  );
}

interface PropsType extends React.ComponentProps<'a'> {
  href: string;
  children: string;
}