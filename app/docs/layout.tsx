import type React from "react";
import {GitPullRequestIcon} from "lucide-react";
import Link from "next/link";
import {DocsSidebar} from "@/components/docs-sidebar";
import {Navbar} from "@/components/navbar";

export default function DocsLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex min-h-screen flex-col'>
      <Navbar />
      <header className='sticky top-0 z-10 border-b bg-background'>
        <div className='container flex h-16 items-center px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center gap-2 font-bold text-xl'>
            <GitPullRequestIcon className='h-6 w-6' />
            <span>GitMate</span>
          </div>
          <nav className='ml-auto flex gap-4 sm:gap-6'>
            <Link href='/' className='text-sm font-medium hover:underline'>
              Home
            </Link>
            <Link href='/features' className='text-sm font-medium hover:underline'>
              Features
            </Link>
            <Link href='/docs' className='text-sm font-medium hover:underline'>
              Docs
            </Link>
          </nav>
        </div>
      </header>
      <div className='container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
        <aside className='fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block'>
          <div className='h-full py-6 pr-2 pl-8 md:py-10'>
            <DocsSidebar />
          </div>
        </aside>
        <main className='relative py-6 lg:gap-10 lg:py-10'>{children}</main>
      </div>
      <footer className='border-t py-6 md:py-0'>
        <div className='container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row'>
          <p className='text-center text-sm leading-loose text-muted-foreground md:text-left'>© 2025 GitMate. All rights reserved.</p>
          <div className='flex gap-4'>
            <Link href='/terms' className='text-sm text-muted-foreground hover:underline'>
              Terms
            </Link>
            <Link href='/privacy' className='text-sm text-muted-foreground hover:underline'>
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
