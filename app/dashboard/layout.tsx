import type React from "react";
import {DashboardSidebar} from "@/components/dashboard-sidebar";
import {GitlabIcon as GitHubLogoIcon, BellIcon, SearchIcon} from "lucide-react";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {UserNav} from "@/components/user-nav";

export default function DashboardLayout({children}: {children: React.ReactNode}) {
  return (
    <div className='flex min-h-screen flex-col'>
      <header className='sticky top-0 z-10 border-b bg-background'>
        <div className='container flex h-16 items-center px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center gap-2 font-bold text-xl'>
            <Link href='/' className='flex items-center gap-2'>
              <GitHubLogoIcon className='h-6 w-6' />
              <span>GitMate</span>
            </Link>
          </div>
          <div className='ml-auto flex items-center gap-4'>
            <div className='relative hidden md:block'>
              <SearchIcon className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input type='search' placeholder='Search repositories...' className='w-[200px] lg:w-[300px] pl-8' />
            </div>
            <Button variant='outline' size='icon' className='relative'>
              <BellIcon className='h-5 w-5' />
              <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground'>3</span>
            </Button>
            <UserNav />
          </div>
        </div>
      </header>
      <div className='flex flex-1'>
        <DashboardSidebar />
        <main className='flex-1'>{children}</main>
      </div>
    </div>
  );
}
