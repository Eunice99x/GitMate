"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {GitPullRequestIcon, LayoutDashboard, GitBranch, Settings, Bell, HelpCircle, LogOut} from "lucide-react";
import {signOut} from "next-auth/react";

const navigation = [
  {name: "Dashboard", href: "/dashboard", icon: LayoutDashboard},
  {name: "Pull Requests", href: "/dashboard/pull-requests", icon: GitPullRequestIcon},
  {name: "Repositories", href: "/dashboard/repositories", icon: GitBranch},
  {name: "Notifications", href: "/dashboard/notifications", icon: Bell},
  {name: "Settings", href: "/dashboard/settings", icon: Settings},
  {name: "Help", href: "/dashboard/help", icon: HelpCircle}
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className='flex h-full w-64 flex-col border-r bg-background'>
      <div className='flex h-16 items-center gap-2 border-b px-4'>
        <GitPullRequestIcon className='h-6 w-6 text-primary' />
        <span className='text-xl font-bold'>GitMate</span>
      </div>
      <nav className='flex-1 space-y-1 p-4'>
        {navigation.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}
            >
              <item.icon className='h-4 w-4' />
              {item.name}
            </Link>
          );
        })}
      </nav>
      <div className='border-t p-4'>
        <Button variant='ghost' className='w-full justify-start gap-3 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground' onClick={() => signOut({callbackUrl: "/"})}>
          <LogOut className='h-4 w-4' />
          Sign out
        </Button>
      </div>
    </div>
  );
}
