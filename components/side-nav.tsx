"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {GitPullRequestIcon, Settings, Bell, HelpCircle, LayoutDashboard, BookOpen, Github} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard
  },
  {
    name: "Repositories",
    href: "/dashboard/repositories",
    icon: Github
  },
  {
    name: "Documentation",
    href: "/docs/introduction",
    icon: BookOpen
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings
  },
  {
    name: "Help",
    href: "/dashboard/help",
    icon: HelpCircle
  }
];

export function SideNav() {
  const pathname = usePathname();

  return (
    <div className='flex h-full w-64 flex-col border-r bg-background'>
      <div className='flex h-14 items-center border-b px-4'>
        <Link href='/dashboard' className='flex items-center gap-2'>
          <GitPullRequestIcon className='h-6 w-6 text-primary' />
          <span className='font-semibold'>GitMate</span>
        </Link>
      </div>
      <nav className='flex-1 space-y-1 p-2'>
        {navigation.map(item => (
          <Link
            key={item.name}
            href={item.href}
            className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground", pathname === item.href ? "bg-accent text-accent-foreground" : "text-muted-foreground")}
          >
            <item.icon className='h-4 w-4' />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}
