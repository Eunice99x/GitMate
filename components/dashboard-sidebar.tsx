"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  GitlabIcon as GitHubLogoIcon,
  Settings2Icon,
  BarChart3Icon,
  GitPullRequestIcon,
  UserIcon,
  HelpCircleIcon,
} from "lucide-react"

export function DashboardSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: <BarChart3Icon className="h-4 w-4" />,
    },
    {
      name: "Repositories",
      href: "/dashboard/repositories",
      icon: <GitHubLogoIcon className="h-4 w-4" />,
    },
    {
      name: "Reviews",
      href: "/dashboard/reviews",
      icon: <GitPullRequestIcon className="h-4 w-4" />,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3Icon className="h-4 w-4" />,
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: <UserIcon className="h-4 w-4" />,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: <Settings2Icon className="h-4 w-4" />,
    },
    {
      name: "Help & Support",
      href: "/dashboard/help",
      icon: <HelpCircleIcon className="h-4 w-4" />,
    },
  ]

  return (
    <aside className="hidden w-[200px] flex-shrink-0 border-r md:block">
      <div className="flex h-full flex-col">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2",
                  isActive(item.href)
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  )
}

