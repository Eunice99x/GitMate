"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";

const items = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs"
      },
      {
        title: "Configuration",
        href: "/docs/configuration"
      }
    ]
  }
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <nav className='grid items-start gap-2'>
      {items.map(item => (
        <div key={item.title} className='space-y-2'>
          <h4 className='text-sm font-medium'>{item.title}</h4>
          <ul className='space-y-1'>
            {item.items.map(subItem => (
              <li key={subItem.href}>
                <Link href={subItem.href} className={cn("block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground", pathname === subItem.href ? "bg-accent text-accent-foreground" : "text-muted-foreground")}>
                  {subItem.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
