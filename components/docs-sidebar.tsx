"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface DocsSidebarProps {
  className?: string
}

export function DocsSidebar({ className }: DocsSidebarProps) {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Getting Started</h2>
          <div className="space-y-1">
            <Link
              href="/docs/getting-started/introduction"
              className={cn(
                "block rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive("/docs/getting-started/introduction") ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              Introduction
            </Link>
            <Link
              href="/docs/getting-started/installation"
              className={cn(
                "block rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive("/docs/getting-started/installation") ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              Installation
            </Link>
            <Link
              href="/docs/getting-started/configuration"
              className={cn(
                "block rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive("/docs/getting-started/configuration") ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              Configuration
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Features</h2>
          <div className="space-y-1">
            <Link
              href="/docs/features/code-reviews"
              className={cn(
                "block rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive("/docs/features/code-reviews") ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              AI Code Reviews
            </Link>
            <Link
              href="/docs/features/reviewer-tones"
              className={cn(
                "block rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive("/docs/features/reviewer-tones") ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              Reviewer Tones
            </Link>
            <Link
              href="/docs/features/analytics"
              className={cn(
                "block rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive("/docs/features/analytics") ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              Analytics Dashboard
            </Link>
            <Link
              href="/docs/features/commit-messages"
              className={cn(
                "block rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive("/docs/features/commit-messages") ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              Commit Messages
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">GitHub Integration</h2>
          <div className="space-y-1">
            <Link
              href="/docs/github/permissions"
              className={cn(
                "block rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive("/docs/github/permissions") ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              Required Permissions
            </Link>
            <Link
              href="/docs/github/webhooks"
              className={cn(
                "block rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive("/docs/github/webhooks") ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              Webhook Events
            </Link>
            <Link
              href="/docs/github/commands"
              className={cn(
                "block rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive("/docs/github/commands") ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              Bot Commands
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">API Reference</h2>
          <div className="space-y-1">
            <Link
              href="/docs/api/authentication"
              className={cn(
                "block rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive("/docs/api/authentication") ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              Authentication
            </Link>
            <Link
              href="/docs/api/endpoints"
              className={cn(
                "block rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive("/docs/api/endpoints") ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              Endpoints
            </Link>
            <Link
              href="/docs/api/rate-limits"
              className={cn(
                "block rounded-md px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                isActive("/docs/api/rate-limits") ? "bg-accent text-accent-foreground" : "transparent",
              )}
            >
              Rate Limits
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

