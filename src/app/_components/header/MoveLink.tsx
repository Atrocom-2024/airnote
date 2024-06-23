'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MoveLink({ className, href, children, target }: PropsType) {
  const path = usePathname();

  return (
    <Link
      href={href}
      target={target ? target : "_self"}
    >
      <div className="px-1 py-1">{ children }</div>
      {path === href ? (
        <div id="link-bar" className="w-full h-[3px] bg-default rounded-full" />
      ): (path === '/search' && href === '/home' ? (
        <div id="link-bar" className="w-full h-[3px] bg-default rounded-full" />
      ): null)}
    </Link>
  );
}

interface PropsType extends React.ComponentProps<'a'> {
  href: string;
  children: string;
}