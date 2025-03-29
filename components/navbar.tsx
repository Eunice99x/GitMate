"use client";

import Link from "next/link";
import {Button} from "@/components/ui/button";
import {GitPullRequestIcon} from "lucide-react";
import {usePathname} from "next/navigation";
import {GitHubAuthButton} from "@/components/github-auth-button";
import {useSession} from "next-auth/react";

export function Navbar() {
  const pathname = usePathname();
  const {data: session, status} = useSession();
  const isAuthenticated = status === "authenticated";

  return (
    <header className='sticky top-0 z-10 border-b bg-background'>
      <div className='container flex h-16 items-center px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center gap-2 font-bold text-xl'>
          <Link href='/' className='flex items-center gap-2'>
            <GitPullRequestIcon className='h-6 w-6 text-primary' />
            <span>GitMate</span>
          </Link>
        </div>
        <nav className='ml-auto flex gap-4 sm:gap-6 items-center'>
          <Link href='/features' className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/features" ? "text-primary" : ""}`}>
            Features
          </Link>
          <Link href='/pricing' className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/pricing" ? "text-primary" : ""}`}>
            Pricing
          </Link>
          <Link href='/docs' className={`text-sm font-medium transition-colors hover:text-primary ${pathname === "/docs" ? "text-primary" : ""}`}>
            Docs
          </Link>
          {isAuthenticated ? (
            <Link href='/dashboard'>
              <Button variant='default' size='sm'>
                Dashboard
              </Button>
            </Link>
          ) : (
            <GitHubAuthButton variant='default' size='sm' mode='signin' />
          )}
        </nav>
      </div>
    </header>
  );
}
