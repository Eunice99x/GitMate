"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboardIcon,
  GitPullRequestIcon,
  BarChart3Icon,
  SettingsIcon,
  HelpCircleIcon,
  BookOpenIcon,
} from "lucide-react"

const navItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Repositories",
    href: "/dashboard/repositories",
    icon: GitPullRequestIcon,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3Icon,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: SettingsIcon,
  },
  {
    title: "Documentation",
    href: "/dashboard/docs",
    icon: BookOpenIcon,
  },
  {
    title: "Help",
    href: "/dashboard/help",
    icon: HelpCircleIcon,
  },
]

export function SideNav() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-background md:block">
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="flex h-14 items-center border-b px-4 py-2">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <GitPullRequestIcon className="h-6 w-6" />
            <span>GitMate</span>
          </Link>
        </div>
        <nav className="grid gap-1 px-2 pt-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
    </div>
  )
}

