"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {BookOpenIcon, SettingsIcon} from "lucide-react";

const categories = [
  {
    name: "Introduction",
    icon: BookOpenIcon,
    items: [
      {
        title: "Welcome to GitMate",
        href: "/docs/introduction"
      },
      {
        title: "How it Works",
        href: "/docs/introduction/how-it-works"
      }
    ]
  },
  {
    name: "Configuration",
    icon: SettingsIcon,
    items: [
      {
        title: "AI Settings",
        href: "/docs/configuration/ai-settings"
      },
      {
        title: "GitHub Setup",
        href: "/docs/configuration/github-setup"
      }
    ]
  }
];

export function DocsSidebar() {
  const pathname = usePathname();

  return (
    <div className='h-full py-6 pr-2 pl-8 md:py-10'>
      <div className='space-y-6'>
        {categories.map(category => (
          <div key={category.name} className='space-y-2'>
            <div className='flex items-center gap-2'>
              <category.icon className='h-4 w-4 text-muted-foreground' />
              <h2 className='text-sm font-semibold'>{category.name}</h2>
            </div>
            <ul className='space-y-1'>
              {category.items.map(item => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn("block rounded-md px-3 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground", pathname === item.href ? "bg-accent text-accent-foreground font-medium" : "text-muted-foreground")}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
